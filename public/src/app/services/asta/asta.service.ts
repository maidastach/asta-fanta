import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { ConfigForm, CurrentBid, Players, PlayerToAdd } from '../../Models';

export const LOCALSTORAGE =
{
  REMAINING: 'Remaining_Players',
  DISCARDED: 'Discarded_Players',
  ASSIGNED: 'Assigned_Players',
  ASTA_STARTED: 'is_Asta_Started'
}

export const CONFIG_PROP =
{
  CONFIG: 'config',
  TEAMS: 'teams',
  LOGIN: 'login',
  LEAGUE: 'league',
}

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AstaService 
{
  private production = document.location.hostname.includes('localhost') ? false : true;
  public apiUrl = this.production ? '' : 'http://localhost:4201';

  public playersSource = new BehaviorSubject<Players[]>([])
  public players = this.playersSource.asObservable();

  public remainingPlayersSource = new BehaviorSubject<Players[]>([])
  public remainingPlayers = this.remainingPlayersSource.asObservable();

  public discardedPlayersSource = new BehaviorSubject<Players[]>([])
  public discardedPlayers = this.discardedPlayersSource.asObservable();

  public assignedPlayersSource = new BehaviorSubject<PlayerToAdd[]>([])
  public assignedPlayers = this.assignedPlayersSource.asObservable();

  public currentPlayerSource = new BehaviorSubject<any>('')
  public currentPlayer = this.currentPlayerSource.asObservable();

  public playerToAddSource = new BehaviorSubject<any>('')
  public playerToAdd = this.playerToAddSource.asObservable();

  public configSource = new BehaviorSubject<any>('')
  public config = this.configSource.asObservable();  

  public isAstaStartedSource = new BehaviorSubject<boolean>(false)
  public isAstaStarted = this.isAstaStartedSource.asObservable();



  public loadingSource = new BehaviorSubject<boolean>(true)
  public loading = this.loadingSource.asObservable();

  public errorMsgSource = new BehaviorSubject<string>('')
  public errorMsg = this.errorMsgSource.asObservable();

  public successMsgSource = new BehaviorSubject<string>('')
  public successMsg = this.successMsgSource.asObservable();




  public currentBidSource = new BehaviorSubject<any>('')
  public currentBid = this.currentBidSource.asObservable();


  constructor(private http: HttpClient, private userService: UserService)
  {
    //GET PLAYERS AND SET THEM IN THE OBSERVABLE AND IN THE REMAINING PLAYERS
    
    
    
    //GET THE ASTA PLAYER FROM THE SERVER
    this.getAstaPlayer()
      .subscribe(
        player => 
        {
          this.setLoading(true)
          if(player) this.setPlayerForAsta(player)
          else this.setIntoLocalStorage(LOCALSTORAGE.ASTA_STARTED, false)
          // this.setLoading(false)

          //GET THE CONFIG FILE
    this.userService
    .getLeague()
      .subscribe(
        config => 
        {
          this.setLoading(true)
          this.configSource.next(config)            
          //this.setLoading(false)

          this.getPlayers()
      .subscribe(
        players => 
        {
          this.playersSource.next(players)
          if(!this.getFromLocalStorage(LOCALSTORAGE.REMAINING))
          {
            this.setIntoLocalStorage(LOCALSTORAGE.REMAINING, players)
            this.remainingPlayersSource.next(players)
          }
          this.setLoading(false)
        },
        (error: ErrorEvent) => 
        {
          this.setLoading(false)
          this.setErroMsg(error.error.message)
        }
      )

        },
        (error: ErrorEvent) => 
        {
          console.log(error);
          
          this.setLoading(false)
          this.setErroMsg(error.error.message)
        }
      )

        },
        (error: ErrorEvent) =>
        {
          this.setLoading(false)
          this.setErroMsg(error.message)
        }
      )
    
    //GET DATA FROM LOCALSTORAGE AND ASSIGN THAT TO OBSERVABLES
    if(this.getFromLocalStorage(LOCALSTORAGE.REMAINING))
    {
      const remainingPlayers = this.getFromLocalStorage(LOCALSTORAGE.REMAINING)
      remainingPlayers && this.remainingPlayersSource.next(JSON.parse(remainingPlayers))
    }

    if(this.getFromLocalStorage(LOCALSTORAGE.DISCARDED))
    {
      const discardedPlayers = this.getFromLocalStorage(LOCALSTORAGE.DISCARDED)
      discardedPlayers && this.discardedPlayersSource.next(JSON.parse(discardedPlayers))
    }

    if(this.getFromLocalStorage(LOCALSTORAGE.ASSIGNED))
    {
      const assignedPlayers = this.getFromLocalStorage(LOCALSTORAGE.ASSIGNED)
      assignedPlayers && this.assignedPlayersSource.next(JSON.parse(assignedPlayers))
    }

    if(this.getFromLocalStorage(LOCALSTORAGE.ASTA_STARTED))
    {
      const isAstaStarted = this.getFromLocalStorage(LOCALSTORAGE.ASTA_STARTED)
      isAstaStarted && this.isAstaStartedSource.next(JSON.parse(isAstaStarted))
    }
  }

  setLoading(value: boolean): void
  {
    this.loadingSource.next(value)
  }

  setErroMsg(value: string): void
  {
    this.errorMsgSource.next(value)
    setTimeout(() => this.errorMsgSource.next(''), 5000)
  }
  
  setSuccessMsg(value: string): void
  {
    this.successMsgSource.next(value)
    setTimeout(() => this.successMsgSource.next(''), 2000)
  }




  
  setCurrentBid(currentBid: CurrentBid): void
  {
    this.currentBidSource.next(currentBid)
  }

  getCurrentBid(): Observable<CurrentBid>
  {
    return this.http.get<CurrentBid>(`${this.apiUrl}/api/asta/bet`)
  }

  setPlayerForAsta(player: string | Players): void
  {
    this.currentPlayerSource.next(player)
  }

  resetPlayerForAsta(): Observable<Players>
  {
    return this.http.delete<Players>(`${this.apiUrl}/api/asta/player`);
  }





  getPlayers(): Observable<Players[]>
  {
    return this.http.get<Players[]>(`${this.apiUrl}/api/players`);
  }

  addPlayerToTeam(player: PlayerToAdd): Observable<PlayerToAdd>
  {
    return this.http.post<PlayerToAdd>(`${this.apiUrl}/api/teams/addplayertoteam`, player);
  }

  getAstaPlayer(): Observable<Players>
  {
    return this.http.get<Players>(`${this.apiUrl}/api/asta/player`);
  }

  addAstaPlayer(player: Players): Observable<Players>
  {
    return this.http.post<Players>(`${this.apiUrl}/api/asta/player`, player);
  }


  getFromLocalStorage(key: string): string | null
  {
    return window.localStorage.getItem(key)
  }

  setIntoLocalStorage(key: string, value: Players[] | boolean): void
  {
    window.localStorage.setItem(key , JSON.stringify(value))
  }


  randomCall(): void
  {
    this.setLoading(true)
    try
    {
      this.isAstaStartedSource.next(true)
      this.setIntoLocalStorage(LOCALSTORAGE.ASTA_STARTED, true)
      const random = Math.floor(Math.random() * this.remainingPlayersSource.value.length);
      const player = this.remainingPlayersSource.value[random]
      this.addAstaPlayer(player)
        .subscribe(
          () => 
          {
            this.setPlayerForAsta(player)
            this.setLoading(false)
          },
          (error: ErrorEvent) => 
          {
            this.setLoading(false)
            this.setErroMsg(error.message)
            throw new Error(error.message)
          }
        )
    }
    catch(error: any)
    {
     console.log(error, 'try catch of randomcall() in astaservice');
     this.setLoading(false)
     this.setErroMsg(error.message)
     throw new Error(error)
    }
    
  }

  classicCall(player: Players): void
  {
    this.addAstaPlayer(player)
      .subscribe(
        () => 
        {
          this.setPlayerForAsta(player)
          this.setLoading(false)
        },
        (error: ErrorEvent) => 
        {
          this.setErroMsg('Error Setting Players')
          this.setLoading(false)
        }
      )
  }


  assignPlayer(): void
  {
    this.setLoading(true)
    try 
    {
      this
      .addPlayerToTeam(/* this.playerToAddSource.value */{...this.currentPlayerSource.value, paid: 100, fantaTeam: 'SSC Miano', 
      zone: this.currentPlayerSource.value.Classic === 'P' ? 'goalkeepers'
      : this.currentPlayerSource.value.Classic === 'D' ? 'defenders'
      : this.currentPlayerSource.value.Classic === 'C' ? 'midfielders'
      : 'strikers'
    })
        .subscribe(
          response => 
          {
            const updateAssigned = [this.playerToAddSource.value, ...this.assignedPlayersSource.value]
            this.assignedPlayersSource.next(updateAssigned)
            this.setIntoLocalStorage(LOCALSTORAGE.ASSIGNED, updateAssigned)
            this.updateRemainingPlayers(this.currentPlayerSource.value)
            this
              .resetPlayerForAsta()
                .subscribe(
                  data => 
                  {
                    this.setPlayerForAsta('')
                    this.setLoading(false)
                    this.configSource.value.league.isRandom && this.randomCall()
                    console.log(data, response);
                    this.setSuccessMsg(`${response.name} Aggiunto a ${response.fantaTeam}`)
                  },
                  (error: ErrorEvent) => 
                  {
                    this.setLoading(false)
                    this.setErroMsg(error.message)
                    console.log(error, 'error in assignPlayer() INNER astaService');
                  }
                );
          },
          (error: ErrorEvent) => 
          {
            this.setLoading(false)
            this.setErroMsg(error.error.message)
            console.log(error, 'error in assignPlayer() OUTER astaService');
          }
        )
    }
    catch(error: any)
    {
      this.setLoading(false)
      this.setErroMsg(error.message)
      console.log(error, 'error in assignPlayer() catch block astaService');
    }    
  }

  discardPlayer(): void
  {
    this.setLoading(true)
    try
    {
      this
        .resetPlayerForAsta()
          .subscribe(
            data => 
            {
              const updateDiscard = [this.currentPlayerSource.value, ...this.discardedPlayersSource.value]
              this.discardedPlayersSource.next(updateDiscard)
              this.setIntoLocalStorage(LOCALSTORAGE.DISCARDED, updateDiscard)
              this.updateRemainingPlayers(this.currentPlayerSource.value)    
              this.setPlayerForAsta('')
              this.setLoading(false)
              this.configSource.value.league.isRandom && this.randomCall()
            },
            (error: ErrorEvent) => 
            {
              this.setErroMsg('Error Setting Players')
              this.setLoading(false)
              console.log(error, 'asdsdfdsdsdddsdfds');
              throw new Error(error.message)
            }
          );
    }
    catch(error: any)
    {
      this.setErroMsg('Error Setting Players')
      this.setLoading(false)
      console.log(error, 'error in discardPlayer() astaService');
    }
  }

  updateRemainingPlayers(player: Players): void
  {
    const updatedArray = this.remainingPlayersSource.value.filter(playerInHere => playerInHere.name !== player.name)
    this.remainingPlayersSource.next(updatedArray)
    this.setIntoLocalStorage(LOCALSTORAGE.REMAINING, updatedArray)
  }


  getRequest(value: string): Observable<ConfigForm | ConfigForm['league'] | ConfigForm['login'] | ConfigForm['teams'] | ErrorEvent>
  {
    return this.http.get<ConfigForm>(`${this.apiUrl}/api/league/${value}`)
  }

}