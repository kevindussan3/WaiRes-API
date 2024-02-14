import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import User from "../models/User";


export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({ message: "No Token" })
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, { password: 0 }).then((res) => console.log(res)).watch((error) => console.log(error))
        console.log(user)
        if (!user) return res.status(404).json({ message: 'no user found' })
        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })

    }
}

export const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId).then((res) => console.log(res)).watch((error) => console.log(error))
    const roles = await Role.find({ _id: { $in: user.roles } }).then((res) => console.log(res)).watch((error) => console.log(error));
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return
        }
    }
    return res.status(403).json({ message: "No tienes privilegios Admin" })
}
export const isCliente = async(req, res, next) => {
    const user = await User.findById(req.userId).then((res) => console.log(res)).watch((error) => console.log(error))
    const roles = await Role.find({ _id: { $in: user.roles } }).then((res) => console.log(res)).watch((error) => console.log(error));
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "cliente") {
            next()
            return
        }
    }
    return res.status(403).json({ message: "No tienes privilegios cliente" })
}

