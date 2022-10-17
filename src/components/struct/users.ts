import {ObjectId} from 'bson';

/**
 * DEFINE USERS
 * 
 * define all necessary input and output
 * to neutralize unwanted data type
 * delivered into front-end
 * 
 */

interface getUserData {
    success:boolean,
    username:string,
    joinDate:string,
    userId:string
};

interface getLoginData {
    token:string|null
};

interface resLoginData {
    success:boolean,
    meta:{
        code:string,
        message:string
    },
    data:{
        token:string
    }
};

interface resLogin {
    username:string,
    password:string,
    lang:string,
    rememberMe:boolean
};

type returnUserData = (
    userId:ObjectId
) => getUserData;

export {
    getUserData,
    getLoginData,
    resLoginData,
    resLogin,
    returnUserData
};