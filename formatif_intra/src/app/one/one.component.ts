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
  jsonPokemonData : string | null = null;
  jsonListFavsData : string | null = null;
  listFavoris : Pokemon[] = [];


  constructor(public pokeApi : PokeapiService) { }

  ngOnInit() { 
    this.jsonPokemonData = localStorage.getItem("pokemonOne");
    if(this.jsonPokemonData != null)
    {
      this.pokemon = JSON.parse(this.jsonPokemonData);
    }  
    this.jsonListFavsData = localStorage.getItem("listFavs");
    if(this.jsonListFavsData != null)
    {
      this.listFavoris = JSON.parse(this.jsonListFavsData);
    } 
  }
  async getPokemon(){
    this.pokemon = await this.pokeApi.getPkmnOne(this.nomRechercher.toLowerCase());
  }
  emptyListPkmn(){
    this.listFavoris = [];
    this.saveListPkmn();
  }
  addFavs(){
    // Récupérer le tableau des favoris ACTUEL 

    // Prévois la situation où le stockage local était vide (null)
    if(this.pokemon != null ) {this.listFavoris.push(this.pokemon);}
    this.saveListPkmn();
  }
  saveListPkmn(){
    localStorage.setItem("listFavs", JSON.stringify(this.listFavoris));
  }
}
