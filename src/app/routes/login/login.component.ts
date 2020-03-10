import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Error
  public error: string;

  // Form
  public loginFormGroup: FormGroup = new FormGroup({});
  public usernameControl = new FormControl('', [
    Validators.required
  ]);
  public passwordControl = new FormControl('', [
    Validators.required
  ]);
  public loginButtonDisabled = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  public logIn = () => {

    this.error = null;
  
    const username = this.usernameControl.value;
    const password = this.passwordControl.value;

    if (!username || !password) {
      this.error = 'Please enter required fields';
      return;
    }

    this.loginButtonDisabled = true;
    this.loginService.logIn(username, password).subscribe(result => {
      if (result) {
        this.router.navigate(['/inmate/list'], { relativeTo: this.activatedRoute });
      } else {
        this.error = 'Invalid login';
        this.loginButtonDisabled = false;
      }
    });
  }

}
