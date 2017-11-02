import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Fotunes } from '../../providers/class/fotunes';

/**
 * Generated class for the FotuneDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotune-detail',
  templateUrl: 'fotune-detail.html',
})
export class FotuneDetailPage {
  resultLines: string[] = [];
  fotune  : Fotunes;
  isLoading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fotune = new Fotunes();
    for(let i = 0;i<6;i++){
      this.resultLines.push("./assets/image/line_bg.png");
    }
    this.loadParams();
  }

  // ionViewDidEnter() {
  //   this.loadParams();
  // }
  loadParams(){
    if(this.navParams.get("fotune")){
      this.fotune = this.navParams.get("fotune");
      console.log(this.fotune);
      
    }else{
      return;
    }

    if(this.navParams.get("resultLines")){
      this.resultLines = this.navParams.get("resultLines");
    }else{
      return;
    }
    // this.isLoading = false;
  }
  closeView(){
    this.navCtrl.pop();
  }
}
