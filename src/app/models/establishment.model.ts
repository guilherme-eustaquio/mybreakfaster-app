import { Address } from './address.model';

export class Establishment {
    id: number;
    name: string;
    phoneNumber: string;
    addresses: Address[];
    averageRating: number;
}