import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AccommodationDTO, ExpenseDTO, TravelDTO, TripDTO, UserIdDto } from "../model/dtos";
import { TravelType } from "../model/trip";
import { MyAccount } from "../model/user";
import { UserService } from "./UserService";

@Injectable({
    providedIn: 'root'
  })
export class OutgoingService {

    expenseUrl: string;
    trips: TripDTO[];
    userId: string;
    userService: UserService;

    constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
        this.expenseUrl="api/expense";
      }

    async getOutgoing(id: number): Promise<ExpenseDTO> {
      return this.http.get<ExpenseDTO>(this.baseUrl + this.expenseUrl + "/" + id).toPromise();
    }

    async addNewOutgoing(expenseDto: ExpenseDTO): Promise<number> {
        return this.http.post<number>(this.baseUrl + this.expenseUrl, expenseDto).toPromise();
    }

}