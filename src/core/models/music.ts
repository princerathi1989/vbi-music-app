export interface Song {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  added?: boolean;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface IPlaylist {
  id: number;
  title: string;
  songs: Song[];
  createdAt: string;
  navigationId?: number;
}

export class Playlist implements IPlaylist {
  id: number;
  title: string;
  songs: Song[];
  createdAt: string;

  constructor(id?: number | undefined, title?: string, songs?: Song[]) {
    this.id = id ? ++id : 1;
    this.title = title ? title : '';
    this.songs = songs ? songs : [];
    this.createdAt = this.getDate(new Date());
  }

  getDate(date: Date): string {
    let dd: number | string = date.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    let mm: number | string = date.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    const yyyy = date.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }
}
