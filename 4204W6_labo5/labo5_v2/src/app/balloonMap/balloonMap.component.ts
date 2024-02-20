import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balloonMap',
  templateUrl: './balloonMap.component.html',
  styleUrls: ['./balloonMap.component.css']
})
export class BalloonMapComponent implements OnInit {

  inputLat : number = 0;
  inputLng : number = 0;
  markerPosition : google.maps.LatLngLiteral[] = [];
  center : google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom : number = 2;

  // Ajoutez une variable de classe qui servira de tableau de marqueurs

  constructor() { }

  ngOnInit() {
  }

  addBalloon() : void {
    // Ajoutez un marqueur dans votre tableau de marqueurs en vous servant des données this.inputLat et this.inputLng !
    this.markerPosition.push({lat : this.inputLat, lng : this.inputLng}); 
  }

  clearBalloons() : void {
    // Videz le tableau de marqueurs ! (= [])
    this.markerPosition = [];
  }

}
