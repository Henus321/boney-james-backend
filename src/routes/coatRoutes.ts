import express from "express";
import {
    getAllCoats,
    getCoat,
    createCoat,
    deleteCoat,
    updateCoat,
} from "../controllers/coatController";

const coatRoutes = express.Router();

coatRoutes.route("/").get(getAllCoats).post(createCoat);
coatRoutes.route("/:id").get(getCoat).patch(updateCoat).delete(deleteCoat);

export default coatRoutes;
