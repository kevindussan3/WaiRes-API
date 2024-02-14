import {Schema, model } from "mongoose";

export const ROLES = [ "admin", "cliente"]

const roleSchema = new Schema({
    name: String
},
{
    versionKey: false
}
);

export default model("Role", roleSchema);