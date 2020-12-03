import { User } from './user';

export class Outgoing {

    outgoingType: OutgoingTypes;
    name: String;
    participants: Array<User>;
    price: Number;
    city: String;

	constructor(name: String, participants: Array<User>, price: Number, outgoingType: OutgoingTypes, city: String) {
        this.name = name;
        this.participants = participants;
        this.price = price;
        this.outgoingType = outgoingType;
        this.city = city;
	}

}

export enum OutgoingTypes {
    FOOD = "Food", SHOPPING = "Shopping", RESTAURANT = "Restaurant", CULTURE = "Culture", WELLNESS = "Wellness", ENTERTAINMENT = "Entertainment"
}