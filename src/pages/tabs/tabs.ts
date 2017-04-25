import { Component } from '@angular/core';

import { MoodPage } from '../Mood/Mood';
import { MoodmapPage } from '../Moodmap/Moodmap';
import { StatisticsPage } from '../Statistics/Statistics';
import { NetworkPage } from '../Network/Network';
import { SettingsPage } from '../Settings/Settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MoodPage;
  tab2Root: any = MoodmapPage;
  tab3Root: any = StatisticsPage;
  tab4Root: any = NetworkPage;
  tab5Root: any = SettingsPage;

  constructor() {

  }
}
