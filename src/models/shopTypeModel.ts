import mongoose from "mongoose";
import { IOption } from "../types/common";

const ShopTypeSchema = new mongoose.Schema<IOption>(
    {
        value: {
            type: String,
            unique: true,
            required: [true, "A shop type must contain a value"],
        },
        label: {
            type: String,
            unique: true,
            required: [true, "A shop type must contain a label"],
        },
    },
    {
        collection: "shop-type",
        timestamps: true,
    }
);

const ShopType = mongoose.model<IOption>("ShopType", ShopTypeSchema);

export default ShopType;
