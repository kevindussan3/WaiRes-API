import { mongo } from 'mongoose';
import Mesa from '../models/Mesa';
import QRCode from 'qrcode';
const assetsFolder = '../../public/assets/'

export const create = async (req, res) => {

    const { numero } = req.body;

    try {
        const newMesa = new Mesa({
            numero,
        });
        const mesaSaved = await newMesa.save();
        const codigoQR = await generarCodigoQR(mesaSaved._id.toString());
        mesaSaved.codigoQR = codigoQR;
        await mesaSaved.save();
        res.status(201).json(mesaSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}


export const findAll = async (req, res) => {
    try {
        const mesas = await Mesa.find();
        res.status(200).json(mesas);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const mesa = await Mesa.findById(id);
        res.status(200).json(mesa);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const update = async (req, res) => {
    const { id } = req.params;
    const { numero, codigoQR } = req.body;

    try {
        const mesaActualizada = await Mesa.findByIdAndUpdate(id, { numero, codigoQR }, { new: true });
        if (!mesaActualizada) {
            return res.status(404).json({ error: 'Mesa no encontrada.' });
        }
        res.status(200).json(mesaActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
        const mesaEliminada = await Mesa.findByIdAndDelete(id);
        if (!mesaEliminada) {
            return res.status(404).json({ error: 'Mesa no encontrada.' });
        }
        res.status(200).json(mesaEliminada);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}



async function generarCodigoQR(data) {
    try {
        const nombreArchivo = `codigo_qr_${data}.png`;
        console.log('nombreArchivo', nombreArchivo)
        console.log('assetsFolder', assetsFolder)
        const rutaCompleta = path.join(assetsFolder, nombreArchivo);

        // Asegurarse de que la carpeta "assets" exista
        await fs.mkdir(assetsFolder, { recursive: true });

        // Generar y guardar el código QR en la carpeta "assets"
        await QRCode.toFile(rutaCompleta, data);

        console.log(`Código QR generado y guardado como ${nombreArchivo}`);
        return nombreArchivo;
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        throw error;
    }
}