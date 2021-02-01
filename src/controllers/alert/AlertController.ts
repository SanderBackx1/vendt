import {Request, Response} from 'express'
import { CrudController } from "../CrudController";
import { Types } from "mongoose";
import { Alert, IAlert} from "../../model/Alert";

class AlertController extends CrudController{

    constructor(){
        super()
    }
    public async create(req:Request,res:Response){
        throw new Error("not yet implemented")
    }
    public async read(req:Request,res:Response){
        throw new Error("not yet implemented")
    }
    public async update(req:Request,res:Response){
        throw new Error("not yet implemented")
    }
    public async delete(req:Request,res:Response){
        throw new Error("not yet implemented")
    }
   
}
export const alertController = new AlertController()