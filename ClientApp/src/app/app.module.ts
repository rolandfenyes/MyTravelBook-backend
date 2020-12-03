import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { CustomizeTripPageComponent } from './customize-trip-page/customize-trip-page.component';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { MyTripsPageComponent } from './my-trips-page/my-trips-page.component';
import { NewTripPageComponent } from './new-trip-page/new-trip-page.component';
import { OutgoingCardComponent } from './outgoing-card/outgoing-card.component';
import { PersonCostsCardComponent } from './person-costs-card/person-costs-card.component';
import { TravelCardComponent } from './travel-card/travel-card.component';
import { TripCardComponent } from './trip-card/trip-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AccommodationCardComponent,
    CustomizeTripPageComponent,
    FriendCardComponent,
    MyTripsPageComponent,
    NewTripPageComponent,
    OutgoingCardComponent,
    PersonCostsCardComponent,
    TravelCardComponent,
    TripCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'}, //canActivate: [AuthorizeGuard]
      { path: 'my-trips', component: MyTripsPageComponent},
      { path: 'create-new-trip', component: NewTripPageComponent},
      { path: 'customize-trip/:id', component: CustomizeTripPageComponent}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
