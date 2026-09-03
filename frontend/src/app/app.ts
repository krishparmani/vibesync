import { Component } from '@angular/core';
import { MusicPlayer } from './music-player/music-player';

@Component({
  selector: 'app-root',
  imports: [MusicPlayer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}