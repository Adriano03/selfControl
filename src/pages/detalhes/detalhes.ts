import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalhesGanheiPage } from '../detalhes-ganhei/detalhes-ganhei';
import { DetalhesGasteiPage } from '../detalhes-gastei/detalhes-gastei';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  chart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.total = navParams.get('total');
    this.ganho = navParams.get('ganhei');
    this.gasto = navParams.get('gastei');
   }

   total = 0;
   ganho = 0;
   gasto = 0;

  ionViewDidLoad() {
    console.log('total Ganho TESTE', this.total);
  }

  ngOnInit() {
    this.showChart();
  }

  showChart() {
    var ctx = (<any>document.getElementById('chartPie')).getContext('2d');
    this.chart = new Chart(ctx, {
        type: 'pie',
        options: {
           
        },
        data: {
        labels: ["Saldo", "Ganhei", "Gastei"],
        datasets: [{
            
              backgroundColor: [

                '#488aff',
                '#32db64',
                '#f53d3d'
                
              ],
              borderColor: [

                '#0003a0',
                '#18a006',
                '#a00000'
                
              ],
              data: [this.total, this.ganho, this.gasto],
              borderWidth: 2,
              
              
        }]
       }
    });
  }


  navegarGanhei() {
    this.navCtrl.push(DetalhesGanheiPage);
  }

  navegarGastei() {
    this.navCtrl.push(DetalhesGasteiPage);
  }

  voltar() {
    this.navCtrl.pop();
  }

}
