import { 
    Request, 
    Response 
} from 'express';
import { 
    resLoginData,
    resLogin, 
    getLoginData 
} from '../components/struct/users';
import {httpHandler} from '../components/decorator';
import manualAuth  from '../components/queries/auth/manual';
import Lang from '../components/lang';
import { sha512 } from 'js-sha512';

/**
 * 
 * LETS GET DIRTY HERE!
 * 
 * i know this is unneccesary
 * but i felt cleaner if
 * we pool the requirement 
 * on other files, IMHO
 * 
 */

export {
    Lang,
    Request, 
    Response,
    httpHandler,
    manualAuth,
    resLoginData, 
    resLogin, 
    getLoginData,
    sha512 as encodeSHA512
};