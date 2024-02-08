import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  characters : string[] = ["bebe","butters","clyde","craig","eric","kenny","kyle","nichole","stan","tolkien","wendy"];
constructor() { }

}
