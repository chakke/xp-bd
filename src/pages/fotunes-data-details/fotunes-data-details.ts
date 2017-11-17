import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotunesDetail } from '../../providers/class/fotunes-detail';
import { Fotunes } from '../../providers/class/fotunes';

@IonicPage()
@Component({
  selector: 'page-fotunes-data-details',
  templateUrl: 'fotunes-data-details.html',
})
export class FotunesDataDetailsPage {
  resultLines: string[] = [];
  fotunesDetail : FotunesDetail;
  fotune  : Fotunes;
  heightLine : string = "5px";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fotunesDetail = new FotunesDetail();
    this.fotune = new Fotunes();
    for(let i = 0;i<6;i++){
      this.resultLines.push("./assets/fotunes/image/line_bg.png");
    }
    this.loadParams();
    let screenHeight = screen.height;
    if(screenHeight < 600){
      this.heightLine = "6px";
    }
    else if(screenHeight > 600 && screenHeight < 700){
      this.heightLine = "8px";
    }
    else if(screenHeight > 700 && screenHeight < 800){
      this.heightLine = "9px";
    }
    else if(screenHeight > 1000 && screenHeight < 1100){
      this.heightLine = "16px";
    }
    else if(screenHeight > 1300){
      this.heightLine = "20px";
    }
  }
  activeMore(){
    let elem = document.getElementById("imgMoreActive");
    if(elem){
      elem.style.display = "block";
      setTimeout(() => {
        elem.style.display = "none";
      }, 300);
    }
  }
  viewInfo() {
    this.navCtrl.push("FotuneInfoPage");
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
