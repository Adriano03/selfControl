import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { GanheiProxie } from '../../proxie/ganhei';
import { AngularFireDatabase } from '@angular/fire/database';
import { CadastroGanheiProvider } from '../../providers/cadastro-ganhei/cadastro-ganhei';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-editar-ganhei',
  templateUrl: 'editar-ganhei.html',
})
export class EditarGanheiPage {

  form: FormGroup;
  descricaoG: AbstractControl;
  precoG: AbstractControl;
  dataG: AbstractControl;
  categoriaG: AbstractControl;
  ganheiProxie: GanheiProxie;

  ganheiFiltrado;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public datab: AngularFireDatabase,
    private cadastroGanheiProvider: CadastroGanheiProvider
  ) {
    this.ganheiProxie = new GanheiProxie();
    this.initialize();
    
    const id = navParams.get('id');
    const ganhei = this.cadastroGanheiProvider.pegaGanhei();
    this.filtraGanhei(id, ganhei);
  
  }

  ionViewDidLoad() {
    
  }

 

  filtraGanhei(id, ganhei){
    this.ganheiFiltrado = ganhei.filter(ganhei => ganhei._id === id);
    
    }

  ngOnInit(){
    
    this.form.controls['descricaoG'].setValue(this.ganheiFiltrado[0].descricaoG);
    this.form.controls['precoG'].setValue(this.ganheiFiltrado[0].precoG);
    this.form.controls['dataG'].setValue(this.ganheiFiltrado[0].dataG);
    this.form.controls['categoriaG'].setValue(this.ganheiFiltrado[0].categoriaG);
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
    if (!this.form.valid){

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
    
    this.datab.database.ref(`/ganhei/${this.ganheiFiltrado[0]._id}`)
    .update(this.form.value)
      .then(() => {
        console.log('Editou!');
        this.form.reset();
      
      })

    let toast = this.toastCtrl.create({
      message: "Dados Editados Com Sucesso!",
      duration: 3000,
      position: "top"
    });
    toast.present();

    this.navCtrl.push(HomePage);

  }

  fechar(){
    this.navCtrl.pop();
  }
 
}
