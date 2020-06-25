import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesGasteiPage } from './detalhes-gastei';

@NgModule({
  declarations: [
    DetalhesGasteiPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesGasteiPage),
  ],
})
export class DetalhesGasteiPageModule {}
