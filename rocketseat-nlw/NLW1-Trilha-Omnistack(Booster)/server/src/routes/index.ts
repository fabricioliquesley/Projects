import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";

import PointsController from "../controllers/pointsController";
import { ItemsController } from "../controllers/itemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.post("/points", upload.single("image"), pointsController.create);
routes.get("/items", itemsController.listItems);
routes.get("/points", pointsController.listPoints);
routes.get("/points/:id", pointsController.show);

export { routes };
