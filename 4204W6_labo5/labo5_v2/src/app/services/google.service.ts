import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

// METTRE VOTRE PROPRE CLÉ D'API !!
const googleApiKey = "";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http : HttpClient) { }

  searchVideoId(searchText : string) : string{

    // Requête pour obtenir l'Id d'une vidéo YouTube ici ! Utilisez le paramètre searchText.

    // Remplacez ce return par l'id de la vidéo obtenue.
    return "6bXvIEh0WU8";
  }

}
