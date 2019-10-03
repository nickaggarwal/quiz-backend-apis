import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator, matchingPasswords } from 'src/app/shared/utils/app-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, emailValidator])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      confirmPassword: ['', Validators.required]
    },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );
  }

  onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      this.authService.register(values["email"], values["password"]);
    }
  }
}
