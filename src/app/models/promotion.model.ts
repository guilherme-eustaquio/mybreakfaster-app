import { Product } from './product.model';
export class Promotion {
    id: number;
    percentage : number;
    initialDate : string;
    finalDate : string;
    description: string;
    title: string;
    products: Product[];
}