import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeagueResponse, LeaguesResponse, Team, League, AuthResponse } from '../../Models';

@Injectable({ providedIn: 'root' })

export class UserService {

  public leaguesSource = new BehaviorSubject<League[]>([])
  public leagues = this.leaguesSource.asObservable();

  constructor(private http: HttpClient) { }

  setLocalLeagues(leagues: League[]): void
  {
    this.leaguesSource.next(leagues)
  }

  getLeague(id: string): Observable<LeagueResponse>
  {
    return this.http.get<LeagueResponse>(`/api/users/leagues/${id}`, { withCredentials: true })
  }

  getAdminLeagues(): Observable<LeaguesResponse>
  {
    return this.http.get<LeaguesResponse>('/api/users/leagues', { withCredentials: true })
  }
  
  setLeague(league: League): Observable<League>
  {
    return this.http.post<League>('/api/users/league', league, { withCredentials: true })
  }

  getTeams(): Observable<Team[]>
  {
    return this.http.get<Team[]>('/api/teams')
  }

  updateTeams(teams: Team[]): Observable<Team[]>
  {
    return this.http.put<Team[]>('/api/teams', teams, { withCredentials: true })
  }


}
