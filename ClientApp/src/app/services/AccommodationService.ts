import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AccommodationDTO, TravelDTO, TripDTO, UserIdDto } from "../model/dtos";
import { TravelType } from "../model/trip";
import { MyAccount } from "../model/user";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
  })
export class AccommodationService {

    accommodationUrl: string;
    trips: TripDTO[];
    userId: string;
    userService: UserService;

    constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
        this.accommodationUrl="api/accommodation";
      }

    async getTravel(id: number): Promise<TravelDTO> {
      return this.http.get<TravelDTO>(this.baseUrl + this.accommodationUrl + "/" + id).toPromise();
    }

    async addNewAccommodation(accommodationDto: AccommodationDTO): Promise<number> {
        return this.http.post<number>(this.baseUrl + this.accommodationUrl, accommodationDto).toPromise();
    }

}