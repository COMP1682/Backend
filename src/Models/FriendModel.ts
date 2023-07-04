import * as mongoose from "mongoose";
import { Model } from "mongoose";

type friendType = friendModel & mongoose.Document;
export interface friendModel {
  displayName: {
    type: String;
    required: true;
  };
  picturePath:{
    type:String;
    require:false;
  }
}
const friendsSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
      },
      picture:{
        type:String,
        require:false,
      },
});
const friend: Model<friendType> = mongoose.model<friendType>("friend", friendsSchema);
export default friend;