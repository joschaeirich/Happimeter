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

  moodData: any = [];
  location: any = [];

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
        var data: any = {};

        if (res.moods[i].pleasance == 1 && res.moods[i].activation == 1) {
          data.mood = 0
          data.fillcolor = "red"
          data.opacitiy = 1.0
          data.locationLat = res.moods[i].position.latitude
          data.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].pleasance == 1 && res.moods[i].activation == 0) {
          data.mood = 1
          data.fillcolor = "red"
          data.opacitiy = 0.75
          data.locationLat = res.moods[i].position.latitude
          data.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 1) {
          data.mood = 2
          data.fillcolor = "red"
          data.opacitiy = 0.5
          data.locationLat = res.moods[i].position.latitude
          data.locationLong = res.moods[i].position.longitude
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 0) {
          data.mood = 3
          data.fillcolor = "red"
          data.opacitiy = 0.25
          data.locationLat = res.moods[i].position.latitude
          data.locationLong = res.moods[i].position.longitude
        }


        data.timestamp = res.moods[i].timestamp;
        this.moodData.push(data);

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

      for (var i = 0; i < this.moodData.length; i++) {
        if (this.moodData[i].locationLat == null) {
          continue;
        }

        this.location = [this.moodData[i].locationLat, this.moodData[i].locationLong];


        var heatmap_act_obj: any = {}
        heatmap_act_obj.location = new google.maps.LatLng(this.location[0], this.location[1]);
        heatmap_act_obj.weight = res.moods[i].activation;

        this.heatmapData_act.push(heatmap_act_obj);

        var heatmap_ple_obj: any = {}
        heatmap_ple_obj.location = new google.maps.LatLng(this.location[0], this.location[1]);
        heatmap_ple_obj.weight = res.moods[i].pleasance;

        this.heatmapData_ple.push(heatmap_ple_obj);

      }




      /*   
       var markersAllMoods = [];
              var latLng = new google.maps.LatLng(location[0],
                location[1]);           
              var marker = new google.maps.Marker({
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8.5,
                  fillColor: this.moodData[i].fillcolor,
                  fillOpacity: this.moodData[i].opacitiy,
                  strokeWeight: 0.4
                },
                map: this.map,
                position: latLng,
                animation: google.maps.Animation.DROP
              });
              marker.setOpacity(0.5);
              markersAllMoods.push(marker);
      */
    });

  }

  activationHeatmap() {

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
      this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
      this.clicked_activation = false;
    } else if (this.clicked_activation == false) {
      this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
      this.clicked_activation = true;
    }
  }

  pleasanceHeatmap() {
    if (this.clicked_pleasance == true) {
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapData_ple,
        map: this.map
      });

      heatmap.set('radius', heatmap.get('radius') ? null : 10);

      heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      this.clicked_activation = false;
    }
  }

}


