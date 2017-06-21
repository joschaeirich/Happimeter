import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MoodPage } from '../pages/Mood/Mood';
import { MoodmapPage } from '../pages/Moodmap/Moodmap';
import { StatisticsPage } from '../pages/Statistics/Statistics';
import { NetworkPage } from '../pages/Network/Network';
import { SettingsPage } from '../pages/Settings/Settings';
import { MoodInputPage } from '../pages/MoodInput/MoodInput';
import { Tree1Page } from '../pages/Tree1/Tree1';
import { Tree2Page } from '../pages/Tree2/Tree2';
import { Tree3Page } from '../pages/Tree3/Tree3';
import { Tree4Page } from '../pages/Tree4/Tree4';
import { MainPage } from '../pages/Main/Main';
import { AchievementPage } from '../pages/Achievement/Achievement';
import { MoodTablePage } from '../pages/MoodTable/MoodTable';
import { MoodDiagramsPage } from '../pages/MoodDiagrams/MoodDiagrams';
import { FriendsPage } from '../pages/Friends/Friends';
import { SearchFriendsPage } from '../pages/SearchFriends/SearchFriends';
import { FriendRequestPage } from '../pages/FriendRequest/FriendRequest';
import { LoginPage } from '../pages/Login/Login';
import { RegisterPage } from '../pages/Register/Register';
import { ShareMoodPage } from '../pages/ShareMood/ShareMood';
import { DeleteFriendPage } from '../pages/DeleteFriend/DeleteFriend';
import { TeamViewPage } from '../pages/TeamView/TeamView';
import { TeamView_CreateTeamPage } from '../pages/TeamView_CreateTeam/TeamView_CreateTeam';
import { TeamView_SearchPage } from '../pages/TeamView_Search/TeamView_Search';
import { TeamView_AddTeamMemberPage } from '../pages/TeamView_AddTeamMember/TeamView_AddTeamMember';
import { TeamView_TeamChartPage } from '../pages/TeamView_TeamChart/TeamView_TeamChart';
import { TeamView_TeamMemberPage } from '../pages/TeamView_TeamMember/TeamView_TeamMember';
    


import { LegalPage } from '../pages/Legal/Legal';


import { Auth } from '../providers/auth';
import { GlobalVariables } from '../providers/globalVariables';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';





@NgModule({
  declarations: [
    MyApp,
    MoodPage,
    MoodmapPage,
    StatisticsPage,
    NetworkPage,
    SettingsPage,
    MoodInputPage,
    Tree1Page,
    Tree2Page,
    Tree3Page,
    Tree4Page,
    MainPage,
    AchievementPage,
    MoodTablePage,
    MoodDiagramsPage,
    FriendsPage,
    SearchFriendsPage,
    FriendRequestPage,
    LoginPage,
    RegisterPage,
    ShareMoodPage,
    DeleteFriendPage,
    TeamViewPage,
    LegalPage,
    TeamView_CreateTeamPage,
    TeamView_SearchPage,
    TeamView_AddTeamMemberPage,
    TeamView_TeamChartPage,
    TeamView_TeamMemberPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement: 'bottom'
    }), ChartModule.forRoot(highcharts),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoodPage,
    MoodmapPage,
    StatisticsPage,
    NetworkPage,
    SettingsPage,
    MoodInputPage,
    Tree1Page,
    Tree2Page,
    Tree3Page,
    Tree4Page,
    MainPage,
    AchievementPage,
    MoodTablePage,
    MoodDiagramsPage,
    FriendsPage,
    SearchFriendsPage,
    FriendRequestPage,
    LoginPage,
    RegisterPage,
    ShareMoodPage,
    DeleteFriendPage,
    TeamViewPage,
    LegalPage,
    TeamView_CreateTeamPage,
    TeamView_SearchPage,
    TeamView_AddTeamMemberPage,
    TeamView_TeamChartPage,
    TeamView_TeamMemberPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Auth,
    GlobalVariables,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
