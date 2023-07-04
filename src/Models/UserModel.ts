import * as mongoose from "mongoose";
import { Model } from "mongoose";

type userType = userModel & mongoose.Document;
export interface userModel {
  firstName: {
    type: String;
    required: true;
  };
  lastName: {
    type: String;
    required: true;
  };
  friends:{
    type:Array<object>;
    required: false;
  }
  email:{
    type:String;
    unique:true;
    require:true;
  }
  password:{
    type:String;
    require:true;
  }
  picturePath:{
    type:Array<String>;
    require:false;
  }
}
const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      friends:{
        type:Array<object>,
        required: false,
      },
      email:{
        type:String,
        unique:true,
        require:true,
      },
      password:{
        type:String,
        require:true,
      },
      picture:{
        type:Array<String>,
        require:false,
      },
});
const user: Model<userType> = mongoose.model<userType>("user", usersSchema);
export default user;