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
  pathSkeleton: string = "./assets/fotunes/image/frame/skeleton-play_";
  pathResultStart: string = "./assets/fotunes/image/frame/eff_result-start_";
  pathResultEnd: string = "./assets/fotunes/image/frame/eff_result-end_";
  // pathBgIdle: string = "./assets/fotunes/image/frame/eff_bg-idle_";
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
  constructor(
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
      this.widthResulteff = "30%";
    } else {
      this.widthResulteff = "40%";
    }
    this.onResize()
  }


  onResize() {
    console.log("Screen width : " + window.innerWidth);
    if (screen.height < 500) {
      this.lineResultHeight = "10px";
    }
    else if (screen.height > 600 && screen.height < 700) {
      this.lineResultHeight = "12px";
    }
    else if (screen.height > 700 && screen.height < 800) {
      this.lineResultHeight = "15px";
    } else if (screen.height > 800) {
      this.lineResultHeight = "20px";
    }
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
<<<<<<< HEAD
    // this.openSkeleton();
=======

>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
    this.resetResult();
    this.resetLineResult();
    // this.testTranslate();
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
<<<<<<< HEAD

  // ======open plate ==========
  rsEffectWhite: boolean = false;
=======
  runFirstView() {
    this.setPositionCoinDefault();
    // this.closeSkeleton();
    setTimeout(() => {
      this.isRunFirstView = true;
      this.shuffSkeleton();
    }, 800);
  }
  setPositionCoinDefault() {
    let coinElements = document.getElementsByClassName("coin");
    let xPosition = [26, 46, 16];
    let yPosition = [13, 23, 43];
    if (coinElements) {
      for (var index = 0; index < coinElements.length; index++) {
        var element = <HTMLElement>coinElements[index];
        element.style.transform = "translate(" + xPosition[index] + "px" + "," + yPosition[index] + "px" + ")";
      }
    }
  }
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
  isTransition: boolean = false;
  showResult(BgNumber: number) {
    this.isTransition = true;
    if (BgNumber) {
      this.openSkeleton();
      setTimeout(() => {
        let els = document.getElementById(this.lineID[this.numberQue - 1]);
        if (els) {
<<<<<<< HEAD
          // let elemWhite = <HTMLElement>els.children[5];
          // elemWhite.style.display = "block";
          // setTimeout(() => {
            // elemWhite.style.display = "none";
            let elem = <HTMLElement>els.children[BgNumber];
            let elembg = <HTMLElement>els.children[0];
            if (elem && elembg) {
              let imageSrc = "./" + elem.getAttribute("src");
              this.resultLines.push(imageSrc);
              elem.style.opacity = '1';
              elembg.style.opacity = '0';
              // console.log("show image done");
            } else {
              return;
            }
          // }, 1000);

=======
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
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
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
<<<<<<< HEAD
=======

>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
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
    // giải đoán
    if (this.isShowResult) {
      this.navCtrl.push("FotuneDetailPage", {
        fotune: this.fotune,
        resultLines: this.resultLines.reverse()
      });
      // this.mAppModule.mAdsManager.showInterstital(true);
      // this.resetResult();
      return;
    }
    if (!this.isRunShuffe && !this.isTransition) {
      this.isRunShuffe = true;

      this.playAudio();
      let Bgnumber: number = this.runRandomCoins();
      this.translateCoins();
      setTimeout(() => {

        this.showResult(Bgnumber);
        this.isRunShuffe = false;

<<<<<<< HEAD
      }, 3200);
=======
      }, 4000);
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
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
  showMore(){

  }
  goToFaceBook(){
    
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
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  } 

<<<<<<< HEAD
  getBorderPosition(x : number, y: number): number{
    if(x<40 && y < 40){
      return 1;
    }else if(x>40 && y < 40){
      return 2;
    }else if(x<40 && y > 40){
      return 3;
    }else if(x> 40 && y> 40){
      return 4;
    }else{
      return 0;
=======
  getPosition(data: number[]): number[] {
    let array: number[] = [];
    for (var i = 0; i < data.length; i++) {
      array.push(data[i] + this.runRandomPosition(15));
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
    }
  }

  

  translateCoins() {
    let coinElements = document.getElementsByClassName("coin");
    
    if (coinElements) {
      let xPosition = [0, 0, 0];
      let yPosition = [0, 0, 0];
<<<<<<< HEAD

      for (let i = 0; i < 3; i++) {
        xPosition[i] = this.runRandomPosition(1,50);
        yPosition[i] = this.runRandomPosition(1,50);
        if (i > 0) {
          let check : boolean = false;
          while (!check) {
            var dem = 0;
            for (let j = 0; j < i; j++) {
              if (Math.abs(xPosition[i] - xPosition[j]) < 20 && Math.abs(yPosition[i] - yPosition[j]) < 20) {
                  xPosition[i] = this.runRandomPosition(1,50);
                  yPosition[i] = this.runRandomPosition(1,50);
                  check = false;
                  dem++;
              }
            }
            if(dem==0){
              check = true;
            }
          }
         
          
        }
      }
      
      for (let z = 0; z < coinElements.length; z++) {
        var element = <HTMLElement>coinElements[z];
        if(element){
          element.style.transform = "translate(" + xPosition[z] + "px" + "," + yPosition[z] + "px" + ")";
        }
=======
      xPosition = this.getPosition([20, 40, 0]);
      yPosition = this.getPosition([0, 20, 40]);
      for (let i = 0; i < coinElements.length; i++) {
        let element = <HTMLElement>coinElements[i];
        element.style.transform = "translate(" + xPosition[i] + "px" + "," + yPosition[i] + "px" + ")";
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
      }
    } else {

      return;
    }
  }

<<<<<<< HEAD


  
=======


  runRandomPosition(number: number): number {
    return Math.round(Math.random() * number);
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
>>>>>>> 970666d7d50374d005fe5c9de1bfceaeab182bc1
  skeletonPath: string[] = [];
  resultStartPath: string[] = [];
  resultEndPath: string[] = [];
  // effBgIdle: string[] = [];
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
    // for (var z = 0; z <= 26; z++) {
    //   this.effBgIdle.push(this.pathBgIdle + z + ".png");
    // }
  }




}
