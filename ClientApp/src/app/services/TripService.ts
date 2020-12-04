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
    userId: string;
    userService: UserService;

    constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
        this.tripUrl="api/trip";
        this.userService = new UserService(this.http, this.baseUrl);
        this.userService.getUser().then(u => this.userId = u.id);
      }

    async getMyTrips(): Promise<TripDTO[]> {
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