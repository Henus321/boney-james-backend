import express from "express";
import { createCoat, getAllCoats } from "../controllers/coatController";

const coatRoutes = express.Router();

coatRoutes.route("/").get(getAllCoats).post(createCoat);

export default coatRoutes;
