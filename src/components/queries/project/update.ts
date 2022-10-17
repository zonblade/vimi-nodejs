import { RQ_ProjectUpdate, dataListProject } from '../../struct/projects';
import { projectSchema } from '../../schemes/projects';
import mongoose from 'mongoose';



export default async function updateProject(
    changeTo: boolean,
    projectId: string
): Promise<boolean> {
    const resultData:Array<dataListProject> = await mongoose.model('project', projectSchema).aggregate([
        {'$match':{'id':projectId}},
        {'$project':{
            '_id':0
        }}
    ]);
    var validates:boolean = false;
    if(resultData.length>0){
        const nResultData:dataListProject = resultData[0];
        if(nResultData.archived===true && changeTo===false){
            validates=true;
        }
        if(nResultData.archived===false && changeTo===true){
            validates=true;
        }
    }
    if(validates){
        const resToTrue = await mongoose.model('project',projectSchema).findOneAndUpdate(
            {'id':projectId},
            {'$set':{
                'archived':changeTo
            }},
            {'returnDocument':'after'}
        );
        if(!resToTrue){return false;}
        if(resToTrue.archived===changeTo){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}