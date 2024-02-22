import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// METTRE VOTRE PROPRE CLÉ D'API !!
const googleApiKey = "AIzaSyBiiIi-GVR1Ky8Sdo0JxZjjZ61JBhlmXUU";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http : HttpClient) { }

  async searchVideoId(searchText : string) : Promise<string>{
    // Requête pour obtenir l'Id d'une vidéo YouTube ici ! Utilisez le paramètre searchText.

    // Remplacez ce return par l'id de la vidéo obtenue.
    let id = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key="+ googleApiKey + "&q="+ searchText));
    return id.items[0].id.videoId;
  }

}
