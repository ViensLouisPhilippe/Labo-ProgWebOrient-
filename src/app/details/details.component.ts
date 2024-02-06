import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  characterName : string | null = null;
  characterDetails : Character | null = null;

  constructor(public http: HttpClient, public route : ActivatedRoute){
    
  }
  async ngOnInit() : Promise<void>{
    this.characterName = this.route.snapshot.paramMap.get("character");
    if(this.characterName == null){
        this.characterName = "kenny";
    }
    let x = await lastValueFrom(this.http.get<any>("https://spapi.dev/api/characters?search=" + this.characterName));
    this.characterDetails = new Character(x.data[0].name, x.data[0].age, x.data[0].occupation, x.data[0].grade, x.data[0].episodes.length);
    console.log(this.characterDetails);
  }

}
