import { connect } from 'mongoose';

interface connectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect( options: connectionOptions ){
        const { mongoUrl, dbName } = options;
        try{
            await connect(mongoUrl, {
                dbName
            });

            console.log('Mongo connected');
        }catch(e){
            console.log('Mongo connection error');
            throw e;
        }
    }
}