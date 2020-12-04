import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { TripDTO, UserIdDto } from "../model/dtos";
import { MyAccount } from "../model/user";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
  })
export class TripService {

    tripUrl: string;
    trips: TripDTO[];

    constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
        this.tripUrl="api/trip";
        var userService = new UserService(http, baseUrl);
        userService.getUser();
      }

    async getMyTrips(): Promise<TripDTO[]> {
      if (MyAccount.getInstance().userId == null) {
        var userService = new userService(this.http, this.baseUrl);
        userService.getUser();
      }
        return this.http.get<TripDTO[]>(this.baseUrl + this.tripUrl + '/usersTrip/' + MyAccount.getInstance().userId).toPromise();
    }

    async addNewTrip(tripDto: TripDTO): Promise<number> {
        var id = this.http.post<number>(this.baseUrl + this.tripUrl, tripDto).toPromise();
        var userIdDto = new UserIdDto();
        userIdDto.id = tripDto.organiserID;
        this.http.put(this.baseUrl + this.tripUrl + 'addUser' + id, userIdDto).toPromise();
        return id;
    }

}