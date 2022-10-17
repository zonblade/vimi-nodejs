import Lang from '../components/lang';
import { Request, Response } from 'express';
import { resListProject,reqListProject,RR_ParamProjectPatch,RQ_resPatchProject } from '../components/struct/projects';
import {httpHandler,authRequired} from '../components/decorator';
import listProject from '../components/queries/project/list';
import updateProject from '../components/queries/project/update';


export {
    Lang,
    Request,
    Response,
    resListProject,
    reqListProject,
    listProject,
    httpHandler,
    authRequired,
    updateProject
}

export type {
    RR_ParamProjectPatch,
    RQ_resPatchProject
}