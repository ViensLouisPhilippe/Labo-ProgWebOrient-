import { DataService } from '../services/data.service';
import { Character } from './../models/character';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  
  characterName : string = "";

  constructor(public data : DataService) { }

  ngOnInit() {
    
  }

}
