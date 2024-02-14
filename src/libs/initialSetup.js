import Role from "../models/Role";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if(count > 0) return
        
        const values = await Promise.all([
            new Role({name: "admin"}).save(),
            new Role({name: "cliente"}).save(),
        ]);
    } catch (error) {
        console.log(error);
    }
}