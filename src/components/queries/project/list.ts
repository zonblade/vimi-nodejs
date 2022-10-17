import { reqListProject } from '../../struct/projects';
import { projectSchema } from '../../schemes/projects';
import mongoose from 'mongoose';
import type { dataListProject } from '../../struct/projects';


export default async function listProject(
    data: reqListProject
): Promise<Array<dataListProject>> {
    const searchQuery: Array<string> = data.search.split(' ');
    var mongoSearchString: Array<object> = [];
    var mongoSortDate: Array<object> = [];
    var querySearch:string = '';
    if(data.search.includes(":")){
        const qs:string = searchQuery[0];
        if(!qs.includes(":")){
            querySearch = searchQuery[0];
        }
    }else{
        querySearch = data.search.toString();
    }
    searchQuery.map((value: string, index: number) => {
        var innerQueries: object = {};
        const innerValue:string = value.toLowerCase();
        switch (`${innerValue.split(':')[0]}:`) {
            case "is:": {
                //statements;
                innerQueries={'$in':[innerValue.split(':')[1],'$searchArray']}
                mongoSearchString.push(innerQueries);
                break;
            }
            case "not:": {
                //statements; 
                innerQueries={'$not':{'$in':[innerValue.split(':')[1],'$searchArray']}}
                mongoSearchString.push(innerQueries)
                break;
            }
            case "before:": {
                //only special to date?
                try{
                    const parses = new Date(innerValue.split(':')[1]);
                    innerQueries={'$match':{'createdOn':{'$lt':parses}}};
                    mongoSortDate.push(innerQueries);
                    break;
                }catch{break}
            }
            case "after:": {
                //only special to date?
                try{
                    const parses = new Date(innerValue.split(':')[1]);
                    innerQueries={'$match':{'createdOn':{'$gt':parses}}};
                    mongoSortDate.push(innerQueries);
                    break;
                }catch{break}
            }
            default: {
                break;
            }
        }
    })
    if (data.sortDate === 'dsc') {
        mongoSortDate.push({'$sort':{'createdOn':-1}})
    } else {
        mongoSortDate.push({'$sort':{'createdOn':1}})
    };
    var querySort: Array<any> = [
        {'$addFields': {
            'search': { '$concat': ['$name',' ', { '$toLower': '$status' },' ', {'$toLower':'$type'}] },
            'searchArray': {
                '$concatArrays':[
                    {'$split':[{'$toLower':"$name"},' ']},
                    [{ '$toLower': '$status' }],
                    [{'$toLower':'$type'}]
                ]
            }
        }},
        { '$match': { 'search': { '$regex': querySearch, '$options': 'i' } } }
    ];
    if(mongoSearchString.length>0){querySort = querySort.concat([
        {'$match':{"$expr":{
            '$and':mongoSearchString
        }}}
    ])};
    if(mongoSortDate.length>0){querySort = querySort.concat(mongoSortDate)};
    querySort = querySort.concat([
        { '$project': { 
            'search': 0,
            'searchArray': 0,
            '_id': 0 
        }}
    ]);
    const result = await mongoose.model('project', projectSchema).aggregate(querySort);
    return result;
}