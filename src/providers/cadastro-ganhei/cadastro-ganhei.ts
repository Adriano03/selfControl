import { Injectable } from '@angular/core';

@Injectable()
export class CadastroGanheiProvider {

  private _ganhei: any;

  constructor() {
   
  }

  guardaGanhei(ganhei){
    this._ganhei = ganhei;
  }

  pegaGanhei(){
    return this._ganhei;
  }

} 
