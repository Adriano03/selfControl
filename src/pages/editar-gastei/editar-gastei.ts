import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { GasteiProxie } from '../../proxie/gastei';
import { CadastroGasteiProvider } from '../../providers/cadastro-gastei/cadastro-gastei';
import { HomePage } from '../home/home';

/**
 * Generated class for the EditarGasteiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-gastei',
  templateUrl: 'editar-gastei.html',
})
export class EditarGasteiPage {


  form: FormGroup;
  descricaoP: AbstractControl;
  precoP: AbstractControl;
  dataP: AbstractControl;
  categoriaP: AbstractControl;
  gasteiProxie: GasteiProxie;

  gasteiFiltrado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    private cadastroGasteiProvider: CadastroGasteiProvider
  ) {
    this.gasteiProxie = new GasteiProxie();
    this.initialize();

    const id = navParams.get('id');
    const gastei = this.cadastroGasteiProvider.pegaGastei();
    this.filtraGastei(id, gastei);

  }

  ionViewDidLoad() {

  }

  filtraGastei(id, gastei) {
    this.gasteiFiltrado = gastei.filter(gastei => gastei._id === id);
  }

  ngOnInit(){
    
    this.form.controls['descricaoP'].setValue(this.gasteiFiltrado[0].descricaoP);
    this.form.controls['precoP'].setValue(this.gasteiFiltrado[0].precoP);
    this.form.controls['dataP'].setValue(this.gasteiFiltrado[0].dataP);
    this.form.controls['categoriaP'].setValue(this.gasteiFiltrado[0].categoriaP);
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

    this.db.database.ref(`/gastei/${this.gasteiFiltrado[0]._id}`)
    .update(this.form.value)
      .then(() => {
        console.log('Editou');
        this.form.reset();

        let toast = this.toastCtrl.create({
          message: "Dados Editados Com Sucesso!",
          duration: 3000,
          position: "top"
        });
        toast.present();

        this.navCtrl.push(HomePage);

      })

  }

  fechar() {
    this.navCtrl.pop();
  }


}
