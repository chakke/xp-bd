import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppModule } from "../../providers/app-module";
import { AppController } from "../../providers/app-controller";
import { FotunesModule } from '../../providers/fotunes/fotunes';
import { FotuneHomePage } from '../fotune-home/fotune-home';
import { AdMobFree } from "@ionic-native/admob-free";


@IonicPage()
@Component({
  selector: 'page-fotune-loading',
  templateUrl: 'fotune-loading.html',
})
export class FotuneLoadingPage {

  constructor(
    public mAdmobfree: AdMobFree,
    private mAppModule: FotunesModule,
    public mGoogleAnalytics: GoogleAnalytics,
    private mPlatform: Platform,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    AppController.getInstance().setPlatform(this.mPlatform);
    this.mAppModule.isOnMobileDevice = AppController.getInstance().isOnMobileDevice();
    this.mAppModule.mAdsManager.setAdmobFree(this.mAdmobfree);
    this.mAppModule.mAnalyticsManager.setGoogleAnalytics(this.mGoogleAnalytics);
    this.mAppModule.loadConfig().then(
      () => {
        this.onLoadedConfig();
      }
    );
  }

  onLoadedConfig() {

    let assets = this.mAppModule.getAppConfig().get("resources");
    AppModule.getInstance().getResourceLoader().load(assets).then(
      () => {
        this.onLoaded();
      }
    );
  }

  onLoaded() {
    this.navCtrl.setRoot(FotuneHomePage, {}, {
      animate: false,
      direction: "forward",
      duration: 400
    });
  }

}
