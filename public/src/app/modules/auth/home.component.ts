import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ProcessService } from 'src/app/services/processing/process.service';

@Component(
  {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  }
)

export class HomeComponent implements OnInit
{
  constructor(private processService: ProcessService) { }

  ngOnInit(): void
  {
    setTimeout(() => this.processService.setLoading(false), 1)
  }

}
