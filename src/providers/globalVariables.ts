import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
 
declare var Connection;

@Injectable()
export class GlobalVariables {
  
  pageVisited: any = false;

  onDevice: boolean;
 
  constructor(public platform: Platform,public http: Http){

  }

}