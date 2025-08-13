import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Login} from "../../../interfaces/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WarningModalComponent} from "../../general/warning-modal/warning-modal.component";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup

  constructor(private readonly authService: AuthService, private fb: FormBuilder, private readonly modalService: ModalService) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  login() {
    try {
      const login: Login = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        device_name: "postman"
      }
      this.authService.login(login)
    }
    catch (e){
      this.modalService.open(WarningModalComponent, {
          width: '350px',

        },
        {
          title: "Aviso",
          message: "Las credenciales no son correctas.",
          type: "info"
        }).then(async () => {


      })
        .catch(() => {
          this.modalService.close()
        });
    }

  }
}
