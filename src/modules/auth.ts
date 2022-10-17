import {
    manualAuth,
    httpHandler,

    Request, 
    Response,
    
    resLoginData, 
    resLogin, 
    getLoginData,

    Lang,
    encodeSHA512
} from './auth.map';

class Authenticate {
    /**
     * 
     * @param req from express binded into resLogin
     * @param res from express
     * @returns resLoginData
     * 
     */
    @httpHandler
    static async login(
        req:Request,
        res:Response
    ): Promise<resLoginData>{
        const body:resLogin = req.body;
        var prefrence:string;
        try{prefrence = body.lang;
        }catch(e){prefrence ="EN";}
        var lang = Lang(prefrence);
        var username:string = "";
        var password:string = "";
        var rememberMe:boolean = false;
        try{body.username}catch(e){
            throw defaultErr("MSSG",`${lang.login.MSSG}  {username:string}`)
        }
        try{body.password}catch(e){
            throw defaultErr("MSSG",`${lang.login.MSSG}  {password:string}`)
        }
        try{body.rememberMe}catch(e){
            throw defaultErr("MSSG",`${lang.login.MSSG} {rememberMe:booelan}`)
        }
        
        
        /**
         * even req,res is not read/used
         * they must be there to feed 
         * the decorator!
         * 
         * ERR CODE LIST:
         *  SUC01 : success and returning token.
         *  ERR01 : wrong username/password.
         * 
         * err code list could be anything
         * should be documented tho
         * 
         */
        const result:getLoginData = await manualAuth.loginHandler(
            body.username,
            encodeSHA512(body.password),
            body.rememberMe /** if false token will be destroyed within 3 hours */
        );
        /**
         * 
         * 
         * errorverse can be expanded into
         * per username
         * per password
         * i choose to be simplistic
         * so both at the same time.
         *
         * 
         */

        if(!result.token) {throw defaultErr(
            "ERR01",
            lang.login.ERR01
        )}

        const data:resLoginData = {
            success: true,
            meta: {
                code: "SUC01",
                message: lang.login.SUC01
            },
            data: {
                token: result.token
            }
        };
        return data;
    }
};

/**
 * 
 * @param code 
 * @param message 
 * @explain
 * ```text
 *    we put it on bottom for aestetic needs
 *    no other reason tbh
 *    every function/view
 *    their default error may vary
 * ```
 * @example
 *    defaultErr("CODE","EXPLANATION");
 * @return
 * ```json
 *    { 
 *      success:boolean,
 *      meta:{
 *         code:string,
 *          message:string
 *      },
 *      data:{
 *          token:string
 *      }
 *    }
 * ```
 */
function defaultErr(code:string,message:string):resLoginData {
    const defErr:resLoginData={
        success: false,
        meta:{
            code:code,
            message:message
        },
        data: {token: ""}
    };
    return defErr;
};

export default Authenticate;