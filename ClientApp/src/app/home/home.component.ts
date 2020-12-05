import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { MyAccount } from '../model/user';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public isAuthenticated: Observable<boolean>;


  constructor(private authorizeService: AuthorizeService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    if (this.isAuthenticated) {
      var userService = new UserService(http, baseUrl);
      userService.getUser().then(u => MyAccount.getInstance().userId = u.id);
    }
  }

}
