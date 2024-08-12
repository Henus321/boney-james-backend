export interface ICoat {
    cost: number;
    description: string;
    model: string;
    name: string;
    type: string;
    colors: IColor[];
    sizes: string[];
}

export interface IColor {
    label: string;
    hex: string;
    photoUrls: string[];
}
