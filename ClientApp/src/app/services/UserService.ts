import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO, UserIdDto } from '../model/dtos';
import { MyAccount } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: UserIdDto;
  private userUrl: string;

  constructor(private http : HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.userUrl="api/user";
    this.getUser();
  }

  public getUser(): Promise<UserIdDto> {
    return this.http.get<UserIdDto>(this.baseUrl + this.userUrl + '/getCurrentUserId').toPromise();
  }

  public getUserDto(): Promise<UserDTO> {
    return this.http.get<UserDTO>(this.baseUrl + this.userUrl + '/' + MyAccount.getInstance().userId).toPromise();
  }

  public getFriends(): Promise<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl + this.userUrl + '/friends/' + MyAccount.getInstance().userId).toPromise();
  }

  public changeNickname(nickname: string, birth: Date) {
    var userDto = new UserDTO();
    userDto.id = "",
    userDto.nickname = nickname;
    userDto.birth = birth;
    console.log(userDto);
    return this.http.put(this.baseUrl + this.userUrl + '/' + MyAccount.getInstance().userId, userDto).toPromise();
  }

  public addFriend(nickname: string): Promise<UserIdDto> {
    var user = new UserDTO();
    user.id = "";
    user.nickname = nickname;
    return this.http.put<UserIdDto>(this.baseUrl + this.userUrl + '/AddFriendByNickname/' + MyAccount.getInstance().userId, user).toPromise();
  }


}