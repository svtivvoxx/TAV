import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  email: string = "";
  password: string = "";

  constructor(
    private Auth: AngularFireAuth,
    private helper: HelperService,
    private router: Router,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    // Remove the call to cargarRegion() here
  }

  async register() {
    console.log('Registro se ha iniciado con los siguientes datos:');
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);

    var user =
      [
        {
          email: this.email,
          password: this.password
        }
      ]

    try {
      const request = await this.Auth.createUserWithEmailAndPassword(this.email, this.password);
      this.storage.guardarUsuario(user);
      await this.router.navigateByUrl('home');
      await this.helper.showAlert("Registro completado exitosamente!", "informacion");
    } catch (error: any) {
      if (error.code == 'auth/invalid-email') {
        await this.helper.showAlert("El correo no tiene un formato correcto", "error");
      }
      if (error.code == 'auth/weak-password') {
        await this.helper.showAlert("La contraseña debe tener 6 caracteres como mínimo", "error");
      }
      if (error.code == 'auth/email-already-in-use') {
        await this.helper.showAlert("El correo ya existe", "error");
      }
    }
  }
}
