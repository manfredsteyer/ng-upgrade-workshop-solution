import * as angular from 'angular';
import {FlightService} from '../services/flight.service';
import {Flight} from "../shared/flight";

import { Component, Input, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'flight-edit',
    templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
    info = 'Flight Edit';

    @Input() id: string;

    flight: Flight = <any>{};
    message: string;

    constructor(
        @Inject('flightService') private flightService: FlightService) {
    }

    ngOnInit() {
        this.flightService
            .getById(this.id)
            .then((flight: Flight) => {
                this.flight = flight;
                this.message = '';
            })
            .catch(resp => {
                console.error(resp);
                this.message = resp.data;
            })

    }

    save() {

        this.flightService
            .save(this.flight)
            .then((flight: Flight) => {
                this.flight = flight;
                this.message = '';
            })
            .catch(resp => {
                console.error(resp);
                this.message = resp.data;
            })
    }
}
