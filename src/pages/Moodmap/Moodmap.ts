import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


//import * as MarkerClusterer from 'node-js-marker-clusterer';

declare var google;






@Component({
  selector: 'page-Moodmap',
  templateUrl: 'Moodmap.html'
})



export class MoodmapPage {

  url = "https://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();

  moodData_act: any = [];
  moodData_ple: any = [];
  location: any = [];

  markersActivity: any = [];
  markersPleasance: any = [];

  heatmapData_act: any = [];
  heatmapData_ple: any = [];

  heatmap: any

  clicked_activation = true;
  clicked_pleasance = true;

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);

  }


  ionViewDidLoad() {


    this.http.get(this.url + "/moods", { "headers": this.headers }).map(res => res.json()).subscribe(res => {
      for (var i = 0; i < res.moods.length; ++i) {
        var data_act: any = {};

        if (res.moods[i].activation == 2) {
          data_act.fillcolor = "green"
          data_act.locationLat = res.moods[i].position.latitude
          data_act.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].activation == 1) {
          data_act.fillcolor = "orange"
          data_act.locationLat = res.moods[i].position.latitude
          data_act.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].activation == 0) {
          data_act.fillcolor = "red"
          data_act.locationLat = res.moods[i].position.latitude
          data_act.locationLong = res.moods[i].position.longitude
        }
        data_act.timestamp = res.moods[i].timestamp;
        this.moodData_act.push(data_act);

        var data_ple: any = {};
        if (res.moods[i].pleasance == 2) {
          data_ple.fillcolor = "green"
          data_ple.locationLat = res.moods[i].position.latitude
          data_ple.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].pleasance == 1) {
          data_ple.fillcolor = "orange"
          data_ple.locationLat = res.moods[i].position.latitude
          data_ple.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].pleasance == 0) {
          data_ple.fillcolor = "red"
          data_ple.locationLat = res.moods[i].position.latitude
          data_ple.locationLong = res.moods[i].position.longitude
        }


        data_ple.timestamp = res.moods[i].timestamp;
        this.moodData_ple.push(data_ple);

      };
      this.loadMap();


    });
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
      if (pleasance == 2 && activation == 2) {
        image = 'assets/Markers/marker_mood1.png'
      } else if (pleasance == 1 && activation == 2) {
        image = 'assets/Markers/marker_mood2.png'
      } else if (pleasance == 0 && activation == 2) {
        image = 'assets/Markers/marker_mood3.png'
      } else if (pleasance == 2 && activation == 1) {
        image = 'assets/Markers/marker_mood4.png'
      } else if (pleasance == 1 && activation == 1) {
        image = 'assets/Markers/marker_mood5.png'
      } else if (pleasance == 0 && activation == 1) {
        image = 'assets/Markers/marker_mood6.png'
      } else if (pleasance == 2 && activation == 0) {
        image = 'assets/Markers/marker_mood7.png'
      } else if (pleasance == 1 && activation == 0) {
        image = 'assets/Markers/marker_mood8.png'
      } else if (pleasance == 0 && activation == 0) {
        image = 'assets/Markers/marker_mood9.png'
      }

      var icon = {
        url: image,
        scaledSize: new google.maps.Size(40, 40), // scaled size    
      };

      new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        icon: icon
      });

      for (var i = 0; i < this.moodData_act.length; i++) {
        if (this.moodData_act[i].locationLat == null) {
          continue;
        }

        this.location = [this.moodData_act[i].locationLat, this.moodData_act[i].locationLong];



        var heatmap_act_obj: any = {}
        heatmap_act_obj.location = new google.maps.LatLng(this.location[0], this.location[1]);
        heatmap_act_obj.weight = res.moods[i].activation;

        this.heatmapData_act.push(heatmap_act_obj);

        var heatmap_ple_obj: any = {}
        heatmap_ple_obj.location = new google.maps.LatLng(this.location[0], this.location[1]);
        heatmap_ple_obj.weight = res.moods[i].pleasance;

        this.heatmapData_ple.push(heatmap_ple_obj);

      }

    });

  }

  activationHeatmap() {

    if (this.clicked_activation == true) {

      this.markersActivity = [];
      for (var i = 0; i < this.moodData_act.length; i++) {
        if (this.moodData_act[i].locationLat == null) {
          continue;
        }
        var location = [this.moodData_act[i].locationLat, this.moodData_act[i].locationLong];

        var latLng = new google.maps.LatLng(location[0], location[1]);

        var marker = new google.maps.Marker({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8.5,
            fillColor: this.moodData_act[i].fillcolor,
            fillOpacity: 1,
            strokeWeight: 0.4
          },
          map: this.map,
          position: latLng,
          animation: google.maps.Animation.DROP
        });

        this.markersActivity.push(marker);
      }
      this.clicked_activation = false;

    } else if (this.clicked_activation == false) {
      for (var i = 0; i < this.markersActivity.length; i++) {
        this.markersActivity[i].setMap(null);
      }
      this.clicked_activation = true;
    }

  }

  pleasanceHeatmap() {

    if (this.clicked_pleasance == true) {

      this.markersPleasance = [];
      for (var i = 0; i < this.moodData_ple.length; i++) {
        if (this.moodData_ple[i].locationLat == null) {
          continue;
        }
        var location = [this.moodData_ple[i].locationLat, this.moodData_ple[i].locationLong];

        var latLng = new google.maps.LatLng(location[0], location[1]);

        var marker = new google.maps.Marker({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8.5,
            fillColor: this.moodData_ple[i].fillcolor,
            fillOpacity: 1,
            strokeWeight: 0.4
          },
          map: this.map,
          position: latLng,
          animation: google.maps.Animation.DROP
        });

        this.markersPleasance.push(marker);
      }
      this.clicked_pleasance = false;

    } else if (this.clicked_pleasance == false) {
      for (var i = 0; i < this.markersPleasance.length; i++) {
        this.markersPleasance[i].setMap(null);
      }
      this.clicked_pleasance = true;
    }

  }
}
/*
 if (this.clicked_activation == true) {
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapData_act,
        map: this.map
      });

      var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]

      this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : 10);
      this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.8);
      this.clicked_activation = false;

    } else if (this.clicked_activation == false) {
      this.heatmap.setMap(null);
      this.clicked_activation = true;
    }






pleasance 

  if (this.clicked_pleasance == true) {
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapData_ple,
        map: this.map

      });

      this.heatmap.set('radius', this.heatmap.get('radius') ? null : 10);

      this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.8);
      this.clicked_pleasance = false;

    } else if (this.clicked_pleasance == false) {
      this.heatmap.setMap(null);
      this.clicked_pleasance = true;
    }
  }

*/
