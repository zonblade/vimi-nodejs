import { Router } from 'express';
import ProjectModule from '../modules/project';

let route:Router=Router();

/**
 * 
 * auth route
 * 
 * more detailed route
 * 
 */

route.get('/project.list',ProjectModule.dataList);
route.patch('/project.data',ProjectModule.updateProject);

module.exports = route;