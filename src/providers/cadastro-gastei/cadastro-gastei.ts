import { Injectable } from '@angular/core';

/*
  Generated class for the CadastroGasteiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastroGasteiProvider {

  private _gastei: any;

  constructor() {
    
  }

  guardaGastei(gastei){
    this._gastei = gastei;
  }

  pegaGastei(){
    return this._gastei;
  }

}
