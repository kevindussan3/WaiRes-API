import {Schema, model } from "mongoose";


const categoriaSchema = new Schema({
    descripcion: String
},
{
    versionKey: false
}
);

export default model("Categoria", categoriaSchema);