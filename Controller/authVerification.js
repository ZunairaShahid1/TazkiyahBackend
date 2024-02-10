import { RegisterationModel } from "../Model/registerationModel.js";
import mongoose from "mongoose";
export async function verifyUserID(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }
    const data = await RegisterationModel.findById(id);
    return data !== null;
}