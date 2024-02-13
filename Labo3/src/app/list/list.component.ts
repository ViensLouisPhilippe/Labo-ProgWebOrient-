import { DataService } from '../services/data.service';
import { Character } from './../models/character';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  constructor(public data : DataService) { }

  ngOnInit() {
  }

}
