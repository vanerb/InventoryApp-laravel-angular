import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsersService} from "../../../services/users.service";
import {UpdateUser, User} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  form: FormGroup
  user!: User

  constructor(private fb: FormBuilder, private readonly usersService: UsersService, private readonly authService: AuthService, private readonly router: Router) {
    this.form = this.fb.group({
      name: ['', []],
      password: ['', []],
      password_confirmation: ['', []],
    });
  }

  ngOnInit() {

    this.authService.getUserByToken().subscribe({
      next: async (user: User) => {

        this.user = user;
        this.form.get('name')?.setValue(user.name)

      },
      error: (err) => {

      }
    });


  }


  updateProfile() {

    let command: UpdateUser = {
      id: this.user?.id.toString(),
      name: this.form.get('name')?.value
    }
    if (this.form.get('password')?.value !== '') {
      if (this.form.get('password_confirmation')?.value === this.form.get('password')?.value) {
        command = {
          id: this.user?.id.toString(),
          name: this.form.get('name')?.value,
          password: this.form.get('password')?.value,
          password_confirmation: this.form.get('password_confirmation')?.value
        }
      }
    }

    this.usersService.update(command).subscribe({
      next: async () => {

        // window.location.reload()

      },
      error: (err) => {

      }
    });

  }

  async logout(){
    this.authService.logout();
    await this.router.navigate(['/login']);
    window.location.reload()
  }
}
