import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.editUserForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password2: ['', [Validators.required]],
      },
      { validator: passwordMatchValidator }
    );
  }

  /* Shorthands for form controls (used from within template) */
  get password() {
    return this.editUserForm.get('password');
  }
  get password2() {
    return this.editUserForm.get('password2');
  }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.editUserForm.hasError('passwordMismatch'))
      this.password2?.setErrors([{ passwordMismatch: true }]);
    else this.password2?.setErrors(null);
  }

  changePassword() {
    if (this.editUserForm.valid) {
      var newPassword = this.editUserForm.get('password')!.value;
      this._userService
        .changePasswordUser(this._authService.user._id, newPassword)
        .subscribe({
          next: (res) => {
            this._snackBar.open(`Password successfully changed!`, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/index']);
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

const passwordMatchValidator: Validators = (
  formGroup: FormGroup
): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('password2')?.value)
    return null;
  else return { passwordMismatch: true };
};
