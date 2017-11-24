import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fotunes } from '../../providers/class/fotunes';
import { FotunesDetail } from '../../providers/class/fotunes-detail';
import { FotunesModule } from '../../providers/fotunes/fotunes';

@IonicPage()
@Component({
  selector: 'page-fotune-detail',
  templateUrl: 'fotune-detail.html',
})
export class FotuneDetailPage {
  facebookUrl: string = "https://www.facebook.com/boidich";
  resultLines: string[] = [];
  fotune: Fotunes;
  fotuneDataDetail: FotunesDetail;
  isLoading: boolean = false;
  heightLine: string = "7px";
  constructor(
    private mAppModule: FotunesModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.fotune = new Fotunes();
    // this.test();
    this.fotuneDataDetail = new FotunesDetail();
    for (let i = 0; i < 6; i++) {
      this.resultLines.push("./assets/fotunes/image/line_bg.png");
    }
    this.loadParams();
    let screenHeight = screen.height;
    if (screenHeight < 600) {
      this.heightLine = "6px";
    }
    else if (screenHeight > 600 && screenHeight < 700) {
      this.heightLine = "8px";
    }
    else if (screenHeight > 700 && screenHeight < 800) {
      this.heightLine = "9px";
    }
    else if (screenHeight > 1000 && screenHeight < 1100) {
      this.heightLine = "16px";
    }
    else if (screenHeight > 1300) {
      this.heightLine = "20px";
    }
  }
<<<<<<< HEAD
  activeMore(){
=======
  ionViewDidEnter() {
    let config = this.mAppModule.getAppConfig().get("config");
    if (config) {
      if ("facebook_group" in config) {
        this.facebookUrl = config.facebook_group;
      }
    }
  }
  // ionViewDidEnter() {
  //   this.loadParams();
  // }
  activeMore() {
>>>>>>> be490f798dea7842ce62129085f28ff16bc84476
    let elem = document.getElementById("imgMoreActive");
    if (elem) {
      elem.style.display = "block";
      setTimeout(() => {
        elem.style.display = "none";
      }, 300);
    }
  }
  loadParams() {
    if (this.navParams.get("fotune")) {
      this.fotune = this.navParams.get("fotune");
      // console.log(this.fotune);

    } else {
      return;
    }

    if (this.navParams.get("resultLines")) {
      this.resultLines = this.navParams.get("resultLines");
    } else {
      return;
    }

   
    // this.isLoading = false;
  }
  closeView() {
    this.navCtrl.pop();
  }
  viewInfo() {
    this.navCtrl.push("FotuneInfoPage");
  }
  viewDetail() {
    this.fotuneDataDetail.setID(this.fotune.id);
    this.mAppModule.updateDataDetail(this.fotuneDataDetail);
    this.navCtrl.push("FotunesDataDetailsPage", {
      resultLines: this.resultLines,
      fotune: this.fotune,
      fotuneDetail: this.fotuneDataDetail
    });
  }
}
