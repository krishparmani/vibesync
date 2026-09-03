import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

import { Music } from '../services/music';

@Component({
  selector: 'app-music-player',
  imports: [],
  templateUrl: './music-player.html',
  styleUrl: './music-player.css',
})
export class MusicPlayer implements OnInit {

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  volume = 0.7;

  trackTitle = '';
  artist = '';
  audioUrl = '';
  coverUrl = '';

  tracks: any[] = [];
  currentTrackIndex = 0;

  constructor(
    private musicService: Music,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.musicService.getMusic().subscribe((data: any) => {

      this.tracks = data.tracks;

      const firstTrack = this.tracks[0];

      this.trackTitle = firstTrack.title;
      this.artist = firstTrack.artist;
      this.audioUrl = `http://127.0.0.1:5000/media/${firstTrack.audio}`;
      this.coverUrl = firstTrack.cover;

      // Force Angular to update the player UI
      this.cdr.detectChanges();

      // Now the audio element definitely exists
      const audio = this.audioPlayer.nativeElement;

      audio.src = this.audioUrl;
      audio.volume = this.volume;
      audio.load();

    });
  }

  nextTrack(): void {

    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.tracks.length;

    this.loadTrack();
  }

  previousTrack(): void {

    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.tracks.length) %
      this.tracks.length;

    this.loadTrack();
  }

  private loadTrack(): void {

    const track = this.tracks[this.currentTrackIndex];

    this.trackTitle = track.title;
    this.artist = track.artist;
    this.audioUrl = `http://127.0.0.1:5000/media/${track.audio}`;
    this.coverUrl = track.cover;

    const audio = this.audioPlayer.nativeElement;

    audio.src = this.audioUrl;
    audio.load();

    audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch(() => {
        this.isPlaying = false;
      });
  }

  togglePlay(audio: HTMLAudioElement): void {

    if (audio.paused) {

      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          console.log('Unable to play audio.');
          this.isPlaying = false;
        });

    } else {

      audio.pause();
      this.isPlaying = false;
    }
  }

  toggleMute(audio: HTMLAudioElement): void {
    audio.muted = !audio.muted;
  }

  changeVolume(event: Event, audio: HTMLAudioElement): void {

    const value =
      Number((event.target as HTMLInputElement).value);

    this.volume = value;
    audio.volume = value;

    if (value > 0) {
      audio.muted = false;
    }
  }
}