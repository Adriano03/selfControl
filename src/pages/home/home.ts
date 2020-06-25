import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular'
import { GanheiPage } from '../ganhei/ganhei';
import { GasteiPage } from '../gastei/gastei';
import { Http } from '@angular/http';
import { EditarGanheiPage } from '../editar-ganhei/editar-ganhei';
import { EditarGasteiPage } from '../editar-gastei/editar-gastei';
import { CadastroGanheiProvider } from '../../providers/cadastro-ganhei/cadastro-ganhei';
import { CadastroGasteiProvider } from '../../providers/cadastro-gastei/cadastro-gastei';
import { AngularFireDatabase } from '@angular/fire/database';
import { DetalhesPage } from '../detalhes/detalhes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  totalSaldo = 0;
  totalGanhei = 0;
  totalGastei = 0;

  ganheiDb;
  gasteiDb;

  constructor(
    public navCtrl: NavController,
    public alertCrtl: AlertController,
    public toastCtrl: ToastController,
    public http: Http,
    private CadastroGanheiProvider: CadastroGanheiProvider,
    private CadastroGasteiProvider: CadastroGasteiProvider,
    public db: AngularFireDatabase
  ) {
    this.ganheiDb = [];
    this.gasteiDb = [];
  }


  ionViewWillEnter() {

  }

  ngOnInit() {
    this.pegarDadosGanhei();
    this.pegarDadosGastei();

  }

  ionViewDidLoad() {

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

  pegarDadosGastei() {
    this.http.get('https://selfcontrol-1800d.firebaseio.com/gastei.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.exibirDadosGastei(data);
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
    this.saldoTotal();

  }

  exibirDadosGastei(dados) {
    this.gasteiDb = Object.keys(dados).map(i => {
      dados[i]._id = i
      return dados[i];

    });

    this.CadastroGasteiProvider.guardaGastei(this.gasteiDb);

    this.totalGasto();
    this.saldoTotal();

    if (this.totalSaldo < 0) {
      this.alertCrtl
        .create({
          title: "ATENÇÃO",
          subTitle: "Seu saldo está negativo, verifique seus Dados!",

          buttons: [
            {
              text: "OK",
            },
            ]
        })
        .present();
    }

  }

  totalGanho() {

    for (const item of this.ganheiDb) {
      this.totalGanhei += +item.precoG;

    }
    console.log('Total Ganho', this.totalGanhei);
  }


  totalGasto() {
    for (const item of this.gasteiDb) {
      this.totalGastei += +item.precoP;

    }
    console.log('Total Gasto', this.totalGastei);

  }

  saldoTotal() {
    this.totalSaldo = this.totalGanhei - this.totalGastei;
    console.log("Saldo Total", this.totalSaldo);

  }


  editarGanhei(id) {
    console.log('ID de Ganhei: ', id);
    this.navCtrl.push(EditarGanheiPage, { id: id });
  }

  editarGastei(id) {
    console.log('ID de Gastei: ', id);
    this.navCtrl.push(EditarGasteiPage, { id: id });
  }

  confExcluirGastei(_id: string) {
    this.alertCrtl
      .create({
        title: "Excluir",
        subTitle: "Deseja Realmente Excluir",

        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.excluirGastei(_id);
            }
          },
          {
            text: "Não"
          }
        ]

      })
      .present();

  }

  confExcluirGanhei(_id: string) {
    this.alertCrtl
      .create({
        title: "Excluir",
        subTitle: "Deseja Realmente Excluir",

        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.excluirGanhei(_id);
            }
          },
          {
            text: "Não"
          }
        ]

      })
      .present();
  }

  excluirGanhei(_id) {


    this.db.database.ref(`/ganhei/${_id}`)
      .remove()
      .then(() => {

        let toast = this.toastCtrl.create({
          message: "Excluído Com Sucesso!",
          duration: 3000,
          position: "top"
        });
        toast.present();

        this.navCtrl.push(HomePage);
      });

  };

  excluirGastei(_id) {
    this.db.database.ref(`/gastei/${_id}`)
      .remove()
      .then(() => {

        let toast = this.toastCtrl.create({
          message: "Excluído Com Sucesso!",
          duration: 3000,
          position: "top"
        });
        toast.present();

        this.navCtrl.push(HomePage);
      });
  };



  navegarGanhei() {
    this.navCtrl.push(GanheiPage);

  }

  navegarGastei() {
    this.navCtrl.push(GasteiPage);

  }

  navegarDetalhes() {
    this.navCtrl.push(DetalhesPage, {
      total: this.totalSaldo,
      ganhei: this.totalGanhei,
      gastei: this.totalGastei


    });
  }



}
