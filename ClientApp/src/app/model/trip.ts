import { AccommodationDTO, TravelDTO, TripDTO } from './dtos';
import { Outgoing } from './outgoing';
import { User } from './user';

export class Trip {
    tripName: string;
    startDate!: Date;
    endDate!: Date;
    organiser!: User;
    travels!: Array<Travelling>;
    
    participantsDictionary!: { [nickname: string] : User};
    participants!: Array<User>;
    accommodations: Array<Accommodation>;
    outgoings: Array<Outgoing>;

    constructor(tripDto: TripDTO) {
        this.tripName = tripDto.tripName;
        this.startDate = tripDto.startDate;
        this.participantsDictionary = {};
        this.participants = new Array<User>();
        this.outgoings = new Array<Outgoing>();

        if (tripDto.accommodationDTOs) {
            this.accommodations = new Array<Accommodation>();
            tripDto.accommodationDTOs.forEach(element => {
                this.accommodations.push(new Accommodation(element));
            })
        }

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

        if (tripDto.expenses) {
            this.outgoings = new Array<Outgoing>();
            tripDto.expenses.forEach(element => {
                this.outgoings.push(new Outgoing(element));
            })
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

    constructor(accommodationDto: AccommodationDTO) {
        this.accommodationName = accommodationDto.accommodationName;
        this.accommodationLocation = accommodationDto.accommodationLocation;
        this.nights = accommodationDto.nights;
        switch(accommodationDto.accommodationType) {
            case 0: {
              this.accommodationType = AccommodationType.HOTEL;
              break;
            }
            case 1: {
              this.accommodationType = AccommodationType.HOSTEL;
              break;
            }
            case 2: {
              this.accommodationType = AccommodationType.RESORT;
              break;
            }
            case 3: {
              this.accommodationType = AccommodationType.APARTMENT;
              break;
            }
            case 4: {
              this.accommodationType = AccommodationType.TENT;
              break;
            }
            case 5: {
              this.accommodationType = AccommodationType.COUCHSURFING;
              break;
            }
          }

        this.participants = new Array<User>();
        if (accommodationDto.participants) {
            this.participants = new Array<User>();
            accommodationDto.participants.forEach(element => {
                this.participants.push(new User(element));
            });
        }
        this.price = accommodationDto.price;
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
        this.id = travelDTO.id;
        this.pricePerPerson = travelDTO.pricePerPerson;
        this.distance = travelDTO.distance;
        this.consumption = travelDTO.consumption;
        this.fuelPrice = travelDTO.fuelPrice;
        this.vignettePrice = travelDTO.vignettePrice;
        this.ticketPricePerPerson = travelDTO.ticketPricePerPerson;
        this.seatReservationPerPerson = travelDTO.seatReservationPerPerson;
        
        if (travelDTO.participants) {
            this.participants = new Array<User>();
            travelDTO.participants.forEach(element => {
                this.participants.push(new User(element));
            });
        }
        switch(travelDTO.travelType) {
            case 0: { 
                this.travelType = TravelType.TRAIN;
                break;
            }
            case 1: { 
                this.travelType = TravelType.BUS;
                break;
            }
            case 2: { 
                this.travelType = TravelType.FERRY;
                break;
            }
            case 3: {
                this.travelType = TravelType.CAR;
                break;
            }

        }
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
  TRAIN = "Train", BUS = "Bus", FERRY = "Ship or Ferry", CAR = "Car",
  indexOf = "indexOf"
}

export enum AccommodationType {
    HOTEL = "Hotel", HOSTEL = "Hostel", RESORT = "Resort", APARTMENT = "Apartment", TENT = "Tent", COUCHSURFING = "Couchsurfing"
}
