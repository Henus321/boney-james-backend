import express from "express";
import {
    getAllCities,
    getCity,
    createCity,
    deleteCity,
    updateCity,
} from "../controllers/cityController";

const cityRoutes = express.Router();

cityRoutes.route("/").get(getAllCities).post(createCity);
cityRoutes.route("/:id").get(getCity).patch(updateCity).delete(deleteCity);

export default cityRoutes;
