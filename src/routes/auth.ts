import { Router } from 'express';
import Authenticate from '../modules/auth';

let route:Router=Router();

/**
 * 
 * auth route
 * 
 * more detailed route
 * 
 */

route.post('/auth',Authenticate.login);

module.exports = route;