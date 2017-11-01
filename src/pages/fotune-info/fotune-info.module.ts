import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotuneInfoPage } from './fotune-info';

@NgModule({
  declarations: [
    FotuneInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FotuneInfoPage),
  ],
})
export class FotuneInfoPageModule {}
