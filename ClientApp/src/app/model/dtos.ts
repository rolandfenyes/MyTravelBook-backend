export interface TripDTO {
    id: number;
    tripName: string;
    startDate: Date;
    endDate: Date;
    organiserID: string;
    organiserName: string;
    travelDTOs: TravelDTO[];
    accommodationDTOs: AccommodationDTO[];
    participants: UserDTO[];
    expenses: ExpenseDTO[];
  }
  
export interface TravelDTO {
    id: number;
    travelType: number;
    startPoint: string;
    destination: string;
    pricePerPerson: number;
    participants: UserDTO[];
    distance: number;
    consumption: number;
    fuelPrice: number;
    vignettePrice: number;
    ticketPricePerPerson: number;
    seatReservationPerPerson: number;
    tripID: number;
  }
  
export interface AccommodationDTO {
    id: number;
    accommodationName: string;
    accommodationLocation: string;
    nights: number;
    accommodationType: number;
    price: number;
    participants: UserDTO[];
    tripID: number;
  }
  
export interface UserDTO {
    id: string;
    nickname: string;
    birth: Date;
  }
  
export interface ExpenseDTO {
    id: number;
    expenseName: string;
    location: string;
    price: number;
    expenseType: number;
    applicationUserDTOs: UserDTO[];
    tripID: number;
  }