import { Injectable } from '@angular/core';
import { SongsService } from './songs.service';
import { Album, Song } from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private _songsService: SongsService) { }

  getAllSongs(): Promise<Song[]> {
    return this._songsService.getSongs();
  }

  getAllAlbums(): Promise<Album[]> {
    return this._songsService.getAlbums();
  }
}
