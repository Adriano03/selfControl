import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GanheiPage } from '../pages/ganhei/ganhei';
import { GasteiPage } from '../pages/gastei/gastei';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environment/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { EditarGanheiPage } from '../pages/editar-ganhei/editar-ganhei';
import { EditarGasteiPage } from '../pages/editar-gastei/editar-gastei';
import { CadastroGanheiProvider } from '../providers/cadastro-ganhei/cadastro-ganhei';
import { CadastroGasteiProvider } from '../providers/cadastro-gastei/cadastro-gastei';

import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { DetalhesPage } from '../pages/detalhes/detalhes';
import { DetalhesGanheiPage } from '../pages/detalhes-ganhei/detalhes-ganhei';
import { DetalhesGasteiPage } from '../pages/detalhes-gastei/detalhes-gastei';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GanheiPage,
    GasteiPage,
    EditarGanheiPage,
    EditarGasteiPage,
    DetalhesPage,
    DetalhesGanheiPage,
    DetalhesGasteiPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxMaskIonicModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GanheiPage,
    GasteiPage,
    EditarGanheiPage,
    EditarGasteiPage,
    DetalhesPage,
    DetalhesGanheiPage,
    DetalhesGasteiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CadastroGanheiProvider,
    CadastroGasteiProvider,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
    
  ]
})
export class AppModule {}
