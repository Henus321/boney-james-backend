import express from "express";
import {
    getAllShops,
    getShop,
    createShop,
    deleteShop,
    updateShop,
} from "../controllers/shopController";

const shopRoutes = express.Router();

shopRoutes.route("/").get(getAllShops).post(createShop);
shopRoutes.route("/:id").get(getShop).patch(updateShop).delete(deleteShop);

export default shopRoutes;
