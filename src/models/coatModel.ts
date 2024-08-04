import mongoose from "mongoose";
import { ICoat, IColor } from "../types/coat";

const ColorSchema = new mongoose.Schema<IColor>({
    label: {
        type: String,
        required: [true, "A coat must contain a label"],
    },
    hex: {
        type: String,
        required: [true, "A coat must contain a hex"],
    },
});

const CoatSchema = new mongoose.Schema<ICoat>(
    {
        cost: {
            type: Number,
            required: [true, "A coat must contain a cost"],
        },
        description: {
            type: String,
            required: [true, "A coat must contain a description"],
        },
        model: {
            type: String,
            required: [true, "A coat must contain a model"],
        },
        name: {
            type: String,
            required: [true, "A coat must contain a name"],
        },
        type: {
            type: String,
            required: [true, "A coat must contain a type"],
        },
        photoUrls: {
            type: [String],
            required: [true, "A coat must contain a photoUrls"],
        },
        color: {
            type: ColorSchema,
            required: [true, "A coat must contain a color"],
        },
        sizes: {
            type: [String],
            required: [true, "A coat must contain a sizes"],
        },
    },
    {
        collection: "coat",
        timestamps: true,
    }
);
const Coat = mongoose.model<ICoat>("Coat", CoatSchema);

export default Coat;
