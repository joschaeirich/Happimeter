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

  url = "http://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();

  moodData: any = [];
  locations: any = [];

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);

  }

  ionViewDidLoad() {


    this.http.get(this.url + "/moods", { "headers": this.headers }).map(res => res.json()).subscribe(res => {
      for (var i = 0; i < res.moods.length; ++i) {
        var data: any = {};

        if (res.moods[i].pleasance == 1 && res.moods[i].activation == 1) {
          data.mood = 0
          data.fillcolor = "red"
          data.locationLat = 42.367180
          data.locationLong = -71.076075
        } else if (res.moods[i].pleasance == 1 && res.moods[i].activation == 0) {
          data.mood = 1
          data.fillcolor = "blue"
          data.locationLat = 42.364291
          data.locationLong = -71.081918
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 1) {
          data.mood = 2
          data.fillcolor = "black"
          data.locationLat = 42.363241
          data.locationLong = -71.082547
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 0) {
          data.mood = 3
          data.fillcolor = "green"
          data.locationLat = 42.363788
          data.locationLong = - 71.079103
        }
        data.timestamp = res.moods[i].timestamp;
        this.moodData.push(data);
      };
    });



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

    this.http.get(this.url + "/moods", { "headers": this.headers }).map(res => res.json()).subscribe(res => {


      var pleasance = res.moods[0].pleasance,
        activation = res.moods[0].activation;

      var image;
      if (pleasance == 1 && activation == 1) {
        image = '/assets/Markers/marker_mood1.png'
      } else if (pleasance == 1 && activation == 0) {
        image = '/assets/Markers/marker_mood2.png'
      } else if (pleasance == 0 && activation == 1) {
        image = '/assets/Markers/marker_mood3.png'
      } else if (pleasance == 0 && activation == 0) {
        image = '/assets/Markers/marker_mood4.png'
      }


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

    //var fillColor = "#2BBD29";

    var markers = [];
    for (var i = 0; i < this.moodData.length; i++) {
      var location = [[this.moodData[i].locationLat], [this.moodData[i].locationLong]];

      var latLng = new google.maps.LatLng(location[0],
        location[1]);
      var marker = new google.maps.Marker({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8.5,
          fillColor: this.moodData[i].fillcolor,
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


