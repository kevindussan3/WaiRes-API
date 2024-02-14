import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/initialSetup";

import authRoutes from "./routes/auth.routes";
import categoriaRoutes from "./routes/categoria.routes";
import productoRoutes from "./routes/producto.routes";
import mesaRoutes from "./routes/mesa.routes";


require('dotenv').config()
const bodyParser = require('body-parser');


const app = express()

/* Cors son para que n o se bloqueen las solicitudes */
const cors = require('cors');

var corsOption ={
    origin: ['*'],
    optionsSuccessStatus:200

}
app.use(cors(corsOption));
/* EndCors */
createRoles();
global.__basedir = __dirname;

app.set('pkg', pkg);
app.use(express.json());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        nombreproyecto: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/mesa', mesaRoutes);




export default app;