import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  characters : string[] = ["bebe","butters","clyde","craig","eric","kenny","kyle","nichole","stan","tolkien","wendy"];
constructor(public http : HttpClient) { }

async getCharacterDetail(characterName : string) : Promise<Character>{
  let x = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + characterName));
  return new Character(x.data[0].name, x.data[0].age, x.data[0].occupation, x.data[0].grade, x.data[0].episodes.length);
}
}
