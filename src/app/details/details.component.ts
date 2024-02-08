import { DataService } from './../services/data.service';
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


  constructor(public http: HttpClient, public route : ActivatedRoute, public data : DataService){
    
  }
  async ngOnInit() : Promise<void>{
    this.characterName = this.route.snapshot.paramMap.get("character");
    if(this.characterName == null){
        this.characterName = "kenny";
    }

    this.characterDetails = await this.data.getCharacterDetail(this.characterName)
  }

}
