import { Outgoing } from './outgoing';
import { MyAccount, User } from './user';

export class Trip {
    tripName: string;
    startDate!: Date;
    travels!: Array<Travelling>;
    organiser!: User;
    participantsDictionary!: { [nickname: string] : User};
    participants!: Array<User>;
    accommodations: Array<Accommodation>;
    outgoings: Array<Outgoing>;

    constructor(tripName: string, startDate: Date, participants?: Array<User>) {
        this.tripName = tripName;
        this.accommodations = new Array<Accommodation>();
        this.startDate = startDate;
        this.travels = new Array<Travelling>();
        this.participantsDictionary = {};
        this.participants = new Array<User>();
        this.outgoings = new Array<Outgoing>();
        if (participants) {
            this.setParticipantsDictionary(participants);
            this.participants = participants;
        }
    }

    setParticipantsDictionary(participantsDictionaryArray: Array<User>) {
        participantsDictionaryArray.forEach(participant => {
            this.participantsDictionary[participant.nickname] = participant;
        });
    }

    setOrganiser(user: User) {
        this.organiser = user;
        this.participantsDictionary[this.organiser.nickname] = this.organiser;
        this.participants.push(user);
    }

    addFriendToTrip(user: User) {
        this.participantsDictionary[user.nickname] = user;
        this.participants.push(user);
    }

    addNewTravel(travel: Travelling) {
        this.travels.push(travel);
    }

    addTravel(travelType: TravelType) {
        var userArray = new Array<User>();
        userArray.push(MyAccount.getInstance().user);
        userArray.push(MyAccount.getInstance().user);
        userArray.push(MyAccount.getInstance().user);
        var id = this.travels.length + 1;
        switch(travelType) {
            case TravelType.CAR: {
                this.travels.push(new TravellingByCar(id, "Budapest", "Wien", userArray, 220.4, 7.7, 1.2, 10));
                break;
            }
            case TravelType.TRAIN: {
                this.travels.push(new TravellingByTrain(id, "Wien", "Frankfurt", userArray, 100, 10));
                break;
            }
        }
    }

    addAccommodation(accommodation: Accommodation) {
        this.accommodations.push(accommodation);
    }

    addNewOutgoing(outgoing: Outgoing) {
        this.outgoings.push(outgoing);
    }

}

export class Accommodation {
    accommodationName: string;
    accommodationLocation: string;
    nights: number;
    accommodationType: AccommodationType;
    participants: Array<User>
    price: number;
    pricePerPersonPerNight: number = 0;
    pricePerPerson: number = 0;

    constructor(accommodationName: string, accommodationLocation: string, nights: number, accommodationType: AccommodationType, participants: Array<User>, price: number) {
        this.accommodationName = accommodationName;
        this.accommodationLocation = accommodationLocation;
        this.nights = nights;
        this.accommodationType = accommodationType;
        this.participants = participants;
        this.price = price;
        this.calculatePricePerPersonPerNight();
    }

    calculatePricePerPersonPerNight() {
        this.participants.forEach(participant => {
            const pricePerPerson = this.price/this.participants.length;
            participant.increaseAcommodationCost(pricePerPerson); //Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
            this.pricePerPersonPerNight = Number(Number.parseFloat(String(pricePerPerson/this.nights)).toFixed(2));
            this.pricePerPerson =  Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
        });
    }

}

export class Travelling {
    //common
    travelType!: TravelType;
    startPoint!: string;
    destination!: string;
    participants!: Array<User>;
    id!: number;

    pricePerPerson!: number;

    //CAR
    distance!: number;
    consumption!: number;
    fuelPrice!: number;
    vignettePrice!: number;

    //TRAIN, BUS, FERRY
    ticketPricePerPerson!: number;
    seatReservationPerPerson!: number;

    constructor(id: number, startPoint: string, destination: string, participants: Array<User>, travelType: TravelType) {
        this.startPoint = startPoint;
        this.destination = destination;
        this.participants = participants;
        this.travelType = travelType;
        this.increaseCostForParticipants();
    }

    increaseCostForParticipants() {
        this.participants.forEach(participant => {
            participant.increaseTravelCost(this.pricePerPerson);
        });
    }

}

export class TravellingByCar extends Travelling {
    
    constructor(id: number, startPoint: string, destination: string, participants: Array<User>, distance: number, consumption: number, fuelPrice: number, vignettePrice: number) {
        super(id, startPoint, destination, participants, TravelType.CAR)
        this.distance = distance;
        this.consumption = consumption;
        this.fuelPrice = fuelPrice;
        this.vignettePrice = vignettePrice;
        this.calculatePricePerPerson();
    }

    calculatePricePerPerson() {
        const totalFuelPrice = this.distance/100*this.consumption*this.fuelPrice;
        const pricePerPerson = (Number(totalFuelPrice)+Number(this.vignettePrice))/this.participants.length;
        this.pricePerPerson = Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
        this.increaseCostForParticipants();
    }

}

export class TravellingByTrain extends Travelling {
    constructor(id: number, startPoint: string, destination: string, participants: Array<User>, ticketPricePerPerson: number, seatReservationPerPerson: number) {
        super(id, startPoint, destination, participants, TravelType.TRAIN)
        this.ticketPricePerPerson = ticketPricePerPerson;
        this.seatReservationPerPerson = seatReservationPerPerson;
        this.calculatePricePerPerson();
    }

    calculatePricePerPerson() {
        const pricePerPerson = this.ticketPricePerPerson + this.seatReservationPerPerson;
        this.pricePerPerson = Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
        this.increaseCostForParticipants();
    }
}

export class TravellingByBus extends Travelling {
    constructor(id: number, startPoint: string, destination: string, participants: Array<User>, ticketPricePerPerson: number, seatReservationPerPerson: number) {
        super(id, startPoint, destination, participants, TravelType.BUS)
        this.ticketPricePerPerson = ticketPricePerPerson;
        this.seatReservationPerPerson = seatReservationPerPerson;
        this.calculatePricePerPerson();
    }

    calculatePricePerPerson() {
        const pricePerPerson = this.ticketPricePerPerson + this.seatReservationPerPerson;
        this.pricePerPerson = Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
        this.increaseCostForParticipants();
    }
}

export class TravellingByFerry extends Travelling {
    constructor(id: number, startPoint: string, destination: string, participants: Array<User>, ticketPricePerPerson: number, seatReservationPerPerson: number) {
        super(id, startPoint, destination, participants, TravelType.FERRY)
        this.ticketPricePerPerson = ticketPricePerPerson;
        this.seatReservationPerPerson = seatReservationPerPerson;
        this.calculatePricePerPerson();
    }

    calculatePricePerPerson() {
        const pricePerPerson = this.ticketPricePerPerson + this.seatReservationPerPerson;
        this.pricePerPerson = Number(Number.parseFloat(String(pricePerPerson)).toFixed(2));
        this.increaseCostForParticipants();
    }
}

export enum TravelType {
    TRAIN = "Train", BUS = "Bus", FERRY = "Ship or Ferry", CAR = "Car"
}

export enum AccommodationType {
    HOTEL = "Hotel", HOSTEL = "Hostel", RESORT = "Resort", APARTMENT = "Apartment", TENT = "Tent", COUCHSURFING = "Couchsurfing"
}
