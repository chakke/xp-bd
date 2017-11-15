import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FotunesModule } from '../providers/fotunes/fotunes';
import { HttpService } from '../providers/http-service';
import { DeviceInfoProvider } from '../providers/device-info/device-info';
import { HttpModule } from '@angular/http';
import { FotuneHomePage } from '../pages/fotune-home/fotune-home';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree } from '@ionic-native/admob-free';
@NgModule({
  declarations: [
    MyApp,
    FotuneHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      pageTransition: 'ios-transition'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FotuneHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FotunesModule,
    HttpService,
    DeviceInfoProvider,
    GoogleAnalytics,
    AdMobFree
  ]
})
export class AppModule {}
