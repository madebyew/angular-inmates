import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/routes/login/login.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  public navRoutes = [
    {
      label: 'Browse',
      route: ['inmate', 'list']
    },
    {
      label: 'Add',
      route: ['inmate', 'add']
    },
  ];

  public navActions = [
    {
      label: 'Log out',
      onClick: () => this.logOut()
    }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) { }

  private logOut() {
    this.loginService.logOut().subscribe(result => {
      this.router.navigate(['/'], { relativeTo: this.activatedRoute });
    });
  }

  public handleRoute(route: string[]) {
    if (route.length) {
      this.router.navigate(route, { relativeTo: this.activatedRoute });
    }
  }

  public handleAction(onClick: () => void) {
    if (onClick) {
      onClick();
    }
  }

}
