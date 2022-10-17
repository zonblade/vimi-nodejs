import {
    Lang,
    Request,
    Response,
    resListProject,
    reqListProject,
    listProject,
    httpHandler,
    authRequired,
    updateProject
} from './project.map';
import type {
    RR_ParamProjectPatch,
    RQ_resPatchProject
} from './project.map';


class ProjectModule {
    /**
     * 
     * @param req 
     * @param res 
     * 
     */
    @httpHandler
    @authRequired
    static async updateProject(req:Request, res:Response):Promise<RQ_resPatchProject>{
        const inputs = req.body;
        const inputValidate:RR_ParamProjectPatch = {
            projectId: inputs.projectId?inputs.projectId.toString():"",
            archived: inputs.archived?inputs.archived:false
        };
        const resultData:boolean = await updateProject(inputValidate.archived,inputValidate.projectId);
        const resData:RQ_resPatchProject = {
            success: resultData,
            meta: {
                code: 'placeholder',
                message: 'placeholder'
            },
            data: {
                success: resultData
            }
        }
        return resData;
    }
    /**
     * 
     * @param req 
     * @param res 
     * 
     */
    @httpHandler
    @authRequired
    static async dataList(req:Request, res:Response):Promise<resListProject>{
        const inputs = req.query;
        const inputValidate:reqListProject = {
            search: inputs.search?inputs.search.toString():"",
            sortDate: inputs.sortDate?inputs.sortDate.toString():"dsc",
            lang: inputs.lang?inputs.lang.toString():"EN"
        };
        const resultData = await listProject(inputValidate);
        var lang = Lang(inputValidate.lang.toUpperCase());
        const data:resListProject={
            success: true,
            meta: {
                code: "SUC01",
                message: lang.project.getList.SUC01
            },
            data: {
                items: resultData,
                item_count: 0,
                item_max: 0,
                page_before: [],
                page_after: []
            }
        };
        return data;
    };
};

export default ProjectModule;