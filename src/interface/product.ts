export interface IProduct {
    _id: string | undefined;
    name: string;
    price: number;
    desc: string;
    thumbnail: string;
    quantity: number;
    id_type?: string;
    size?: string;
}