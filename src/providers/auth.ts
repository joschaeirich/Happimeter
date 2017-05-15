import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

var url= "https://www.pascalbudner.de:8080/v1";

export class User {
  name: string;
  email: string;

  
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class Auth {

  public token:string;

  currentUser: User;

  constructor(public http: Http)
  {

  }

   public login(credentials) {
    if (credentials.email == null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(url+"/auth", {
        "mail": credentials.email,
        "password": credentials.password, 
      });

    }
  }

  public register(credentials) {
    if (credentials.email == null || credentials.password == null || credentials.name === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return this.http.post(url+"/users", {
        "mail": credentials.email,
        "password": credentials.password,
        "name":credentials.name
      });

    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}

