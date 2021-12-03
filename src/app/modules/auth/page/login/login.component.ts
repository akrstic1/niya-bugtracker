import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this._authService
        .loginWithCredentials({
          username: this.loginForm.get('username')!.value,
          password: this.loginForm.get('password')!.value,
        })
        .subscribe({
          error: (err) => {
            if (err.status == 401) {
              this._snackBar.open(err.error.message, 'Close', {
                duration: 3000,
              });
            }
          },
        });
    }
  }
}
