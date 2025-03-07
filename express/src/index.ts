import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path"
import cors from 'cors';

import multer from "multer"
import Router from "./routes/route"
import { fileStorage , fileFilter } from "./util/multer"

dotenv.config();

const app: Express = express();
const port = process.env.POST || 3000;
const upload = path.join(__dirname,"..", ".." ,'upload')

app.use(express.json())

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use('/public', express.static(upload));
app.post('/upload', multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'), async (req : Request, res: Response ) => {
    res.status(200).json({
        message : "success",
        url :  `http://localhost:${port}/public/` + req.file!.filename
    })
})

app.use('/api', Router);

app.listen(port, () => {console.log(`🚀 Server ready at: http://localhost:${port}`)})
