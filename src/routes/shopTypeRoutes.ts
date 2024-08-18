import express from "express";
import {
    getAllShopTypes,
    createShopType,
    getShopType,
    updateShopType,
    deleteShopType,
} from "../controllers/shopTypeController";

const shopTypeRoutes = express.Router();

shopTypeRoutes.route("/").get(getAllShopTypes).post(createShopType);
shopTypeRoutes
    .route("/:id")
    .get(getShopType)
    .patch(updateShopType)
    .delete(deleteShopType);

export default shopTypeRoutes;
