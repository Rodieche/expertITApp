import { Schema } from "mongoose";

export const validParamsGenerator = (schema: Schema, excludedParams:string[] = []) => {

    let validParams:string[] = [];

    schema.eachPath(function(path: any){
        if(excludedParams.indexOf(path) == -1 || path == '_id'){
            validParams.push(path);
        }
    });

    return validParams;
}