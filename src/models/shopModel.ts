import mongoose from "mongoose";
import { IShop } from "../types/shop";

const ShopSchema = new mongoose.Schema<IShop>(
    {
        city: {
            type: String,
            required: [true, "A shop must contain a city"],
        },
        name: {
            type: String,
            required: [true, "A shop must contain a name"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "A shop must contain a phone"],
        },
        street: {
            type: String,
            required: [true, "A shop must contain a street"],
        },
        subway: {
            type: String,
            required: [true, "A shop must contain a subway"],
        },
        time: {
            type: String,
            required: [true, "A shop must contain a time"],
        },
        types: {
            type: [String],
            required: true,
            validate: [
                (value: string[]) => value.length > 0,
                "A shop must contain a types",
            ],
        },
    },
    {
        collection: "shop",
        timestamps: true,
    }
);

const Shop = mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
