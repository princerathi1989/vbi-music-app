
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vbi-music';
  data = { columns: ['thumbnail', 'title', 'album'], flow: 'all' };
  constructor() { }
}

