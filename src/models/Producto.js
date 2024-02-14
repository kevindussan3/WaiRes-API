import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
    },
    imagen: {
        type: String,
    },
    // Puedes agregar más campos según las necesidades de tu aplicación
},
    {
        timestamps: true,
        versionKey: false,
    });

export default model('Producto', productoSchema);
