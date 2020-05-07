import express from "express";
import cors from "cors";

const bodyParser = require('body-parser');
import {UploadService, ServeImageService} from "./services";

const APP = express();

// Allow REACTApp to access
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
}
APP.use(cors());
APP.use([
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true,
    })
]);

APP.get('/', (req, res) => {
    res.json({status: true});
});
APP.use("/api/upload", UploadService);
APP.use("/api/view-image", ServeImageService);

APP.listen(8082, () => {
    console.log('SERVER IS LISTENING AT PORT 8082');
});
