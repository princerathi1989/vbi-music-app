import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album, Song } from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private httpClient: HttpClient) { }

  getSongs(): Promise<Song[]> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/photos').toPromise();
  }

  getAlbums(): Promise<Album[]> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/albums').toPromise();
  }
}
