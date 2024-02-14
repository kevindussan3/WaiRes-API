import { mongo } from 'mongoose';
import Producto from '../models/Producto';

export const create = async (req, res) => {
    const { nombre, categoria, precio,  descripcion, imagen } = req.body;
    try {
        const newProducto = new Producto({
            nombre,
            categoria,
            precio,
            descripcion,
            imagen
        });
        const productoSaved = await newProducto.save();
        res.status(201).json(productoSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const findAll = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, precio, stock, descripcion, imagen } = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, categoria, precio, stock, descripcion, imagen },
            { new: true } // Devolver el producto actualizado en lugar del antiguo
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        await Producto.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}