import mongoose from "mongoose";
import { IShop } from "../types/shop";
import { IOption } from "../types/common";

const ShopTypeSchema = new mongoose.Schema<IOption>({
    value: {
        type: String,
        required: [true, "A shop type must contain a value"],
    },
    label: {
        type: String,
        required: [true, "A shop type must contain a label"],
    },
});

const CitySchema = new mongoose.Schema<IOption>({
    value: {
        type: String,
        required: [true, "A city must contain a value"],
    },
    label: {
        type: String,
        required: [true, "A city must contain a label"],
    },
});

const ShopSchema = new mongoose.Schema<IShop>(
    {
        city: {
            type: CitySchema,
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
        types: [
            {
                type: ShopTypeSchema,
                required: [true, "A shop must contain a types"],
            },
        ],
    },
    {
        collection: "shop",
        timestamps: true,
    }
);

const Shop = mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
