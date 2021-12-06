import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/data/model/request/register-user-request.model';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      var registerUserRequest: RegisterUserRequest = new RegisterUserRequest();
      registerUserRequest.fullName = this.registerForm.get('fullName')!.value;
      registerUserRequest.username = this.registerForm.get('username')!.value;
      registerUserRequest.password = this.registerForm.get('password')!.value;
      this._userService.registerUser(registerUserRequest).subscribe({
        next: (res) => {
          this._snackBar.open(
            `Registration Successful. Please login!`,
            'Close',
            {
              duration: 3000,
            }
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status == 400) {
            this._snackBar.open(err.error.message, 'Close', {
              duration: 3000,
            });
          }
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
