import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FotunesLoadData } from './fotunes-loaddata';
import { Fotunes } from '../class/fotunes';
import { AnalyticsManager } from '../common/analytics-manager';
import { HttpService } from '../http-service';
import { AppConfig } from '../app-config';
import { FotunesDetail } from '../class/fotunes-detail';
import { AdsManager } from '../common/ads-manager';

/*
  Generated class for the FotunesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FotunesModule {
  mFotuneLoadData: FotunesLoadData;
  public mAnalyticsManager: AnalyticsManager;
  public mAdsManager: AdsManager;
  fortunesData = new Array<Fotunes>();
  fotunesDataDetail = new Array<FotunesDetail>();
  isOnMobileDevice: boolean = true;
  private mConfig: AppConfig;
  private mAudio: HTMLAudioElement;
  constructor(
    private mHttpService: HttpService,
    public http: Http) {
    this.mFotuneLoadData = new FotunesLoadData(this.http);
    this.mAnalyticsManager = new AnalyticsManager();
    this.mAdsManager = new AdsManager();
    this.mConfig = new AppConfig();
    this.mAudio = new Audio();
  }
  getAdsManager() {
    return this.mAdsManager;
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

  getDataDetailFROMJSON() {

    return new Promise((resolve, reject) => {
      if (this.fotunesDataDetail.length > 0) {
        resolve(this.fotunesDataDetail);
      }
      else {
        this.mFotuneLoadData.getDataDetailFROMJSON().subscribe((data) => {
          if (data) {
            data.forEach(element => {
              this.fotunesDataDetail.push(new FotunesDetail(element));
            });
            resolve(this.fotunesDataDetail);
          } else {
            resolve(false);
          }
        });
      }
    });
  }

  getDataFROMJSON() {

    return new Promise((resolve, reject) => {
      if (this.fortunesData.length > 0) {
        resolve(this.fortunesData);
      }
      else {
        this.mFotuneLoadData.getDataFROMJSON().subscribe((data) => {
          if (data) {
            data.forEach(element => {
              this.fortunesData.push(new Fotunes(element));
            });
            resolve(this.fortunesData);
          } else {
            resolve(false);
          }
        });
      }
    });
  }

  updateDataDetail(fotuneDetail: FotunesDetail) {

    if (this.fotunesDataDetail.length > 0) {
      for (var index = 0; index < this.fotunesDataDetail.length; index++) {
        var element = this.fotunesDataDetail[index];
        if (fotuneDetail.Id == element.Id) {
          fotuneDetail.updateINFO(element);
          return fotuneDetail;
        }
      }
      return false;
    } else {
      return this.getDataDetailFROMJSON().then((res: any) => {
        if (res) {
          for (var index = 0; index < res.length; index++) {
            var element = res[index];
            if (fotuneDetail.Id == parseInt(element.Id)) {
              fotuneDetail.updateINFO(element);
              return fotuneDetail;
            }
          }
        } else {
          return false;
        }
      }).catch(err => { return err; });
    }

  }

  updateINFO(fotune: Fotunes) {
    if (this.fortunesData.length > 0) {
      for (var index = 0; index < this.fortunesData.length; index++) {
        var element = this.fortunesData[index];
        if (fotune.id == element.id) {
          fotune.copy(element);
          return fotune;
        }
      }
      return false;
    } else {
      return this.getDataFROMJSON().then((res: any) => {
        if (res) {
          for (var index = 0; index < res.length; index++) {
            var element = res[index];
            if (fotune.id == parseInt(element.id)) {
              fotune.parseData(element);
              return fotune;
            }
          }
          return false;
        } else {
          return false;
        }
      }).catch(exception => { return exception });
    }
  }

  loadAudio(src: string) {
    this.mAudio.src = src;
  }
  playAudio() {
    if (this.mAudio.paused) {
      this.mAudio.play();
    }
  }
  stopAudio() {
    if (!this.mAudio.paused) {
      this.mAudio.pause();
    }
    this.mAudio.currentTime = 0;
  }
}
