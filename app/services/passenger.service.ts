import {Passenger} from '../shared/passenger';
import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';

@Injectable()
export class PassengerService {

    constructor(
        private http: Http) {
    }

    find(name): Promise<Passenger[]> {
        let url = 'http://www.angular.at/api/passenger';

        // let urlParams = { name: name };
        let search = new URLSearchParams();
        search.set('name', name);

        let headers = new Headers();
        headers.set('Accept', 'text/json');

        return this
                .http
                .get(url, { search: search, headers: headers })
                .map(resp => resp.json())
                .toPromise();
    }
}