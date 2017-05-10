import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

import { Haversine } from 'haversine-position';
//import * as MarkerClusterer from 'node-js-marker-clusterer';

declare var google;






@Component({
  selector: 'page-Moodmap',
  templateUrl: 'Moodmap.html'
})



export class MoodmapPage {

  url = "https://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();

  location: any = [];

  markersActivity: any = [];
  markersPleasance: any = [];
  markersMood: any = [];

  heatmapData_act: any = [];
  heatmapData_ple: any = [];

  heatmap: any

  clicked_activation = true;
  clicked_pleasance = true;
  clicked_mood = true;

  Allclusters: any = [];

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);

  }


  ionViewDidLoad() {

    this.http.get(this.url + "/moods", { "headers": this.headers }).map(res => res.json()).subscribe(res => {


      for (var i = 0; i < res.moods.length; ++i) {
        if (res.moods[i].position.latitude == null) {
          continue;
        }

        var found = false;
        var mood = res.moods[i];
        for (var j = 0; j < this.Allclusters.length; ++j) {
          var cluster = this.Allclusters[j];
          var moodPos = {
            lat: mood.position.latitude,
            lng: mood.position.longitude
          };
          var clusterPos = {
            lat: cluster.latitude,
            lng: cluster.longitude
          };

          if (Haversine.getDistance(clusterPos, moodPos) <= 200) {

            this.Allclusters[j].sumAct += mood.activation;
            this.Allclusters[j].sumPls += mood.pleasance;
            this.Allclusters[j].count++;
            found = true;
          }
        }
        if (found == false) {
          this.Allclusters.push({
            latitude: mood.position.latitude,
            longitude: mood.position.longitude,
            sumAct: mood.activation,
            sumPls: mood.pleasance,
            count: 1
          });
        }
      }

      for (var i = 0; i < this.Allclusters.length; ++i) {
        this.Allclusters[i].avgAct = this.Allclusters[i].sumAct / this.Allclusters[i].count;
        this.Allclusters[i].avgPls = this.Allclusters[i].sumPls / this.Allclusters[i].count;
        var avgAct = this.Allclusters[i].avgAct;
        var avgPls = this.Allclusters[i].avgPls;

        if (avgAct <= 2 && avgAct > 1.3) {
          this.Allclusters[i].fillcolorAct = "green"
          this.Allclusters[i].activation = 2;
        } else if (avgAct <= 1.3 && avgAct > 0.7) {
          this.Allclusters[i].fillcolorAct = "orange"
          this.Allclusters[i].activation = 1;
        } else if (avgAct <= 0.7) {
          this.Allclusters[i].fillcolorAct = "red"
          this.Allclusters[i].activation = 0;
        }

        if (avgPls <= 2 && avgPls > 1.3) {
          this.Allclusters[i].fillcolorPls = "green"
          this.Allclusters[i].pleasance = 2;
        } else if (avgPls <= 1.3 && avgPls > 0.7) {
          this.Allclusters[i].fillcolorPls = "orange"
          this.Allclusters[i].pleasance = 1;
        } else if (avgPls <= 0.7) {
          this.Allclusters[i].fillcolorPls = "red"
          this.Allclusters[i].pleasance = 0;
        }

        var activation = this.Allclusters[i].activation;
        var pleasance = this.Allclusters[i].pleasance;

        if (activation == 2 && pleasance == 2) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood1.png'
        } else if (pleasance == 1 && activation == 2) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood2.png'
        } else if (pleasance == 0 && activation == 2) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood3.png'
        } else if (pleasance == 2 && activation == 1) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood4.png'
        } else if (pleasance == 1 && activation == 1) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood5.png'
        } else if (pleasance == 0 && activation == 1) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood6.png'
        } else if (pleasance == 2 && activation == 0) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood7.png'
        } else if (pleasance == 1 && activation == 0) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood8.png'
        } else if (pleasance == 0 && activation == 0) {
          this.Allclusters[i].image = 'assets/Markers/marker_mood9.png'
        }
        
      }
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
      /*
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
      */
    });

  }


  activationMarkers() {

    if (this.clicked_activation == true) {

      this.markersActivity = [];
      for (var i = 0; i < this.Allclusters.length; i++) {

        var location = [this.Allclusters[i].latitude, this.Allclusters[i].longitude];

        var latLng = new google.maps.LatLng(location[0], location[1]);

        var marker = new google.maps.Marker({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: this.Allclusters[i].fillcolorAct,
            fillOpacity: 0.5,
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

  pleasanceMarkers() {

    if (this.clicked_pleasance == true) {

      this.markersPleasance = [];
      for (var i = 0; i < this.Allclusters.length; i++) {

        var location = [this.Allclusters[i].latitude, this.Allclusters[i].longitude];

        var latLng = new google.maps.LatLng(location[0], location[1]);

        var marker = new google.maps.Marker({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: this.Allclusters[i].fillcolorPls,
            fillOpacity: 0.5,
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

  moodMarkers() {

    if (this.clicked_mood == true) {

      this.markersMood = [];
      for (var i = 0; i < this.Allclusters.length; i++) {

        var location = [this.Allclusters[i].latitude, this.Allclusters[i].longitude];
        var latLng = new google.maps.LatLng(location[0], location[1]);

        var icon = {
          url: this.Allclusters[i].image,
          scaledSize: new google.maps.Size(40, 40), // scaled size    
        };

        var marker = new google.maps.Marker({
          map: this.map,
          position: latLng,
          animation: google.maps.Animation.DROP,
          icon: icon
        });

        this.markersMood.push(marker);
      }
      this.clicked_mood = false;

    } else if (this.clicked_mood == false) {
      for (var i = 0; i < this.markersMood.length; i++) {
        this.markersMood[i].setMap(null);
      }
      this.clicked_mood = true;
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
