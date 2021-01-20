import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { PlaylistsComponent } from './playlists/playlists.component';

export const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent
  },
  {
    path : 'playlist',
    component : PlaylistComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
