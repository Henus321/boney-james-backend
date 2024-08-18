import { IOption } from "./common";

export interface IShop {
    city: IOption;
    name: string;
    phone: string;
    street: string;
    subway: string;
    time: string;
    types: IOption[];
}
