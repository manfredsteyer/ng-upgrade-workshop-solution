import * as angular from 'angular';
import {FlightService} from './services/flight.service';
import {createCityFilter} from './fliters/city.filter';
import {FlightCardComponent} from './flight-search/flight-card.component';
import {createCityValidatorDDO} from './validation/city-validator';
import {createCityAsyncValidatorDDO} from './validation/city-async-validator';
import {HomeComponent} from './home/home.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import {AppComponent} from './app.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {FlightBookingComponent} from './flight-booking/flight-booking.component';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {BookingEventService} from './services/booking-event.service';
import {ShoppingCardComponent} from './shopping-card/shopping-card.component';
import {PassengerService} from './services/passenger.service';
import tabs from './tabs/tabs.module';
import {PassengerCardComponent} from "./passenger-search/passenger-card.component";
import {FlightSearchComponent} from "./flight-search/flight-search.component";

import { UpgradeAdapter } from '@angular/upgrade';
import { NgModule, forwardRef} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import {TabsComponent, TabComponent} from "./tabs/tabs.component";

var app = angular.module('flight-app', ['ngMessages', 'ui.router', tabs]);

export var upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

app.service('flightService', FlightService);
app.service('bookingEventService', BookingEventService );

app.service('oauthService', OAuthService);
app.constant('baseURL', 'http://www.angular.at')
app.filter('city', createCityFilter);
app.component('flightCard', FlightCardComponent);
app.directive('city', createCityValidatorDDO);
app.directive('cityAsync', createCityAsyncValidatorDDO);
app.component('home', HomeComponent);
app.component('passengerSearch', PassengerSearchComponent);
app.component('passengerCard', PassengerCardComponent);
app.component('app', AppComponent);
app.component('flightBooking', FlightBookingComponent);
app.component('shoppingCard', ShoppingCardComponent);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        FlightSearchComponent,
        upgradeAdapter.upgradeNg1Component('flightCard'),
        FlightEditComponent,
        TabsComponent,
        TabComponent
    ],
    providers: [
        PassengerService
    ]
})
class AppModule {
}

app.directive('flightSearch', <any>upgradeAdapter.downgradeNg2Component(FlightSearchComponent));
upgradeAdapter.upgradeNg1Provider('flightService');
upgradeAdapter.upgradeNg1Provider('bookingEventService');
app.factory('passengerService', upgradeAdapter.downgradeNg2Provider(PassengerService));

app.directive('flightEdit', <any>upgradeAdapter.downgradeNg2Component(FlightEditComponent));