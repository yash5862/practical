import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CommonClass } from "../class/common.class";
import { HttpClient } from "@angular/common/http";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string | number,
        geo: {
        lat: number,
        lng: number
        }
    },
    phone: number | string;
    website: string;
    company: {
        name: string,
        catchPhrase: string,
    }
}

export interface Album {
    userId: number | string,
    id: number | string,
    title: string
}

export interface Photo {
    albumId: number | string,
    id: number | string,
    thumbnailUrl: string,
    title: string,
    url: string
}

@Injectable()
export class UserService extends CommonClass {

    constructor(private http: HttpClient) {
        super();
    }

    getUsersList(): Observable<any> {
        let url = `${this.API_URL}users`;
        return this.http.get(url);
    }

    getUsersAlbums(userID: number | string): Observable<any> {
        let url = `${this.API_URL}albums?userId=${userID}`;
        return this.http.get(url);
    }

    getAlbumPhotos(albumId: number | string): Observable<any> {
        let url = `${this.API_URL}photos?albumId=${albumId}`;
        return this.http.get(url);
    }

}
