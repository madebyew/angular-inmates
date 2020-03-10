import { Component, OnInit } from '@angular/core';
import { LoginService } from './routes/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public title = 'Inmates';

  public userIsLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.loginService.userLoginStatus.subscribe(status => {
      this.userIsLoggedIn = status;
    });

  }

  public logOut = () => {
    this.loginService.logOut();
    // this.userIsLoggedIn = this.loginService.userIsLoggedIn;
    this.router.navigate(['/'], { relativeTo: this.activatedRoute});
  }

  public goToList() {
    this.router.navigate(['/inmate/list'], { relativeTo: this.activatedRoute});
  }

}
