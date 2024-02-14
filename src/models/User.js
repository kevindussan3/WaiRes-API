import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    identificacion: {
        type: Number,
        unique: true
    }, 
    email:{
        type: String,
        unique: true
    },
    nombres:{
        type: String,
    },
    apellidos:{
        type: String,
    },
    telefono:{
        type: Number,
    },
    avatar: {
        type: String
    },
    fechaNacimiento: {
        type: String,
    },
    direccion: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    
},
{
    timestamps: true,
    versionKey: false,
}
);


userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recivedPassord) => {
    console.log(password, recivedPassord)
    return await bcrypt.compare(password, recivedPassord);
};

export default model('User', userSchema);