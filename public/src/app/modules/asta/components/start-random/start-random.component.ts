import { Component, Input, OnInit } from '@angular/core';
import { AstaService } from 'src/app/services/asta/asta.service';

@Component({
  selector: 'app-start-random',
  templateUrl: './start-random.component.html',
  styleUrls: ['./start-random.component.sass']
})
export class StartRandomComponent implements OnInit {
  
  @Input() isRandom!: boolean;

  constructor(private astaService: AstaService) { }

  ngOnInit(): void {
  }

  startRandom(): void
  {
      this.astaService.randomCall()
  }

  changeRandom(): void
  {
    this.astaService.setLoading(true)
    const actual = this.astaService.configSource.value
    this.astaService.configSource.next({...actual, league: {... actual.league, isRandom: !this.isRandom}})
    this.astaService
      .resetPlayerForAsta()
        .subscribe(
          data => 
          { 
            this.astaService.setPlayerForAsta('')
            this.astaService.setLoading(false)       
          },
          (error: ErrorEvent) => 
          {
            this.astaService.setErroMsg('Error Setting Players')
            this.astaService.setLoading(false)
            console.log(error, 'in changing mode call show player  component');
            throw new Error(error.message)
          }
        );
  }

}
