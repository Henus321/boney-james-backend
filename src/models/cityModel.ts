import mongoose from "mongoose";
import { IOption } from "../types/common";

const CitySchema = new mongoose.Schema<IOption>(
    {
        value: {
            type: String,
            unique: true,
            required: [true, "A city must contain a value"],
        },
        label: {
            type: String,
            unique: true,
            required: [true, "A city must contain a label"],
        },
    },
    {
        collection: "city",
    }
);
const City = mongoose.model<IOption>("City", CitySchema);

export default City;
