import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotunesDetail } from '../../providers/class/fotunes-detail';
import { Fotunes } from '../../providers/class/fotunes';

/**
 * Generated class for the FotunesDataDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotunes-data-details',
  templateUrl: 'fotunes-data-details.html',
})
export class FotunesDataDetailsPage {
  resultLines: string[] = [];
  fotunesDetail : FotunesDetail;
  fotune  : Fotunes;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fotunesDetail = new FotunesDetail();
    this.fotune = new Fotunes();
    for(let i = 0;i<6;i++){
      this.resultLines.push("./assets/image/line_bg.png");
    }
    this.loadParams();
  }

  loadParams(){
    if(this.navParams.get("fotune")){
      this.fotune = this.navParams.get("fotune");
    }else{
      return;
    }

    if(this.navParams.get("resultLines")){
      this.resultLines = this.navParams.get("resultLines");
    }else{
      return;
    }


    if(this.navParams.get("fotuneDetail")){
      this.fotunesDetail = this.navParams.get("fotuneDetail");
    }else{
      return;
    }
  }
  closeView(){
    this.navCtrl.pop();
  }
  

}
