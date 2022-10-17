import "reflect-metadata";
import jwt from 'jsonwebtoken';
import { getUserData } from "./struct/users";
/**
 * 
 * decorator to handle any error\
 * \
 * this only applicable to top level logic function\
 * in which handles top level logic code base.\
 * under app.\
 * under route.\
 * \
 * [a,b,next] only works on express.\
 * \
 * this is top level decorator,\
 * all decorator need this decorator!\
 * this decorator should be put above all decorator!
 * 
 */
function httpHandler(target: any,x:any,descriptor: any) : void {
    const fn = descriptor.value;
    descriptor.value = async function(...args: any[]) {
        try {
            /**
             * 
             * returning healthy function
             * let's put some additional function over here.
             * 
             */
            const [,res,next] = args;
            const ok = await fn.apply(target, args);
            typeof(ok) == "number" ? res.sendStatus(ok) : res.send(ok)
            next();
        } catch(error:any) {
            /**
             * 
             * may vary based on args given
             * in this case using express will be
             * (req,res)
             * and for await handler
             * next
             * 
             * [arg1,arg2,next]
             * 
             * i suspect if there were 3 args
             * should add arg3 before "next"
             * 
             * send the error messages
             * to the current session
             * 
             */
            const [,res,next] = args;
            res.send(error);
            next(error);
        }
    };
};

/**
 * 
 * @param target 
 * @param descriptor 
 * @requiredDecorator `httpHandler`
 * 
 * authentication decorator,
 * if invalid, return 401
 * with data delivered only
 * 
 * success:bool
 * 
 */
function authRequired(target: any,x:any,descriptor: any) : void {
    const fn = descriptor.value;
    descriptor.value = async function(...args: any[]) {
        try {
            const [req,,] = args;
            if(!req.headers.authorization) throw Error;
            try{
                const verify = jwt.verify(req.headers.authorization,'my-secret');
                if(verify===undefined || verify === null){
                    return 401;
                };
                return await fn.apply(target, args);
            }catch(e:any){
                return 401;
            }
            /**
             * 
             * validate jwt here!
             * 
             */
        } catch(error:any) {
            return 401;
        }
    };
};

export {httpHandler,authRequired};