import { Schema, model } from "mongoose";

const mesaSchema = new Schema({
    numero: {
        type: Number,
        required: true,
        unique: true,
    },
    codigoQR: {
        type: String,
        unique: true,
    },
},
{
    timestamps: true,
    versionKey: false,
});

export default model('Mesa', mesaSchema);
