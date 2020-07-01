import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroGanheiProvider } from '../../providers/cadastro-ganhei/cadastro-ganhei';
import { Http } from '@angular/http';
import sortBy from 'sort-by';

@IonicPage()
@Component({
  selector: 'page-detalhes-ganhei',
  templateUrl: 'detalhes-ganhei.html',
})
export class DetalhesGanheiPage {

  ganheiDb;
  totalGanhei = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private CadastroGanheiProvider: CadastroGanheiProvider,
    public http: Http
  ) {
    this.ganheiDb = [];
  }

  ngOnInit() {
    this.pegarDadosGanhei();
  }

  pegarDadosGanhei() {
    this.http.get('https://selfcontrol-1800d.firebaseio.com/ganhei.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.exibirDadosGanhei(data);
        }
      })
  }

  exibirDadosGanhei(dados) {
    this.ganheiDb = Object.keys(dados).map(i => {
      dados[i]._id = i;
      return dados[i]
    });

    this.CadastroGanheiProvider.guardaGanhei(this.ganheiDb);
    this.totalGanho();
    this.ordeyByGanhei();
  }

  totalGanho(){
    
    for(const item of this.ganheiDb){
      this.totalGanhei += +item.precoG;
      
    }
  }

  ordeyByGanhei(){
    this.ganheiDb.sort(sortBy("descricaoG"));
  }


  voltar(){
    this.navCtrl.pop()
  }



}


