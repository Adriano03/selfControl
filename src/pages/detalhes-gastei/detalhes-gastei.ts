import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { CadastroGasteiProvider } from '../../providers/cadastro-gastei/cadastro-gastei';
import sortBy from 'sort-by';


@IonicPage()
@Component({
  selector: 'page-detalhes-gastei',
  templateUrl: 'detalhes-gastei.html',
})
export class DetalhesGasteiPage {

  gasteiDb;
  totalGastei = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CadastroGasteiProvider: CadastroGasteiProvider,
    public http: Http
  ) {
    this.gasteiDb = [];
  }

  ngOnInit() {
    this.pegarDadosGastei();
  }

  pegarDadosGastei() {
    this.http.get('https://selfcontrol-1800d.firebaseio.com/gastei.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.exibirDadosGastei(data);
        }
      })
  }

  exibirDadosGastei(dados) {
    this.gasteiDb = Object.keys(dados).map(i => {
      dados[i]._id = i
      return dados[i];

      

    });

    this.CadastroGasteiProvider.guardaGastei(this.gasteiDb);
    this.totalGasto();
    this.ordeyByGastei();
  }

  ordeyByGastei(){
    this.gasteiDb.sort(sortBy("descricaoP"));
  }

  totalGasto() {
    for (const item of this.gasteiDb) {
      this.totalGastei += +item.precoP;

    }
  }

  voltar() {
    this.navCtrl.pop();
  }

}
