import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MainPage } from '../Main/Main';
import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

declare var google;






@Component({
  selector: 'page-Moodmap',
  templateUrl: 'Moodmap.html'
})



export class MoodmapPage {



  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http, public auth: Auth) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {



    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: true,

        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();


    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {

    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

    this.http.get(url + "/moods", { "headers": headers }).map(res => res.json()).subscribe(res => {


      var pleasance = res.moods[0].pleasance,
        activation = res.moods[0].activation;
      console.log(activation);
      console.log(pleasance);

      var image;

      if (pleasance == 1 && activation == 1) {
        image = '/assets/Markers/marker_mood1.png'
      } else if (pleasance == 1 && activation == 0) {
        image = '/assets/Markers/marker_mood2.png'
      } else if (pleasance == 0 && activation == 1) {
        image = '/assets/Markers/marker_mood3.png'
      } else {
        image = '/assets/Markers/marker_mood4.png'
      }
      console.log(image);



      var icon = {
        url: image,
        scaledSize: new google.maps.Size(40, 40), // scaled size
        //origin: new google.maps.Point(0,0), // origin
        //anchor: new google.maps.Point(0, 0) // anchor
      };




      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon: icon
      });


      let content = "<h4>Information!</h4>";

      this.addInfoWindow(marker, content);
    });

    var locations = [[42.373166, -71.069583], [42.371053, -71.079858]];
    var fillColor = "#2BBD29";
    var markers = [];
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var latLng = new google.maps.LatLng(location[0],
        location[1]);
      var marker = new google.maps.Marker({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8.5,
          fillColor: fillColor,
          fillOpacity: 0.4,
          strokeWeight: 0.4
        },
        map: this.map,
        position: latLng,
        animation: google.maps.Animation.DROP
      });



      marker.setOpacity(0.5);
      markers.push(marker);

    }




















  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }



  backButton() {
    this.navCtrl.push(MainPage);
  }

}


