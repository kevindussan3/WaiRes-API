const util = require('util')
const multer = require('multer');
const fs = require('fs');
// const maxSize = 2 * 1024 * 1024;
import { mongo } from 'mongoose'
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";



let storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        if (req.params.idUser && req.params.idActividad && req.paramas.Jornada) {
            const fountActividad = await Actividad.find({ '_id': mongo.ObjectId(req.params.idActividad) }, { materia: 1, _id: 0 })
            const matter = fountActividad.map(actividad => actividad.materia)
            cb(null, __basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${matter}/`);
        } else if (req.params.Grade && req.params.Matter) {
            const token = req.headers["x-access-token"];
            if (!token) return res.status(403).json({ message: "No Token" })
            const decoded = jwt.verify(token, config.SECRET);
            req.userId = decoded.id;
            const user = await User.findById(req.userId, { password: 0 }).populate("roles")
            cb(null, __basedir + `../../resources/static/assets/uploads/${user.jornada}/${req.params.Matter}/${req.params.Grade}/`);
        } else if (req.params.idUser) {
            cb(null, __basedir + `../../resources/static/assets/uploads/${req.params.idUser}/`);
        }

    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, file.originalname);
    },
});


let uploadFile = multer({

    storage: storage,
    // limits: { fileSize: maxSize }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware