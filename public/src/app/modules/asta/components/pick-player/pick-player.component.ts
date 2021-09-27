import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Players } from 'src/app/Models';
import { AstaService } from 'src/app/services/asta/asta.service';

@Component(
  {
    selector: 'app-pick-player',
    templateUrl: './pick-player.component.html',
    styleUrls: ['./pick-player.component.sass']
  }
)

export class PickPlayerComponent implements OnInit 
{
  @Input() isRandom!: boolean;
  public players!: Players[];
  public pickedPlayer = new FormControl();
  public filteredPlayers!: Observable<Players[]>;
  private filterPlayers(value: string): Players[]
  {
    const filterValue = value.toLowerCase();
    return this.players.filter(
        player => player.name.toLowerCase().includes(filterValue)
    );
  }

  constructor(private astaService: AstaService) { }

  ngOnInit(): void 
  {
    this.astaService.players.subscribe(players => this.players = players)
    this.filteredPlayers = this.pickedPlayer.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPlayers(value))
    );
  }

  setPlayer(event: any)
  {
    const value = event.option.value;
    if(confirm(`Hai scelto ${value}! Confermi?`))
    {
      const [picked] = this.players.filter(player => player.name === value);
      this.pickedPlayer.setValue(value);
      this.astaService.classicCall(picked)
    }
    this.pickedPlayer.setValue('')
  }

  changeRandom(): void
  {
    this.astaService.setLoading(true)
    const actual = this.astaService.configSource.value
    this.astaService.configSource.next({...actual, league: {... actual.league, isRandom: !this.isRandom}})
    this.astaService.randomCall()
    this.astaService.setLoading(false)
  }

}
