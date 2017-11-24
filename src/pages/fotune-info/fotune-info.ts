import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotunesModule } from '../../providers/fotunes/fotunes';

/**
 * Generated class for the FotuneInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotune-info',
  templateUrl: 'fotune-info.html',
})
export class FotuneInfoPage {
  facebookUrl: string = "https://www.facebook.com/boidich";
  constructor(
    private mAppModule: FotunesModule,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidEnter() {
    let config = this.mAppModule.getAppConfig().get("config");
    if (config) {
      if ("facebook_group" in config) {
        this.facebookUrl = config.facebook_group;
      }
    }
  }
  closeView() {
    this.navCtrl.pop();
  }


}
