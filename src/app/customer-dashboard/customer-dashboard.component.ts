import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  @ViewChild('gmapcustomer') gmapElem: any;
  mapObject: google.maps.Map;
  mapPropObject = {};
  pos = {};
  infoWindowObject: google.maps.InfoWindow = new google.maps.InfoWindow;

  constructor() { }

  ngOnInit() {
    this.mapPropObject = {
     // center: new google.maps.LatLng(43.0417898, -76.1228379),
     center: new google.maps.LatLng(35, -76.1228379),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapObject = new google.maps.Map(this.gmapElem.nativeElement, this.mapPropObject);
    console.log(this);
    // this function continuously updates the browser location.
    this.updateCoordinates(this);
  }

  handleLocationError(browserHasGeolocation: boolean, infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(this.mapObject);
  }

  updateCoordinates: any = (thisobject: object) => {
    console.log(thisobject);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // this.infoWindowObject.setPosition(this.pos);
        this.infoWindowObject.setContent('You are here!');
        this.infoWindowObject.open(this.mapObject);
        // this.mapObject.setCenter(this.pos);
        setTimeout(() => {
          console.log('executing setTimeout after time limit');
          this.updateCoordinates(thisobject);
        }, 10000);
        console.log('after calling setTimeout');
      }, () => {
        this.handleLocationError(true, this.infoWindowObject, this.mapObject.getCenter());
      });
    } else {
      // browser doesn't support geolocation
      this.handleLocationError(false, this.infoWindowObject, this.mapObject.getCenter());
    }
  }

}
