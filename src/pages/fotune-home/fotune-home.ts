import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FotunesModule } from '../../providers/fotunes/fotunes';
import { Fotunes } from '../../providers/class/fotunes';

/**
 * Generated class for the FotuneHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fotune-home',
  templateUrl: 'fotune-home.html',
})
export class FotuneHomePage {
  pathSkeleton: string = "./assets/image/frame/skeleton-play_";
  pathResultStart: string = "./assets/image/frame/eff_result-start_";
  pathResultEnd: string = "./assets/image/frame/eff_result-end_";
  pathBgIdle: string = "./assets/image/frame/eff_bg-idle_";
  pathbtn: string = "./assets/image/frame/eff_btn-idle_";
  pathText: string = "./assets/image/frame/eff_text-idle_";
  coins: string[] = [];
  lineBg: string[] = [];
  lineID: string[] = [];
  resultLines: string[] = [];
  pathCoin1: string;
  pathCoin2: string;
  dem: number = 6;
  idResult: string = "";
  fotune: Fotunes;
  data: any;
  path1: string = "";
  path2: string = "";

  constructor(
    private mAppModule: FotunesModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.getImage();
    this.pathCoin1 = "./assets/image/coin_1.png";
    this.pathCoin2 = "./assets/image/coin_2.png";
    this.path1 = "./assets/fotunes/audio/coin.mp3";
    this.path2 = "./assets/fotunes/audio/sowhexagram.mp3";
    this.coins = [this.pathCoin1, this.pathCoin1, this.pathCoin1];
    for (var i = 0; i < 5; i++) {
      this.lineBg.push("./assets/image/line_bg.png");
    }
    this.lineID = ["line1", "line2", "line3", "line4", "line5", "line6"];
    this.fotune = new Fotunes();
  }

  viewInfo() {
    this.navCtrl.push("FotuneInfoPage");
  }
  ionViewDidEnter() {
    if (!this.data) {
      this.mAppModule.getDataFROMJSON().then(
        data => {
          this.data = data;
        }, error => { }
      )
    }
    
  }
  resetResult(){
    this.dem = 6;
    this.numberQue = 1;
    this.idResult = "";
    this.fotune = new Fotunes();
    this.isShuffer6 = false;
    this.isShowResult = false;
    this.resultLines = [];
    this.resetLineResult();
  }
  resetLineResult() {
    for (let i = 0; i < this.lineID.length; i++) {
      let elems = document.getElementById(this.lineID[i]);
      if (elems && elems.children.length == 5) {
        for (let j = 0; j < elems.children.length; j++) {
          let elem = <HTMLElement>elems.children[j];
          if (j == 0) {
            elem.style.opacity = "1";
          } else {
            elem.style.opacity = "0";
          }
        }
      }
    }
  }
  runFirstView() {
    this.isRunShuffe = true;
    this.setPositionCoinDefault();
    this.openSkeleton();
    setTimeout(() => {
      this.closeSkeleton();
      setTimeout(() => {
        this.isRunFirstView = true;
        this.isRunShuffe = false;
        this.shuffSkeleton();
      }, 800);
    }, 2000);
  }
  setPositionCoinDefault() {
    let coinElements = document.getElementsByClassName("coin");
    if (coinElements) {
      for (var index = 0; index < coinElements.length; index++) {
        var element = <HTMLElement>coinElements[index];
        element.style.transform = "translate(" + (16 + (index * 20)) + "px" + ",32px" + ")";
      }
    }
  }

  showResult(BgNumber: number) {
    if (BgNumber) {
      this.openSkeleton();
      setTimeout(() => {
        let els = document.getElementById(this.lineID[this.dem]);
        if (els) {
          let elem = <HTMLElement>els.children[BgNumber];
          let elembg = <HTMLElement>els.children[0];
          if (elem && elembg) {
            let imageSrc = "./" + elem.getAttribute("src");
            this.resultLines.push(imageSrc);
            elem.style.opacity = '1';
            elembg.style.opacity = '0';
          } else { return; }
        }
      }, 800);
      setTimeout(() => {
        this.closeSkeleton();
         
        if (this.dem == 0) {
          setTimeout(() => {
            this.isShuffer6 = true;
            this.getIDResult();
          }, 800);
        }
      }, 2000);
     
    }
  }

  //
  isShowResult: boolean = false;
  getIDResult() {
    if (this.idResult.length == 6 && this.dem == 0) {
      this.fotune.setID(parseInt(this.idResult));
      let check = this.mAppModule.updateINFO(this.fotune);
      if (check) {
        this.isShowResult = true;
      } else {
        return;
      }
    } else {
      console.log("chua gieo du 6 que");
      return;
    }
  }
  isRunShuffe: boolean = false;
  isShuffer6: boolean = false;
  isRunFirstView: boolean = false;
  numberQue : number = 1;
  shuffSkeleton() {
    if (this.isShowResult) {
      this.navCtrl.push("FotuneDetailPage", {
        fotune: this.fotune,
        resultLines: this.resultLines
      });
      this.resetResult();
      return;
    }
    if (!this.isRunFirstView) {
      this.runFirstView();
      return;
    }
    if(!this.isRunShuffe){
      this.isRunShuffe = true;
      // this.playAudio();
      this.dem--;
      let Bgnumber: number = this.runRandomCoins();
      this.translateCoins();
      setTimeout(() => {
        this.showResult(Bgnumber);
        this.isRunShuffe = false;
        this.numberQue++;
      }, 4000);
    }else{
      console.log("Dang shuffer");
      return;
    }

  }

  playAudio() {
    this.mAppModule.loadAudio(this.path2);
    this.mAppModule.playAudio();
    setTimeout(() => {
      this.mAppModule.loadAudio(this.path1);
      this.mAppModule.playAudio();
      setTimeout(()=>{
        this.mAppModule.stopAudio();
      }, 1000);
    
    }, 3000);
  }
  openSkeleton() {
    let element = document.getElementById("skeletonCover");
    if (element) {
      element.style.transform = "translate(50%,50%)";
    } else {
      return;
    }
  }

  closeSkeleton() {
    let element = document.getElementById("skeletonCover");
    if (element) {
      element.style.transform = "translate(0px,0px)";
    } else {
      return;
    }
  }

  translateCoins() {
    let coinElements = document.getElementsByClassName("coin");
    if (coinElements) {
      let x = [0, 0, 0];
      var xPositon: number = this.runRandomPosition(30);
      x[0] = xPositon;
      x[1] = xPositon + 20;
      x[2] = xPositon + 40;
      for (let i = 0; i < coinElements.length; i++) {
        let element = <HTMLElement>coinElements[i];
        var y = this.runRandomPosition(50);
        element.style.transform = "translate(" + x[i] + "px" + "," + y + "px" + ")";
      }
    } else {
      console.log("element coin k render");
      return;
    }
  }
  runRandomPosition(number: number): number {
    return Math.round(Math.random() * number);
  }
  getlineBg(number1: number, number2: number, number3: number): number {
    let sum = number1 + number2 + number3;
    if (sum <= 1) {
      if (this.dem < 6) { this.idResult += "0"; }
      if (sum == 0) {
        return 1;
      } else if (sum == 1) {
        return 2;
      }
    } else {
      if (this.dem < 6) { this.idResult += "1"; }
      if (sum == 2) {
        return 3;
      } else if (sum == 3) {
        return 4;
      }
    }
    return 0;
  }
  runRandomCoins(): number {
    var number1 = Math.round(Math.random());
    if (number1 == 0) {
      this.coins[0] = this.pathCoin2;
    } else {
      this.coins[0] = this.pathCoin1;
    }
    var number2 = Math.round(Math.random());
    if (number2 == 0) {
      this.coins[1] = this.pathCoin2;
    } else {
      this.coins[1] = this.pathCoin1;
    }
    var number3 = Math.round(Math.random());
    if (number3 == 0) {
      this.coins[2] = this.pathCoin2;
    } else {
      this.coins[2] = this.pathCoin1;
    }
    let bgNumber: number = this.getlineBg(number1, number2, number3);
    return bgNumber;
  }
  skeletonPath: string[] = [];
  resultStartPath: string[] = [];
  resultEndPath: string[] = [];
  effBgIdle: string[] = [];
  effBtn: string[] = [];
  effText: string[] = [];

  getImage() {
    for (var i = 0; i < 5; i++) {
      this.skeletonPath.push(this.pathSkeleton + i + ".png");
    }
    for (var j = 0; j < 15; j++) {
      this.resultStartPath.push(this.pathResultStart + j + ".png");
      if (j < 14) {
        this.effBtn.push(this.pathbtn + j + ".png");
        this.effText.push(this.pathText + j + ".png");
        this.resultEndPath.push(this.pathResultEnd + j + ".png");
      }
    }
    for (var z = 0; z <= 26; z++) {
      this.effBgIdle.push(this.pathBgIdle + z + ".png");
    }
  }




}
