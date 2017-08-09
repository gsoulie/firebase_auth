import { SigninPage } from './../components/signin/signin';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;
  signinPage = SigninPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              private menuCtrl: MenuController,
              private authService: AuthProvider,
              statusBar: StatusBar, splashScreen: SplashScreen) {

    /**
     * INITIALISATION FIREBASE
     */
    firebase.initializeApp({
      apiKey: "AIzaSyAhI4b0Q3yRWqTsGXHDV8zLzn6sWRok5t0",
      authDomain: "geca-46351.firebaseapp.com"
    });

    /**
     * Contrôler le token d'authentification en cas de changement
     * ouvrir la page correspondante selon le cas
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = HomePage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Ouvrir la page adéquate 
   */
  onLoad(page: any = 'signin') {
    if(page == 'root'){
      this.nav.setRoot(this.rootPage);    
    } else {
      this.nav.setRoot(this.signinPage, {mode: page});
    }    
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

