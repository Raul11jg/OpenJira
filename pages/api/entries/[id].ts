import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id} = req.query;
    
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:'El id no es válido: ' + id});
    }
    else{
        switch (req.method) {
            case 'GET':
                return getEntry(req, res)
            case 'PUT':
                return updateEntry(req, res)
            default:
                return res.status(400).json({message:'Metodo no existe '});
        }
    }
}

const getEntry = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    const {id} = req.query;

    await db.connect();

    const entryInDB = await Entry.findById(id);
    await db.disconnect();

    if(!entryInDB){
        return res.status(400).json({message:'No hay entrada con ese id ' + id});
    }

    res.status(200).json(entryInDB);



}
const updateEntry = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    const {id} = req.query;

    await db.connect();

    const entryToUptade = await Entry.findById(id);

    if(!entryToUptade){
        await db.disconnect();
        return res.status(400).json({message:'No hay entrada con ese id ' + id});
    }

    const {description = entryToUptade.description, status = entryToUptade.status} = req.body;

    try {
        //entryToUptade.description = description;
        //entryToUptade.status = status;
        //await entryToUptade.save();
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({message: error.errors.status.message});
    }

}