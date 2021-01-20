import { Album, IPlaylist, Song } from './../../../core/models/music';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  albums: Album[] = JSON.parse(localStorage.getItem('albums'));
  playlist: IPlaylist;
  addSongs: boolean;
  data: any = { columns: ['thumbnail', 'title', 'album', 'add'], flow: 'add' };
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getData(history.state);
  }

  getData(data: any) {
    this.playlist = data;
    this.data.flow = data;
    if(!this.playlist.title) {this.router.navigate(['/'])}
  }

  add() {
    this.addSongs = true;
  }

  showPlaylists(): void {
    this.addSongs = false;
    this.getData(JSON.parse(localStorage.getItem('playlists'))[this.playlist.id - 1]);
  }

  back() {
    this.router.navigate(['/']);
  }

  shuffle(songs: Song[]): void {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    this.playlist.songs = songs;
  }

  remove(song: Song) {
    song.added = false;
    const index = this.playlist.songs.findIndex((x:Song) => x.id === song.id);
    if(index > -1) this.playlist.songs.splice(index, 1);
    this.updatePlaylist(this.playlist);
  }

  updatePlaylist(playlist: IPlaylist) {
    let playlists = JSON.parse(localStorage.getItem('playlists'));
    playlists[playlist.id - 1].songs = playlist.songs;
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }
}
