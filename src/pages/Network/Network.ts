import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { Http, Headers } from '@angular/http';




@Component({
  selector: 'page-Network',
  templateUrl: 'Network.html'
})
export class NetworkPage implements AfterViewInit {

  public title: string = "Network";
  public cy: Cy.Instance;
  public button_text: string = "Hide yourself";
  private contains_user: boolean = true;
  private edges: Array<any> = [];

  public friendsList: any = [];

  errormsg: any;

  @ViewChild('network') network_element: ElementRef;


  constructor(public navCtrl: NavController, public http: Http, public auth: Auth) {

  }

  toggleUser() {
    if (this.contains_user) {
      this.cy.remove("node[id = 'user']");
      this.contains_user = false;
      this.button_text = "Show yourself";
    } else {
      this.cy.remove("edge");
      this.cy.add({
        "group": "nodes",
        "data": {
          "id": "user",
          "label": " You"
        }
      });
      this.cy.add(this.edges);
      this.button_text = "Hide yourself";
      this.contains_user = true;
    }

    var layout = this.cy.layout({
      name: "cose",
      anmiate: true,
      minNodeSpacing: 10
    });
    layout.run();
    this.cy.zoom(1);
    this.cy.center();
  }

  ngAfterViewInit() {

    var url = "https://www.pascalbudner.de:8080/v1";
    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);


    this.cy = cytoscape({ "container": this.network_element.nativeElement, "minZoom": 0.5, "maxZoom": 2 });

    this.cy.add({
      "group": "nodes",
      "data": {
        "id": "user",
        "label": " You"
      }
    });

    this.cy.zoom(1);
    this.cy.center();
    this.cy.style("node { content: data(label); text-margin-y: -5px; color: #ffffff; font-size:7px; background-color: #0D47A1; border-color: #fff; border-width: 1px;} edge {line-color: #ffffff; opacity: 0.5;}");

    this.http.get(url + "/friends", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {

      if (fri.status == 200) {
        this.errormsg = "You have no friends yet. Check out the friends page and send some requests ;) "
        return;
      }



      for (var i = 0; i < fri.friends.length; ++i) {
        var user = fri.friends[i].user;
        var ele = this.cy.add({
          "group": "nodes",
          "data": {
            "id": user.id,
            "label": user.name || user.mail
          }
        });

        var mood_image_id = 0;
        if (user.mood.pleasance == 2 && user.mood.activation == 2) {
          mood_image_id = 1;
        } else if (user.mood.pleasance == 1 && user.mood.activation == 2) {
          mood_image_id = 2;
        } else if (user.mood.pleasance == 0 && user.mood.activation == 2) {
          mood_image_id = 3;
        } else if (user.mood.pleasance == 2 && user.mood.activation == 1) {
          mood_image_id = 4;
        } else if (user.mood.pleasance == 1 && user.mood.activation == 1) {
          mood_image_id = 5;
        } else if (user.mood.pleasance == 0 && user.mood.activation == 1) {
          mood_image_id = 6;
        } else if (user.mood.pleasance == 2 && user.mood.activation == 0) {
          mood_image_id = 7;
        } else if (user.mood.pleasance == 1 && user.mood.activation == 0) {
          mood_image_id = 8;
        } else if (user.mood.pleasance == 0 && user.mood.activation == 0) {
          mood_image_id = 9;
        } else {
          mood_image_id = 0;
        }

        ele.css("background-image", "url('assets/NetworkSmilies_PNG/mood" + mood_image_id + ".png')");
        ele.css("background-fit", "cover");
        this.edges.push({
          "group": "edges",
          "data": {
            "id": user.id + "-user",
            "source": user.id,
            "target": "user"
          }
        });

        for (let common_friend_id of user.shared_friend_ids) {
          this.edges.push({
            "group": "edges",
            "data": {
              "id": user.id + "-" + common_friend_id,
              "source": user.id,
              "target": common_friend_id
            }
          });
        }

        this.cy.add(this.edges);
      }

      var layout = this.cy.layout({
        name: "cose",
        minNodeSpacing: 10
      });
      layout.run();
      this.cy.zoom(1);
      this.cy.center();
    });

  }


}

