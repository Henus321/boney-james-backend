import {
    deleteOne,
    getAll,
    getOne,
    createOne,
    updateOne,
} from "../utils/handlerFactory";
import City from "../models/cityModel";

export const getAllCities = getAll(City);
export const getCity = getOne(City);
export const createCity = createOne(City);
export const updateCity = updateOne(City);
export const deleteCity = deleteOne(City);
