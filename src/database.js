import mongoose from "mongoose";



mongoose.connect(`mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`, {})
    .then(db => console.log('Db esta conectadad'))
    .catch(error => console.log(error))
