import { Router } from 'express';
let auth = require("./auth");
let project = require("./project");

let route:Router = Router();
/**
 * 
 * here just index placeholder dont we
 * 
 */
route.get('/',async function(req,res){res.send("hello this is our APIs!")})
/**
 * 
 * combining all routes
 * 
 */
route.use(auth)
route.use(project)

module.exports = route;