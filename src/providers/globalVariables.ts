import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var Connection;

@Injectable()
export class GlobalVariables {

  private url: string = "http://91.250.82.104:8080/v1/";
  public token: string;


  pageVisited: any = false;
  onDevice: boolean;

  constructor(public platform: Platform, public http: Http, public storage: Storage) {
    storage.ready().then(() => {
      storage.get('login_token').then((val) => {
        this.token = val;
      });
    });
  }



  public Login(mail: string, password: string) {
    return this.http.post(this.url + 'auth', {
      "mail": mail,
      "password": password
    }).map(res => res.json());
  }

  public logout() {
    this.storage.set('login_token', null);
    this.token = null;
  }

  public postMood(mood) {
    return this.http.post(this.url + 'moods', mood, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getMood() {
    return this.http.get(this.url + 'moods', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getNumberOfTrees() {
    return this.http.get(this.url + 'statistics/trees', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }


  public GetPrediction() {
    return this.http.get(this.url + 'classifier/prediction', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getHeartrate() {
    return this.http.get(this.url + 'statistics/raw_heartrate', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getHappiness7Days() {
    return this.http.get(this.url + 'statistics/happiness/7days', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getActivation7Days() {
    return this.http.get(this.url + 'statistics/activation/7days', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }


  public getFriendsList() {
    return this.http.get(this.url + 'friends', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public deleteFriend(user) {
    return this.http.delete(this.url + 'friends/' + user, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public addFriend(user) {
    return this.http.post(this.url + 'friends/' + user, null, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public searchFriend(user) {
    return this.http.get(this.url + 'friends/search/' + user, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

public postFriend(user) {
    return this.http.post(this.url + 'friends/search/' + user,null, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public shareMood(user) {
    return this.http.put(this.url + 'friends/' + user, {

      "share_mood": user.share_mood == true ? 0 : 1
    }, {
        headers: this.GetHeaders()
      }).map(res => res.json());
  }


  public getFriendRequest() {
    return this.http.get(this.url + 'friends/requests', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

   public getTeams() {
    return this.http.get(this.url + 'teams', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

   public searchTeam(teamName) {
    return this.http.get(this.url + 'teams/' +teamName, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public createTeam(team) {
    return this.http.post(this.url + 'teams', team, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public joinTeam(team_id: number, password: string) {
    return this.http.post(this.url + 'teams/' + team_id, {
      "password": password
    }, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public leaveTeam(team_id: number) {
    return this.http.delete(this.url + 'teams/' + team_id, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public updateTeam(team) {
    return this.http.put(this.url + 'teams/'+team.id, team, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public inviteUserToTeam(user, team) {
    return this.http.post(this.url + 'teams/' + team.id + '/invite/' + user.id, null, {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getTeamPredictions(team, since = null) {
    if (since == null) {
      return this.http.get(this.url + 'teams/' + team.id + '/predictions', {
        headers: this.GetHeaders()
      }).map(res => res.json());
    } else {
      return this.http.get(this.url + 'teams/' + team.id + '/predictions/since/'+since, {
        headers: this.GetHeaders()
      }).map(res => res.json());
    }  
  }

  public getTeamHeartrate(team) {
    return this.http.get(this.url + 'teams/' + team.id + '/heartrate', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }


  public lostPassword(mail: string) {
    return this.http.post(this.url + 'users/lost_password', {
      "mail": mail
    }).map(res => res.json());
  }


  public getMovement24Hours() {
    return this.http.get(this.url + 'statistics/movement/24hours', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getAllMoodPredictions() {
    return this.http.get(this.url + 'moods/predictions', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getMoodDistribution() {
    return this.http.get(this.url + 'statistics/mood_distribution', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  public getPredictedMoodDistribution() {
    return this.http.get(this.url + 'statistics/predicted_mood_distribution', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }


  public deleteAccount() {
    return this.http.delete(this.url + 'me', {
      headers: this.GetHeaders()
    }).map(res => res.json());
  }

  private GetHeaders(): Headers {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    return headers;
  }

}