import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Login} from "../../../interfaces/auth";
import {UsersService} from "../../../services/users.service";
import {CreateUser} from "../../../interfaces/user";
import {Router} from "@angular/router";
import {WarningModalComponent} from "../../general/warning-modal/warning-modal.component";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup

  constructor(private readonly authService: AuthService, private fb: FormBuilder, private router: Router, private readonly modalService: ModalService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }


  register() {
    console.log("AAA")
    if(this.form.valid) {
      if(this.form.get('password')?.value === this.form.get('password_confirmation')?.value){
        const register: CreateUser = {
          name: this.form.get('name')?.value,
          email: this.form.get('email')?.value,
          password: this.form.get('password')?.value,
          password_confirmation: this.form.get('password_confirmation')?.value,

        }

        this.authService.register(register)
      }
      else{
        this.modalService.open(WarningModalComponent, {
            width: '350px',

          },
          {
            title: "Aviso",
            message: "Las contraseñas no coinciden. Réviselo.",
            type: "info"
          }).then(async () => {


        })
          .catch(() => {
            this.modalService.close()
          });
      }
    }
    else{
      this.modalService.open(WarningModalComponent, {
          width: '350px',

        },
        {
          title: "Aviso",
          message: "Hay errores en el formulario. Réviselo.",
          type: "info"
        }).then(async () => {


      })
        .catch(() => {
          this.modalService.close()
        });
    }


  }
}
