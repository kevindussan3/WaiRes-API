import Role from "../models/Role";

import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

const { SECRET } = config;

export const signup = async (req, res) => {
    try {
        const { identificacion, email, nombres, apellidos, telefono, fechaNacimiento, direccion, password, roles } = req.body;
        const hashedPassword = await User.encryptPassword(password)
        const newUser = new User({
            identificacion,
            email,
            nombres,
            apellidos,
            telefono,
            password: hashedPassword,
        });
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: "cliente" })
            newUser.roles = [role._id]
        }

        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400,
        })
        res.status(200).json({ token })
    } catch (error) {
        res.status(400).json({ error: "Error during signup" });
    }


}

export const signin = async (req, res) => {
    console.log(req.body);

    try {
        const { email, identificacion, telefono, password } = req.body;

        if (!email && !identificacion && !telefono) {
            return res.status(400).json({ message: "Debes proporcionar un correo o identificación o telefono" });
        }

        // const userFound = email
        //     ? await User.findOne({ email }).populate("roles")
        //     : await User.findOne({ identificacion }).populate("roles");
        let userFound = null;
        if (email) {
            userFound = await User.findOne({ email }).populate("roles")
        }else if (identificacion) {
            userFound = await User.findOne({ identificacion }).populate("roles")
        }else if(telefono) {
            userFound = await User.findOne({ telefono }).populate("roles")
        }
        
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
   

        const matchPassword = await User.comparePassword(password, userFound.password);

        if (!matchPassword) {
            return res.status(401).json({ token: null, message: "Credenciales incorrectas. Verifica tu nombre de usuario y contraseña.", error_code: "INVALID_CREDENTIALS" });
        }

        const token = jwt.sign({ id: userFound._id }, SECRET, {
            expiresIn: 86400
        });

        res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: {
                data: userFound,
                token: token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};