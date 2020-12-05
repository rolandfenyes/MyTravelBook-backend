import { UserDTO } from './dtos';
import { Trip } from './trip';

export class User {

    nickname!: string;
    birth!: Date;
    actualAge!: number;
    isAdult!: boolean;
    myTrips!: Array<Trip>;
    myTripsInProgress!: Array<Trip>;
    friendsList!: Array<User>;
    totalCost = 0;
    travelCost = 0;
    accommodationCost = 0;
    outgoingsCost = 0;

    constructor(userDto: UserDTO) {
        this.nickname = userDto.nickname;
        this.birth = userDto.birth;
        var today = new Date();
        this.actualAge = today.getFullYear() - this.birth.getFullYear();
        this.isAdult = (this.actualAge >= 18) ? true : false;
        this.myTrips = new Array<Trip>();
        this.myTripsInProgress = new Array<Trip>();
        this.friendsList = new Array<User>();
        this.totalCost = 0;
    }

    addTrip(trip: Trip) {
        trip.setOrganiser(this);
        
        var today = new Date();
        today.setHours(0,0,0,0);
        if (trip.startDate <= today) {
            this.myTripsInProgress.push(trip);
        }
        this.myTrips.push(trip);
        //Send to database
        return this.myTrips.indexOf(trip);
    }

    addFriends(friendsArray: Array<User>) {
        this.friendsList = friendsArray;
    }

    addFriend(newFriend: User) {
        //TODO send to Backend
        this.friendsList.push(newFriend);
    }

    increaseTravelCost(travelCost: number) {
        //TODO backend
        this.travelCost = travelCost;
    }

    increaseAcommodationCost(acommodationCost: number) {
        //TODO backend
        this.accommodationCost = acommodationCost;
    }

}

export class MyAccount {

    private static instance: MyAccount;
    
    user!: User;
    userId!: string;

    private constructor() {
    }

    public static getInstance(): MyAccount {
        if (!MyAccount.instance) {
            MyAccount.instance = new MyAccount();
        }
        return MyAccount.instance;
    }

}