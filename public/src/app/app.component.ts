import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ProcessService } from './services/processing/process.service';

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
  public errorMsg!: string;
  public successMsg!: string;
  public title = 'Asta Fantacalcio | Salvatore De Rosa';

  constructor(private router: Router, private authService: AuthService, private processService: ProcessService) {}

  ngOnInit(): void
  {
    this.processService.loading.subscribe(loading => this.loading = loading)
    this.processService.errorMsg.subscribe(errorMsg => this.errorMsg = errorMsg)
    this.processService.successMsg.subscribe(successMsg => this.successMsg = successMsg)
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
