import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotunesDataDetailsPage } from './fotunes-data-details';

@NgModule({
  declarations: [
    FotunesDataDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FotunesDataDetailsPage),
  ],
})
export class FotunesDataDetailsPageModule {}
