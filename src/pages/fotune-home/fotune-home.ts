import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FotunesModule } from '../../providers/fotunes/fotunes';
import { Fotunes } from '../../providers/class/fotunes';
import { SplashScreen } from '@ionic-native/splash-screen';
import { log } from 'util';

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

  facebookUrl: string = "https://www.facebook.com/boidich";
  storeUrl: string = "https://play.google.com/store/apps/dev?id=8988959007894361415&hl=vi";

  pathSkeleton: string = "./assets/fotunes/image/frame/skeleton-play_";
  pathResultStart: string = "./assets/fotunes/image/frame/eff_result-start_";
  pathResultEnd: string = "./assets/fotunes/image/frame/eff_result-end_";
  pathbtn: string = "./assets/fotunes/image/frame/eff_btn-idle_";
  pathText: string = "./assets/fotunes/image/frame/eff_text-idle_";
  coins: string[] = [];
  lineBg: string[] = [];
  lineID: string[] = [];
  resultLines: string[] = [];
  pathCoin1: string;
  pathCoin2: string;
  idResult: string = "";
  fotune: Fotunes;
  data: any;
  path1: string = "";
  path2: string = "";
  widthResulteff: string = "40%";
  lineResultHeight: string = "10px";
  containerCoinHeight: string = "80px";
  constructor(
    private mPlatform: Platform,
    private mAppModule: FotunesModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.getImage();
    this.pathCoin1 = "./assets/fotunes/image/coin_1.png";
    this.pathCoin2 = "./assets/fotunes/image/coin_2.png";
    this.path1 = "./assets/fotunes/audio/coin.mp3";
    this.path2 = "./assets/fotunes/audio/sowhexagram.mp3";
    this.coins = [this.pathCoin1, this.pathCoin1, this.pathCoin1];
    for (var i = 0; i < 5; i++) {
      this.lineBg.push("./assets/fotunes/image/line_bg.png");
    }
    this.lineID = ["line1", "line2", "line3", "line4", "line5", "line6"];
    this.fotune = new Fotunes();
    if (screen.width > 700) {
      this.widthResulteff = Math.round(screen.width * 0.3) + "px";
    } else {
      this.widthResulteff = Math.round(screen.width * 0.4) + "px";
    }
    this.onResize()
  }


  onResize() {
    if (screen.height < 500) {
      this.lineResultHeight = "10px";
      this.containerCoinHeight = "80px";
    }
    else if (screen.height > 600 && screen.height < 700) {
      this.lineResultHeight = "12px";
      this.containerCoinHeight = "100px";
    }
    else if (screen.height > 700 && screen.height < 800) {
      this.lineResultHeight = "15px";
      this.containerCoinHeight = "120px";
    } else if (screen.height > 800) {
      this.lineResultHeight = "20px";
      this.containerCoinHeight = "180px";
    }
  }

  viewInfo() {
    this.navCtrl.push("FotuneInfoPage");
  }
  ionViewDidEnter() {
    let config = this.mAppModule.getAppConfig().get("config");
    if (config) {
      if ("facebook_group" in config) {
        this.facebookUrl = config.facebook_group;
      }

      if (this.mPlatform.is("android")) {
        if ("android_store_url" in config) {
          this.storeUrl = config.android_store_url;
          console.log("Platform android");
        }
      } else if (this.mPlatform.is("ios")) {
        if ("ios_store_url" in config) {
          this.storeUrl = config.ios_store_url;
          console.log("Platform ios");
        }
      }

    }
    if (!this.data) {
      this.mAppModule.getDataFROMJSON().then(
        data => {
          this.data = data;
        }, error => { }
      )
    }

    this.resetResult();
    this.resetLineResult();
  }
  resetResult() {
    this.fotune.setDefault();
    this.numberQue = 1;
    this.idResult = "";
    this.isTransition = false;
    this.isRunShuffe = false;
    this.isShuffer6 = false;
    this.isShowResult = false;
    this.resultLines = [];
    this.resetLineResult();
  }

  // ===========hide line result eff==============
  resetLineResult() {
    let imgElem = document.getElementById("imgresulteff");
    if (imgElem) { imgElem.style.display = "none"; }

    let btnElems = document.getElementById("btnShufferEffect");
    if (btnElems) { btnElems.style.display = "none"; }

    for (let i = 0; i < this.lineID.length; i++) {
      let elems = document.getElementById(this.lineID[i]);
      if (elems) {
        for (let j = 0; j < elems.children.length; j++) {
          let elem = <HTMLElement>elems.children[j];
          if (j == 0) {
            elem.style.opacity = "1";
          } else if (j > 0 && j < 5) {
            elem.style.opacity = "0";
          } else {
            elem.style.display = "none";
          }
        }
      }
    }
  }

  // ======open plate ==========
  rsEffectWhite: boolean = false;
  isTransition: boolean = false;
  showResult(BgNumber: number) {
    this.isTransition = true;
    if (BgNumber) {
      this.openSkeleton();
      setTimeout(() => {
        let els = document.getElementById(this.lineID[this.numberQue - 1]);
        if (els) {
          let elem = <HTMLElement>els.children[BgNumber];
          let elembg = <HTMLElement>els.children[0];
          if (elem && elembg) {
            let imageSrc = "./" + elem.getAttribute("src");
            this.resultLines.push(imageSrc);
            elem.style.opacity = '1';
            elembg.style.opacity = '0';
          } else {
            return;
          }

        }
      }, 800);
      setTimeout(() => {
        this.closeSkeleton();
        setTimeout(() => {
          this.isTransition = false;
          if (this.numberQue < 6) {
            this.numberQue++;
          } else {
            this.getIDResult();
          }
        }, 800);
      }, 1600);
    } else {
    }
  }
  isShowResult: boolean = false;
  getIDResult() {
    this.isShuffer6 = true;
    if (this.idResult.length == 6 && this.numberQue == 6) {
      let imgElem = document.getElementById("imgresulteff");
      if (imgElem) { imgElem.style.display = "block"; }
      let btnElems = document.getElementById("btnShufferEffect");
      if (btnElems) { btnElems.style.display = "block"; }

      this.mAppModule.getAdsManager().showInterstital(true);

      this.fotune.setID(parseInt(this.idResult));
      let check = this.mAppModule.updateINFO(this.fotune);

      if (check) {
        this.isShowResult = true;
      } else {
        return;
      }
    } else {
      return;
    }
  }
  isRunShuffe: boolean = false;
  isShuffer6: boolean = false;
  isRunFirstView: boolean = false;
  numberQue: number = 1;
  shuffSkeleton() {
    if (this.isShowResult) {
      this.navCtrl.push("FotuneDetailPage", {
        fotune: this.fotune,
        resultLines: this.resultLines.reverse()
      });
      return;
    }
    if (!this.isRunShuffe && !this.isTransition) {
      this.isRunShuffe = true;
      // let elm = document.getElementById("btnDone");
      // if(elm){
      //   elem.style.transform = "scale(1.2)";
      //   setTimeout(() => {
      //     elem.style.transform = "scale(1.0)";
      //   }, 400);
      // }
      this.playAudio();
      let Bgnumber: number = this.runRandomCoins();
      this.translateCoins();
      setTimeout(() => {
        this.showResult(Bgnumber);
        this.isRunShuffe = false;

      }, 3200);
    } else {
      return;
    }

  }
  runRandomCoins(): number {
    var sum: number = 0;
    for (let i = 0; i < 3; i++) {
      var number = Math.round(Math.random());
      sum += number;
      if (number == 0) {
        this.coins[i] = this.pathCoin2;
      } else {
        this.coins[i] = this.pathCoin1;
      }
    }
    if (sum <= 1) {
      this.idResult += "0";
    } else {
      this.idResult += "1";
    }
    return sum + 1;
  }
  playAudio() {
    this.mAppModule.loadAudio(this.path2);
    this.mAppModule.playAudio();
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
  runRandomPosition(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  translateCoins() {
    let coinElements = document.getElementsByClassName("coin");

    if (coinElements) {
      let xPosition = [0, 0, 0];
      let yPosition = [0, 0, 0];
      var maxRand: number = parseInt(this.containerCoinHeight);
      maxRand = maxRand - (maxRand * 0.3);
      for (let i = 0; i < 3; i++) {
        xPosition[i] = this.runRandomPosition(1, maxRand);
        yPosition[i] = this.runRandomPosition(1, maxRand);
        if (i > 0) {
          let check: boolean = false;
          while (!check) {
            var dem = 0;
            for (let j = 0; j < i; j++) {
              if (Math.abs(xPosition[i] - xPosition[j]) < 20 && Math.abs(yPosition[i] - yPosition[j]) < 20) {
                xPosition[i] = this.runRandomPosition(1, maxRand);
                yPosition[i] = this.runRandomPosition(1, maxRand);
                check = false;
                dem++;
              }
            }
            if (dem == 0) {
              check = true;
            }
          }


        }
      }

      for (let z = 0; z < coinElements.length; z++) {
        var element = <HTMLElement>coinElements[z];
        if (element) {
          element.style.transform = "translate(" + xPosition[z] + "px" + "," + yPosition[z] + "px" + ")";
        }
      }
    } else {
      return;
    }
  }


  activeMore() {
    let elem = document.getElementById("imgMoreActive");
    if (elem) {
      elem.style.display = "block";
      setTimeout(() => {
        elem.style.display = "none";
      }, 300);
    }
  }


  skeletonPath: string[] = [];
  resultStartPath: string[] = [];
  resultEndPath: string[] = [];
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

  }




}
