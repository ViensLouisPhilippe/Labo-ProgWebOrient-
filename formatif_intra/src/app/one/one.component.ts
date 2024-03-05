import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';
import { PokeapiService } from 'src/services/pokeapi.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  pokemon ?: Pokemon;
  nomRechercher : string = "";
  jsonData : string | null = null;
  listFavoris : Pokemon[] = [];


  constructor(public pokeApi : PokeapiService) { }

  ngOnInit() { 
    this.jsonData = localStorage.getItem("pokemonOne");
    if(this.jsonData != null)
    {
      this.pokemon = JSON.parse(this.jsonData);
    }  
  }
  async getPokemon(){
    this.pokemon = await this.pokeApi.getPkmnOne(this.nomRechercher.toLowerCase());
  }

  addFavs(){
    if(this.pokemon != null ) {this.listFavoris.push(this.pokemon);}
    localStorage.setItem("listFavs", JSON.stringify(this.listFavoris));
  }
}
