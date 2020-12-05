import { AccommodationDTO, TravelDTO, TripDTO } from './dtos';
import { Outgoing } from './outgoing';
import { MyAccount, User } from './user';

export class Trip {
    tripName: string;
    startDate!: Date;
    endDate!: Date;
    organiser!: User;
    travels!: Array<Travelling>;
    
    participantsDictionary!: { [nickname: string] : User};
    participants!: Array<User>;
    accommodations: Array<AccommodationDTO>;
    outgoings: Array<Outgoing>;

    constructor(tripDto: TripDTO) {
        this.tripName = tripDto.tripName;
        this.accommodations = tripDto.accommodationDTOs;
        this.startDate = tripDto.startDate;
        this.participantsDictionary = {};
        this.participants = new Array<User>();
        this.outgoings = new Array<Outgoing>();

        if (tripDto.travelDTOs) {
            this.travels = new Array<Travelling>();
            tripDto.travelDTOs.forEach(element => {
                this.travels.push(new Travelling(element));
            })
        }

        if (tripDto.participants) {
            var newUsers = new Array<User>();
            tripDto.participants.forEach(element => {
                newUsers.push(new User(element));
            });
            
            this.setParticipantsDictionary(newUsers);
            this.participants = newUsers;
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

    addAccommodation(accommodation: Accommodation) {
        //TODO
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

    constructor(travelDTO: TravelDTO) {
        this.startPoint = travelDTO.startPoint;
        this.destination = travelDTO.destination;
        if (travelDTO.participants) {
            this.participants = new Array<User>();
            travelDTO.participants.forEach(element => {
                this.participants.push(new User(element));
            });
        }
        this.travelType = TravelType[travelDTO.travelType];
        this.increaseCostForParticipants();
    }

    increaseCostForParticipants() {
        if (this.participants) {
            this.participants.forEach(participant => {
                participant.increaseTravelCost(this.pricePerPerson);
            });
        }
    }

}

export enum TravelType {
    TRAIN = "Train", BUS = "Bus", FERRY = "Ship or Ferry", CAR = "Car"
}

export enum AccommodationType {
    HOTEL = "Hotel", HOSTEL = "Hostel", RESORT = "Resort", APARTMENT = "Apartment", TENT = "Tent", COUCHSURFING = "Couchsurfing"
}
