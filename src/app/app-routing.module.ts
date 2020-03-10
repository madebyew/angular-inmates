import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { InmateListComponent } from './routes/inmate/list/inmate-list.component';
import { InmateAddEditComponent } from './routes/inmate/add-edit/inmate-add-edit.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
    // redirectTo: 'login',
    // pathMatch: 'full'
  },
  // {
    // path: 'login',
    // canActivate: [
    //   AuthGuard
    // ],
    // canActivateChild: [
    //   AuthGuard
    // ],
    // component: LoginComponent
  // },
  {
    path: 'inmate',
    canActivate: [
      AuthGuard
    ],
    canActivateChild: [
      AuthGuard
    ],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: InmateListComponent
      },
      {
        path: 'add',
        component: InmateAddEditComponent
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id',
            component: InmateAddEditComponent
          },
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
  //   , {
  //   onSameUrlNavigation: 'reload'
  // }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
