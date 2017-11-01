import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FotunesLoadData } from './fotunes-loaddata';
import { Fotunes } from '../class/fotunes';
import { AnalyticsManager } from '../common/analytics-manager';
import { HttpService } from '../http-service';
import { AppConfig } from '../app-config';

/*
  Generated class for the FotunesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FotunesModule{
  mFotuneLoadData: FotunesLoadData;
  public mAnalyticsManager: AnalyticsManager;
  fortunesData = new Array<Fotunes>();
  isOnMobileDevice : boolean = true;
  private mConfig: AppConfig;
  private mAudio: HTMLAudioElement; 
  constructor(
    private mHttpService: HttpService,
    public http: Http) {
    
    this.mFotuneLoadData = new FotunesLoadData(this.http);
    this.mAnalyticsManager = new AnalyticsManager();
    this.mConfig = new AppConfig();
    this.mAudio = new Audio();
  }

  getAppConfig() {
    return this.mConfig;
  }
  loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.mConfig.hasData()) {
        resolve();
      } else {
        this.mHttpService.getHttp().request("assets/config/fotunes.json").subscribe(
          data => {
            this.mConfig.onResponseConfig(data.json());
            resolve();
          }
        );
      }
    });

  }

  getDataFROMJSON(){
    console.log("get data from json");
    
    return new Promise((resolve, reject) => {
      if (this.fortunesData.length>0){
        resolve(this.fortunesData);
      } 
      else {
        this.mFotuneLoadData.getDataFROMJSON().subscribe((data) => {
          if(data){
            data.forEach(element => {
              this.fortunesData.push(new Fotunes(element));
            });
            resolve(this.fortunesData);
          }else{
            resolve(false);
          }
        });
      }
    });
  }

  updateINFO(fotune : Fotunes){
    if(this.fortunesData.length>0){
      for (var index = 0; index < this.fortunesData.length; index++) {
        var element = this.fortunesData[index];
        if(fotune.id == element.id){
          fotune.copy(element);
          return fotune;
        }
      }
      return false;
    }else{
      return this.getDataFROMJSON().then((res: any)=>{
        if(res){
          for (var index = 0; index < res.length; index++) {
            var element = res[index];
            if(fotune.id == parseInt(element.id)){
              fotune.parseData(element);
              return fotune;
            }
          }
          return false;
        }else{
          return false;
        }
      }).catch(exception=>{return exception});
    }
  }

  loadAudio(src : string){
    this.mAudio.src = src;
  }
  playAudio(){
    if(this.mAudio.paused){
      this.mAudio.play();
    }
  }
  stopAudio(){
    if(!this.mAudio.paused){
      this.mAudio.pause();
    }
    this.mAudio.currentTime = 0;
  }
}
