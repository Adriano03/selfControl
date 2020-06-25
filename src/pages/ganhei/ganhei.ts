import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GanheiProxie } from '../../proxie/ganhei';
import { AngularFireDatabase } from '@angular/fire/database';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-ganhei',
  templateUrl: 'ganhei.html',
})
export class GanheiPage {

  form: FormGroup;
  descricaoG: AbstractControl;
  precoG: AbstractControl;
  dataG: AbstractControl;
  categoriaG: AbstractControl;
  ganheiProxie: GanheiProxie;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public datab: AngularFireDatabase,
  ) {
    this.ganheiProxie = new GanheiProxie();
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GanheiPage');
  }

  initialize() {
    this.form = this.formBuilder.group({
      descricaoG: ["", Validators.compose([Validators.maxLength(20), Validators.required])],
      precoG: ["", Validators.compose([Validators.maxLength(8), Validators.required])],
      dataG: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      categoriaG: ["", Validators.compose([Validators.maxLength(20)])],
    });
    this.descricaoG = this.form.controls["descricaoG"];
    this.precoG = this.form.controls["precoG"];
    this.dataG = this.form.controls["dataG"];
    this.categoriaG = this.form.controls["categoriaG"];
  }

  submitForm() {
    if (!this.form.valid) {

      let toast = this.toastCtrl.create({
        message: "Verifique os Campos!",
        duration: 3000,
        position: "top"
      });
      toast.present();
    } else {
      this.cadastrar();      
    }
  }

  cadastrar() {
    this.datab.database.ref('/ganhei').push(this.form.value)
      .then(() => {
        console.log('salvou');
        this.form.reset();
      });

    let toast = this.toastCtrl.create({
      message: "Dados Salvos Com Sucesso!",
      duration: 3000,
      position: "top"
    });
    toast.present();

    this.navCtrl.push(HomePage);

  }


  fechar() {
    this.navCtrl.pop();
  }

}
