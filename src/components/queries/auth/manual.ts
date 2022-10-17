import { getLoginData,getUserData } from '../../struct/users';
import userSchema from '../../schemes/users';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

class manualAuth {
    /**
     * 
     * @param username string
     * @param password string
     * @param remember boolean
     * @returns getLoginData
     * @explain
     * ```
     *      supose to be encrypted using encrypted JWT
     *      for test purposes, i intentionally
     *      not using it.
     * ```
     */
    static async loginHandler(
            username:string,
            password:string,
            remember:boolean
    ):Promise<getLoginData>{
        const result = await mongoose.model('users',userSchema).aggregate([
            {'$match':{
                '$and':[
                    {'username':username},
                    {'password':password}
                ]
            }},
            {'$project':{
                'userId':{'$toString':'$_id'},
                'joinDate':{'$toDate':'$_id'},
                'username':'$username',
                'success':{'$toBool':true},
                '_id':0
            }}
        ]);
        var token:string|null = null;
        if(result.length){
            const loginData:getUserData = result[0];
            /**
             * process the jwt here!
             */
            const newToken:string|null = jwt.sign(JSON.stringify(loginData),'my-secret');
            token = newToken;
        };
        const data:getLoginData = {
            token:token
        };
        return data;
    } 
}

export default manualAuth;