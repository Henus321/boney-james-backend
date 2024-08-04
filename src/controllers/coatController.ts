import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from "../utils/handlerFactory";
import Coat from "../models/coatModel";

export const getAllCoats = getAll(Coat);
export const getCoat = getOne(Coat);
export const createCoat = createOne(Coat);
export const updateCoat = updateOne(Coat);
export const deleteCoat = deleteOne(Coat);
