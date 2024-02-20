import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleService } from '../services/google.service';

const youtubeURL = "https://www.youtube.com/embed/";

@Component({
  selector: 'app-youtubeSearch',
  templateUrl: './youtubeSearch.component.html',
  styleUrls: ['./youtubeSearch.component.css']
})
export class YoutubeSearchComponent implements OnInit {

  videoSearchText : string = "";
  videoId : string = "";
  videoUrl ?: SafeResourceUrl;

  constructor(public google : GoogleService, public sanitizer : DomSanitizer) { }

  ngOnInit() {
  }

  searchVideo():void{
    this.videoId = this.google.searchVideoId(this.videoSearchText); // Obtenir l'id d'une vidéo
    this.getSafeUrl(); // Obtenir l'URL de la vidéo "sanitizé". La vidéo sera automatiquement affichée dans la page après.
  }

  getSafeUrl() : void{
    // Remplissez la variable this.videoUrl avec l'URL de la vidéo à afficher MAIS n'oubliez pas de "sanitize" l'URL.
    // Il vous suffira de concaténer la constante youtubeURL avec this.videoId puis de sanitizer.
    this.videoUrl = undefined;
  }

}
