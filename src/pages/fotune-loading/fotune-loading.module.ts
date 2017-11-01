import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotuneLoadingPage } from './fotune-loading';

@NgModule({
  declarations: [
    FotuneLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(FotuneLoadingPage),
  ],
})
export class FotuneLoadingPageModule {}
