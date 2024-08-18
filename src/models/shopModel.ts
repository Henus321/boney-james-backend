import mongoose from "mongoose";
import { IShop } from "../types/shop";

const ShopSchema = new mongoose.Schema<IShop>(
    {
        city: {
            type: mongoose.Schema.ObjectId,
            ref: "City",
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
                type: mongoose.Schema.Types.ObjectId,
                ref: "ShopType",
                required: [true, "A shop must contain a types"],
            },
        ],
    },
    {
        collection: "shop",
        timestamps: true,
    }
);

ShopSchema.pre("find", function (next) {
    this.populate({
        path: "city",
        select: "value label",
    }).populate({
        path: "types",
        select: "value label",
    });
    next();
});

const Shop = mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
