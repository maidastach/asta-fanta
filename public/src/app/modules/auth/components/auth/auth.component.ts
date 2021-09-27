import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthResponse, Login, Register } from 'src/app/Models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';


@Component(
  {
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
  }

  )
export class AuthComponent implements OnInit
{
  public loading!: boolean;
  public errorMsg!: string;

  public login!: FormGroup;
  public register!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void
  {
    this.login = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(8), Validators.required]]
      }
    )

    this.register = this.fb.group(
      {
        user: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        re_password: ['', [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  swapFormView(event: any): void
  {
    event.target.parentElement.parentElement.parentElement.classList.toggle('s--signup');
  }

  handleLogin(form: Login)
  {
    this.loading = true
    const dialogRef = this.dialog.open(DialogDataComponent, { data: [this.loading, this.errorMsg] });
    this.authService
      .login(form)
        .subscribe(
          (response: AuthResponse) => 
          {
            this.loading = false;
            dialogRef.close()
            this.router.navigate([response.field])
          },
          (error: ErrorEvent) =>
          {
            console.log(error);
            
            dialogRef.close()
            this.loading = false;
            this.errorMsg = error.error.message
            const newDialogRef = this.dialog.open(DialogDataComponent, { data: [this.loading, this.errorMsg] });
            if(!error.error.success && error.error.field)
            {
              this.login.controls[error.error.field].setErrors({ 'incorrect': true })
              this.login.controls[error.error.field].markAsTouched({ onlySelf: true })
            }
          }
        )
  }


  handleRegister(form: Register)
  {
    this.loading = true;
    const dialogRef = this.dialog.open(DialogDataComponent, { data: [this.loading, this.errorMsg] });
    const { re_password: remove, ...admin } = form
    this.authService
      .registerAdmin(admin)
        .subscribe(
          () =>
          {
            this.loading = false;
            dialogRef.close()
            this.router.navigate(['/game'])
          },
          (error: ErrorEvent) => 
          {
            dialogRef.close()
            this.loading = false;
            this.errorMsg = error.error.message
            const newDialogRef = this.dialog.open(DialogDataComponent, { data: [this.loading, this.errorMsg] });
            if(error.error.field)
            {
              this.register.controls[error.error.field].setErrors({ 'incorrect': true })
              this.register.controls[error.error.field].markAsTouched({ onlySelf: true })
            }
          }
        )
  }

}
