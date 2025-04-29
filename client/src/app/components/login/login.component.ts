import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formGroup = new FormGroup({
    emailAddress: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.formGroup.controls.emailAddress.value, this.formGroup.controls.password.value);
  }
}
