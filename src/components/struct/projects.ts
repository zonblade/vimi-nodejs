/**
 * DEFINE PROJECT
 * 
 * define all necessary input and output
 * to neutralize unwanted data type
 * while processing the data thru system
 * 
 */

interface UpdateProject {
    /**
     * 
     * both are required
     * if one of em not required
     * "undefined" should be added.
     * 
     */
    projectId:string,
    updatedTo:Number
};

interface dataListProject {
    id: string,
    name: string,
    status: string,
    type: string,
    createdOn: string,
    archived: boolean,
};

interface resListProject {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        items:Array<dataListProject>,
        item_count:Number,
        item_max:Number,
        page_before:Array<Number>,
        page_after:Array<Number>
    }
};


interface RQ_resPatchProject {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        success:boolean
    }
};

interface reqListProject {
    search:string,
    sortDate:string,
    lang:string
}

interface RQ_ProjectUpdate {
    success:boolean,
    isArchive:boolean
}

interface RR_ParamProjectPatch {
    projectId:string,
    archived:boolean
}

type queryUpdateProject = (
    updateData: UpdateProject
) => boolean;

export {
    queryUpdateProject,
    UpdateProject,
    reqListProject,
    resListProject
};

export type {
    dataListProject,
    RQ_ProjectUpdate,
    RR_ParamProjectPatch,
    RQ_resPatchProject
};