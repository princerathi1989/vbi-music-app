
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlaylist } from './../../core/models/music';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: IPlaylist[] | null | string;
  createPlaylist = false;
  data: any = { columns: ['thumbnail', 'title', 'album', 'add'], flow: 'create' };
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    const data = localStorage.getItem('playlists');
    this.playlists = data ? JSON.parse(data) : data;
  }

  create(): void {
    this.createPlaylist = true;
  }

  showPlaylists(): void {
    this.createPlaylist = false;
    this.getPlaylists();
  }

  openPlaylist(playlist: IPlaylist): void {
    this.router.navigateByUrl('/playlist', { state: playlist });
  }

}
