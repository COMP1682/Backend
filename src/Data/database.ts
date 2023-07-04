import mongoose from "mongoose"

class database{
    constructor(){

    }
    static async connectData (): Promise<void> {
        await mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@finalproject.j5302ft.mongodb.net/?retryWrites=true&w=majority`);
        console.log("connect database successfully");
    }
}
export default database;
