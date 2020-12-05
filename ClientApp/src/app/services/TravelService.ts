import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TravelDTO, TripDTO, UserIdDto } from "../model/dtos";
import { TravelType } from "../model/trip";
import { MyAccount } from "../model/user";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
  })
export class TravelService {

    travelUrl: string;
    trips: TripDTO[];
    userId: string;
    userService: UserService;

    constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
        this.travelUrl="api/travel";
      }

    async getTravel(id: number): Promise<TravelDTO> {
      return this.http.get<TravelDTO>(this.baseUrl + this.travelUrl + "/" + id).toPromise();
    }

    async addNewTravel(travelDto: TravelDTO): Promise<number> {
        return this.http.post<number>(this.baseUrl + this.travelUrl, travelDto).toPromise();
    }

}