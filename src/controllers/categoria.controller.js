import { mongo } from 'mongoose';
import Categoria from '../models/Categoria';


export const create = async (req, res) => {
    console.log(req.body);
    const { descripcion } = req.body;
    try {
        const newCategoria = new Categoria({
            descripcion
        });
        const categoriaSaved = await newCategoria.save();
        res.status(201).json(categoriaSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const findAll = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findById(id);
        res.status(200).json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


exports.update = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            { descripcion },
            { new: true } // Devolver la categoría actualizada en lugar de la antigua
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ error: 'Categoría no encontrada.' });
        }

        res.status(200).json(categoriaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la categoría.' });
    }
};


export const deleteOne = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "El parámetro 'id' es obligatorio en la consulta." });
    }

    try {
        await Categoria.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}