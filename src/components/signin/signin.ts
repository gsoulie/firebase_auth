import { Component } from '@angular/core';
import { AuthProvider } from './../../providers/auth/auth';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})

export class SigninPage {

  constructor(private authService: AuthProvider, 
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController){}

  // Signing method
  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({content: 'Connexion…'});

    loading.present();
            
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Connexion échouée',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
      });
  }

  onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({content: 'Création du compte…'});

    loading.present();
            
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Enregistrement échoué',
          message: error.message,
          buttons: ['Ok']
        });

        alert.present();
      });
  }
}