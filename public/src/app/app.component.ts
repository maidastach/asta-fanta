import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { AuthService } from './services/auth/auth.service';

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
  }
)

export class AppComponent implements OnInit
{
  public loading: boolean = true;
  public title = 'Asta Fantacalcio | Salvatore De Rosa';

  constructor(private appService: AppService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void
  {
    this.appService.loading.subscribe(loading => this.loading = loading)
  }

  logout(): void
  {
    this.authService.logout().subscribe(
      () => {
        console.log('executed');
        
        this.router.navigate(['/'])
      }
    )
  }

}
