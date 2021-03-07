// @ts-ignore
import { prop, Typegoose } from 'typegoose';


export class Floare extends Typegoose {            //Modelul elementelor din tabela Car

    @prop({ required: false })
    _id: string;

    @prop({required:true})
    AN: number;

    @prop({required:true})
    NUME: string;

    @prop({required:true})
    CULOARE: string;

    @prop({required:true})
    NUMAR_PETALE: number;

}