import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FacadeService } from './../../core/services/facade.service';
import { Album, IPlaylist, Playlist, Song } from '../../core/models/music';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  @Input() data: any;
  @Output() save = new EventEmitter<string>();
  displayedColumns: string[];
  playlists: string = localStorage.getItem('playlists');
  dataSource: MatTableDataSource<Song>;
  albums: Album[];
  added: boolean;
  playlist: IPlaylist;
  playlistForm: NgForm;
  model: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _facadeService: FacadeService) { }

  ngOnInit(): void {
    this.playlist = this.data.flow.title ? this.data.flow : new Playlist(JSON.parse(this.playlists)?.length)
    this.displayedColumns = this.data.columns;
    let albums = localStorage.getItem('albums');
    const getData = albums ? [this._facadeService.getAllSongs()] : [this._facadeService.getAllSongs(), this._facadeService.getAllAlbums()];
    this.getSongsData(getData, albums ? JSON.parse(albums) : null);
  }

  getSongsData(getData: any, albums: any) {
    Promise.all(getData).then((data: any) => {
      this.albums = data.length > 1 ? data[1]: albums;
      localStorage.setItem('albums', JSON.stringify(this.albums));
      this.dataSource = new MatTableDataSource<Song>(data[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.title.toLowerCase().includes(filter);
      };
    }).catch((err) => { console.log(err) });
  }

  search(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  add(song: Song) {
    song.added = true;
    this.playlist.songs.push(song);
  }

  remove(song: Song) {
    song.added = false;
    const index = this.playlist.songs.findIndex((x:Song) => x.id === song.id);
    if(index > -1) this.playlist.songs.splice(index, 1);
  }

  savePlaylist(formData: NgForm) {
    const title = this.data.flow.title;
    this.playlist.title = title ? title : formData?.value?.title;
    let data = '';
    if(title) {
      let playlists = JSON.parse(localStorage.getItem('playlists'));
      playlists[this.playlist.id - 1].songs = this.playlist.songs;
      data = JSON.stringify(playlists);
    } else {
      data = JSON.stringify([...(this.playlists ? JSON.parse(this.playlists): []), this.playlist])
    }
    localStorage.setItem('playlists', data);
    this.save.emit('Saved');
  }

  cancel() {
    this.save.emit('Cancel');
  }
}
