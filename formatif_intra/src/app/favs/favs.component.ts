import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  jsonData : string | null = null;
  // Liste de favoris temporaire
  pkmns : Pokemon[] = [];

  constructor() { }

  ngOnInit() {
    this.jsonData = localStorage.getItem("listFavs");
    if(this.jsonData != null)
    {
      this.pkmns = JSON.parse(this.jsonData);
    }
  }

}
