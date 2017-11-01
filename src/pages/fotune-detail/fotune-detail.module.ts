import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotuneDetailPage } from './fotune-detail';

@NgModule({
  declarations: [
    FotuneDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FotuneDetailPage),
  ],
})
export class FotuneDetailPageModule {}
