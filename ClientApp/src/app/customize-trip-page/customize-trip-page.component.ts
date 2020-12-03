import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutgoingTypes, Outgoing } from '../model/outgoing';
import { Trip, TravelType, Travelling, Accommodation, AccommodationType, TravellingByCar, TravellingByBus, TravellingByTrain, TravellingByFerry } from '../model/trip';
import { MyAccount, User } from '../model/user';

@Component({
  selector: 'app-customize-trip-page',
  templateUrl: './customize-trip-page.component.html',
  styleUrls: ['./customize-trip-page.component.scss']
})
export class CustomizeTripPageComponent implements OnInit {

  trip!: Trip;

  isDetailedOptionsHidden = true;
  buttonDictionary!: { [id: string]: string };

  travelTypes = TravelType;
  selectedTravelType!: string;
  actualShownTravel!: TravelType;

  selectedTravel: Travelling = new Travelling(0, "", "", [], TravelType.CAR);
  selectedAccommodation: Accommodation = new Accommodation("", "", 0, AccommodationType.HOTEL, [], 0);
  
  accommodationTypes = AccommodationType;

  selectedFriend!: string;

  outgoingTypes = OutgoingTypes;

  //COMMON
  startPoint!: string;
  destination!: string
  travelType!: TravelType;  
  selectedFriends = new Array<User>();

  //CAR
  distance!: number;
  consumption!: number;
  fuelPrice!: number;
  vignettePrice!: number;

  //PUBLIC TRANSPORT
  ticketPricePerPerson!: number;
  seatReservationPerPerson!: number;

  //ACCOMMODATIONS
  accommodationLocation!: string;
  accommodationName!: string;
  accommodationType!: AccommodationType;
  nights!: number;
  accommodationPrice!: number;

  //OUTGOINGS
  location!: string;
  outgoingName!: string;
  outgoingPrice!: number;
  outgoingType!: OutgoingTypes;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    var idString: string;
    idString = this.route.snapshot.paramMap.get('id')!;
    var id = Number(idString);

    this.trip = MyAccount.getInstance().user.myTrips[id];
    this.buttonDictionary = { ['addNewTravelButton']: "customizeTravelTable", ['addNewAccommodationButton']: "customizeAccommodationTable", ['addNewOutGoingButton']: "customizeOutgoingTable"};
  }

  travelCardClicked(index: number) {
    this.clearSideBar();
    if (this.selectedTravelType) {
      document.getElementById('showTravelDetailsTable'+this.selectedTravelType)?.classList.add('hidden');
    }
    this.selectedTravel = this.trip.travels[index];
    this.selectedTravelType = (this.selectedTravel.travelType == TravelType.CAR) ? TravelType.CAR : "PublicTransport";
    document.getElementById('showTravelDetailsTable'+this.selectedTravelType)?.classList.remove('hidden');
  }

  accommodationCardClicked(index: number) {
    this.clearSideBar();
    this.selectedAccommodation = this.trip.accommodations[index];
    document.getElementById('showAccommodationDetailsTable')?.classList.remove('hidden');
  }

  clearSideBar() {
    document.getElementById('showAccommodationDetailsTable')?.classList.add('hidden');
    document.getElementById('showTravelDetailsTable'+this.selectedTravelType)?.classList.add('hidden');
  }

  clearSelectedFriends() {
    this.selectedFriends = new Array<User>();
  }

  optionsButtonPressed(buttonId: string) {
    this.clearSideBar();
    this.clearSelectedFriends();

    if (this.isDetailedOptionsHidden) {
      this.isDetailedOptionsHidden = false;
      document.getElementById(this.buttonDictionary[buttonId])?.classList.remove('hidden');
      this.manipulateButtons(buttonId, this.isDetailedOptionsHidden);
      
    } else {
      this.isDetailedOptionsHidden = true;
      document.getElementById(this.buttonDictionary[buttonId])?.classList.add('hidden');
      this.manipulateButtons(buttonId, this.isDetailedOptionsHidden);
    }
  }

  manipulateButtons(activeId: string, isActivated: boolean) {
    const ids = new Array<string>('addNewTravelButton', 'addNewAccommodationButton', 'addNewOutGoingButton');
    const texts: {[id: string]: string} = {['addNewTravelButton']: "Add new travel", ['addNewAccommodationButton']: "Add new accommodation", ['addNewOutGoingButton']: "Add new outgoing"};

    var text: string;
    if (isActivated) {
      text = texts[activeId];
    } else {
      text = "Close";
    }
    document.getElementById(activeId)!.innerText = text;

    ids.forEach(element => {
      if (element !== activeId) {
        if (isActivated) {
          document.getElementById(element)!.classList.remove('hidden');
        } else {
          document.getElementById(element)!.classList.add('hidden');
        }
      }
    });
  }

  showTravelTypeOptions() {
    if (this.actualShownTravel) {
      document.getElementById('travellingBy' + this.actualShownTravel + 'Options')?.classList.add('hidden');
    }
    if (this.travelType == TravelType.CAR) {
      document.getElementById('travellingBy' + this.travelType + 'Options')?.classList.remove('hidden');
    } else {
      document.getElementById('travellingByPublicTransportOptions')?.classList.remove('hidden');
    }
    document.getElementById('finalRow')?.classList.remove('hidden');
    this.actualShownTravel = this.travelType;
  }

  accommodationTypeHasBeenChosen() {
    document.getElementById('finalRowAccommodation')?.classList.remove('hidden');
  }

  outgoingTypeHasBeenChosen() {
    document.getElementById('finalRowOutgoing')?.classList.remove('hidden');
  }

  addFriendToTravel() {
    document.getElementById('addFriendButton')!.innerText = "Add friend";
    if (this.selectedFriends.includes(this.trip.participantsDictionary[this.selectedFriend])){
      document.getElementById('addFriendButton')!.innerText = "Already added";
    } else {
      this.selectedFriends.push(this.trip.participantsDictionary[this.selectedFriend]);
    }
    
  }

  addFriendToAccommodation() {
    document.getElementById('addFriendToAccommodationButton')!.innerText = "Add friend";
    if (this.selectedFriends.includes(this.trip.participantsDictionary[this.selectedFriend])){
      document.getElementById('addFriendToAccommodationButton')!.innerText = "Already added";
    } else {
      this.selectedFriends.push(this.trip.participantsDictionary[this.selectedFriend]);
    }
  }

  addFriendToOutgoing() {
    document.getElementById('addFriendToOutgoingButton')!.innerText = "Add friend";
    if (this.selectedFriends.includes(this.trip.participantsDictionary[this.selectedFriend])){
      document.getElementById('addFriendToOutgoingButton')!.innerText = "Already added";
    } else {
      this.selectedFriends.push(this.trip.participantsDictionary[this.selectedFriend]);
    }
  }

  getFriendsInArray() {
    const friendsArray = new Array<User>();
    this.selectedFriends.forEach(friend => {
      friendsArray.push(friend);
    });
    return friendsArray;
  }

  createNewTravel() {
    var newTravel: Travelling;
    const friendsArray = this.getFriendsInArray();
    switch(this.travelType) {
      case TravelType.CAR: {
        newTravel = new TravellingByCar(this.trip.travels.length + 1, this.startPoint, this.destination, friendsArray, this.distance, this.consumption, this.fuelPrice, this.vignettePrice);
        break;
      }
      case TravelType.BUS: {
        newTravel = new TravellingByBus(this.trip.travels.length + 1, this.startPoint, this.destination, friendsArray, this.ticketPricePerPerson, this.seatReservationPerPerson);
        break;
      }
      case TravelType.TRAIN: {
        newTravel = new TravellingByTrain(this.trip.travels.length + 1, this.startPoint, this.destination, friendsArray, this.ticketPricePerPerson, this.seatReservationPerPerson);
        break;
      }
      case TravelType.FERRY: {
        newTravel = new TravellingByFerry(this.trip.travels.length + 1, this.startPoint, this.destination, friendsArray, this.ticketPricePerPerson, this.seatReservationPerPerson);
        break;
      }
    }
    this.trip.addNewTravel(newTravel!);

  }

  createNewAccommodation() {
    var newAccommodation: Accommodation;
    const friendsArray = this.getFriendsInArray();
    newAccommodation = new Accommodation(this.accommodationName, this.accommodationLocation, this.nights, this.accommodationType, friendsArray, this.accommodationPrice);
    this.trip.addAccommodation(newAccommodation);
  }

  createNewOutgoing() {
    const friendsArray = this.getFriendsInArray();
    var newOutgoing = new Outgoing(this.outgoingName, friendsArray, this.outgoingPrice, this.outgoingType, this.location);
    this.trip.addNewOutgoing(newOutgoing);
  }

}