import { ExpenseDTO } from './dtos';
import { User } from './user';

export class Outgoing {

    outgoingType: OutgoingTypes;
    name: String;
    participants: Array<User>;
    price: Number;
    city: String;

	constructor(outgoingDto: ExpenseDTO) {
        this.name = outgoingDto.expenseName;
        this.participants = new Array<User>();
        if (outgoingDto.applicationUserDTOs) {
            this.participants = new Array<User>();
            outgoingDto.applicationUserDTOs.forEach(element => {
                this.participants.push(new User(element));
            });
        }
        this.price = outgoingDto.price;
        switch(outgoingDto.expenseType) {
            case 0: {
                this.outgoingType = OutgoingTypes.FOOD;
                break;
            }
            case 1: {
                this.outgoingType = OutgoingTypes.SHOPPING;
                break;
              }
              case 2: {
                this.outgoingType = OutgoingTypes.RESTAURANT;
                break;
              }
              case 3: {
                this.outgoingType = OutgoingTypes.CULTURE;
                break;
              }
              case 4: {
                this.outgoingType = OutgoingTypes.WELLNESS;
                break;
              }
              case 5: {
                this.outgoingType = OutgoingTypes.ENTERTAINMENT;
                break;
              }
        }
        this.city = outgoingDto.location;
	}

}

export enum OutgoingTypes {
    FOOD = "Food", SHOPPING = "Shopping", RESTAURANT = "Restaurant", CULTURE = "Culture", WELLNESS = "Wellness", ENTERTAINMENT = "Entertainment"
}