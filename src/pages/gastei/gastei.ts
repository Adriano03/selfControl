import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GasteiProxie } from '../../proxie/gastei';
import { AngularFireDatabase } from '@angular/fire/database';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-gastei',
  templateUrl: 'gastei.html',
})
export class GasteiPage {


  form: FormGroup;
  descricaoP: AbstractControl;
  precoP: AbstractControl;
  dataP: AbstractControl;
  categoriaP: AbstractControl;
  gasteiProxie: GasteiProxie;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public db: AngularFireDatabase
  ) {
    this.gasteiProxie = new GasteiProxie();
    this.initialize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GasteiPage');
  }

  initialize() {
    this.form = this.formBuilder.group({
      descricaoP: ["", Validators.compose([Validators.maxLength(20), Validators.required])],
      precoP: ["", Validators.compose([Validators.maxLength(8), Validators.required])],
      dataP: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      categoriaP: ["", Validators.compose([Validators.maxLength(20)])],
    });
    this.descricaoP = this.form.controls["descricaoP"];
    this.precoP = this.form.controls["precoP"];
    this.dataP = this.form.controls["dataP"];
    this.categoriaP = this.form.controls["categoriaP"];
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

    this.db.database.ref('/gastei').push(this.form.value)
      .then(() => {
        console.log('salvou');
        this.form.reset();
      })
      
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
