import mongoose from "mongoose";
import { v4 } from "uuid";

export default abstract class RepositoryTemplate {
    protected mongoModel: mongoose.Model<any>;

    public constructor(mongoModel: mongoose.Model<any>) {
        this.mongoModel= mongoModel;
    }

    public async create( entity: any ): Promise< string > {
        try {
            
            if(!entity) {
                return undefined;
            }


            entity._id = v4();
            const newEntity = new this.mongoModel(entity);
            await newEntity.save();

            return newEntity._id;

        } catch (error) {
            return undefined;
        }
    }

    public async read(){
        return await this.mongoModel.find();
    }

    public async delete(uuid: string):Promise<any>{
        try {
            return await this.mongoModel.deleteOne({ _id: uuid });
        } catch (error) {
            return undefined;
        }
    }

    public async update( entity: any ): Promise< any > {
        try {
            
            if(!entity) {
                return undefined;
            }
            const result = new this.mongoModel(entity);
            await result.save();
            return result;

        } catch (error) {
            return undefined;
        }
    }

    public async findByUuid(uuid: string): Promise< any > {
        return await this.mongoModel.findById(uuid);
    }

}