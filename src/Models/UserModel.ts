import * as mongoose from "mongoose";

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
        type:Array,
        default:[],
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
      location:{
          type:String,
          require:false,
      },
       picturePath:{
         type:String,
         require:false,
       },
});
const user = mongoose.model("user", usersSchema);
export default user;