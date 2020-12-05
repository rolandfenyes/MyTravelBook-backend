import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationDTO, TravelDTO, TripDTO, UserDTO } from '../model/dtos';
import { OutgoingTypes, Outgoing } from '../model/outgoing';
import { Trip, TravelType, Travelling, Accommodation, AccommodationType } from '../model/trip';
import { MyAccount, User } from '../model/user';
import { AccommodationService } from '../services/AccommodationService';
import { TravelService } from '../services/TravelService';
import { TripService } from '../services/TripService';

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

  selectedTravel: Travelling = new Travelling(new TravelDTO());
  selectedAccommodation: Accommodation = new Accommodation(new AccommodationDTO());
  
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

  tripService: TripService;
  travelService: TravelService;
  accommodationService: AccommodationService;
  id: number;

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.tripService = new TripService(http, baseUrl);
    this.travelService = new TravelService(http, baseUrl);
    this.accommodationService = new AccommodationService(http, baseUrl);
  }

  ngOnInit(): void {
    this.trip = new Trip(new TripDTO());
    var idString: string;
    idString = this.route.snapshot.paramMap.get('id')!;
    this.id = Number(idString);
    
    this.tripService.getTrip(this.id).then(tripDto => {
      this.trip = new Trip(tripDto);
    });

    this.buttonDictionary = { ['addNewTravelButton']: "customizeTravelTable", ['addNewAccommodationButton']: "customizeAccommodationTable", ['addNewOutGoingButton']: "customizeOutgoingTable"};
  }

  travelCardClicked(index: number) {
    this.clearSideBar();
    if (this.selectedTravelType) {
      document.getElementById('showTravelDetailsTable'+this.selectedTravelType).classList.add('hidden');
    }
    this.selectedTravel = this.trip.travels[index];
    console.log(this.selectedTravel);
    this.selectedTravelType = (this.selectedTravel.travelType == TravelType.CAR) ? TravelType.CAR : "PublicTransport";
    document.getElementById('showTravelDetailsTable'+this.selectedTravelType).classList.remove('hidden');
  }

  accommodationCardClicked(index: number) {
    this.clearSideBar();
    this.selectedAccommodation = this.trip.accommodations[index];
    document.getElementById('showAccommodationDetailsTable').classList.remove('hidden');
  }

  clearSideBar() {
    document.getElementById('showAccommodationDetailsTable').classList.add('hidden');
    try {
      document.getElementById('showTravelDetailsTable'+this.selectedTravelType).classList.add('hidden');
    } catch {}
  }

  clearSelectedFriends() {
    this.selectedFriends = new Array<User>();
  }

  optionsButtonPressed(buttonId: string) {
    this.clearSideBar();
    this.clearSelectedFriends();

    if (this.isDetailedOptionsHidden) {
      this.isDetailedOptionsHidden = false;
      document.getElementById(this.buttonDictionary[buttonId]).classList.remove('hidden');
      this.manipulateButtons(buttonId, this.isDetailedOptionsHidden);
      
    } else {
      this.isDetailedOptionsHidden = true;
      document.getElementById(this.buttonDictionary[buttonId]).classList.add('hidden');
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
      document.getElementById('travellingBy' + this.actualShownTravel + 'Options').classList.add('hidden');
    }
    if (this.travelType == TravelType.CAR) {
      document.getElementById('travellingBy' + this.travelType + 'Options').classList.remove('hidden');
    } else {
      document.getElementById('travellingByPublicTransportOptions').classList.remove('hidden');
    }
    document.getElementById('finalRow').classList.remove('hidden');
    this.actualShownTravel = this.travelType;
  }

  accommodationTypeHasBeenChosen() {
    document.getElementById('finalRowAccommodation').classList.remove('hidden');
  }

  outgoingTypeHasBeenChosen() {
    document.getElementById('finalRowOutgoing').classList.remove('hidden');
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
    var newTravel = new TravelDTO();
    newTravel.id = 0;
    switch(this.travelType) {
      case TravelType.TRAIN: {
        newTravel.travelType = 0;
        break;
      }
      case TravelType.BUS: {
        newTravel.travelType = 1;
        break;
      }
      case TravelType.FERRY: {
        newTravel.travelType = 2;
        break;
      }
      case TravelType.CAR: {
        newTravel.travelType = 3;
      }
    }
    newTravel.startPoint = this.startPoint;
    newTravel.destination = this.destination;
    newTravel.distance = (this.distance != null) ? Number(this.distance) : 0;
    newTravel.consumption = (this.consumption != null) ? Number(this.consumption) : 0;
    newTravel.fuelPrice = (this.fuelPrice != null) ? Number(this.fuelPrice) : 0;
    newTravel.vignettePrice = (this.vignettePrice != null) ? Number(this.vignettePrice) : 0;
    newTravel.ticketPricePerPerson = (this.ticketPricePerPerson != null) ? Number(this.ticketPricePerPerson) : 0;
    newTravel.seatReservationPerPerson = (this.seatReservationPerPerson != null) ? Number(this.seatReservationPerPerson) : 0;
    newTravel.tripID = this.id;
    newTravel.pricePerPerson = 0;
    newTravel.participants = [];
    this.selectedFriends.forEach(element => {
      var userDTO = new UserDTO();
      userDTO.id = element.ID;
      userDTO.birth = element.birth;
      userDTO.nickname = element.nickname;
      newTravel.participants.push(userDTO);
    });
    this.travelService.addNewTravel(newTravel);
    this.trip.travels.push(new Travelling(newTravel));
  }

  createNewAccommodation() {
    var newAccommodation = new AccommodationDTO();
    newAccommodation.id = 0;
    newAccommodation.accommodationName = this.accommodationName;
    newAccommodation.accommodationLocation = this.accommodationLocation;
    newAccommodation.nights = Number(this.nights);
    newAccommodation.price = Number(this.accommodationPrice);
    newAccommodation.tripID = this.id;
    switch(this.accommodationType) {
      case AccommodationType.HOTEL: {
        newAccommodation.accommodationType = 0;
        break;
      }
      case AccommodationType.HOSTEL: {
        newAccommodation.accommodationType = 1;
        break;
      }
      case AccommodationType.RESORT: {
        newAccommodation.accommodationType = 2;
        break;
      }
      case AccommodationType.APARTMENT: {
        newAccommodation.accommodationType = 3;
        break;
      }
      case AccommodationType.TENT: {
        newAccommodation.accommodationType = 4;
        break;
      }
      case AccommodationType.COUCHSURFING: {
        newAccommodation.accommodationType = 5;
        break;
      }
    }
    newAccommodation.participants = [];
    this.selectedFriends.forEach(element => {
      var userDTO = new UserDTO();
      userDTO.id = element.ID;
      userDTO.birth = element.birth;
      userDTO.nickname = element.nickname;
      newAccommodation.participants.push(userDTO);
    });
    console.log(newAccommodation);
    this.accommodationService.addNewAccommodation(newAccommodation);
    this.trip.accommodations.push(new Accommodation(newAccommodation));
  }

  createNewOutgoing() {
    const friendsArray = this.getFriendsInArray();
    var newOutgoing = new Outgoing(this.outgoingName, friendsArray, this.outgoingPrice, this.outgoingType, this.location);
    this.trip.addNewOutgoing(newOutgoing);
  }

}
