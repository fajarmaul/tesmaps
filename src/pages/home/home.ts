import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement : ElementRef;
  map: any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }
  getUserPosition(){
    this.options = {
      enableHighAccuracy : true
    };
    this.geolocation.getCurrentPosition(this.options)
    .then((pos : Geoposition)=>{
      this.currentPos = pos;
      console.log(pos);
    },(err : PositionError)=>{
    console.log("error : " + err.message);
    })


  }

  ionViewDidEnter(){
    this.getUserPosition();
  }

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

 }

 addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

 }

  // loadMap(){
  //   let latLng = new google.maps.LatLng(-34.9290, 138.6010);
  //
  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.mapTypeId.ROADMAP
  //   }
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // }

}
