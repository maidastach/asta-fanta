import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueResponse, LeaguesResponse, Team, League } from '../../Models';

@Injectable({ providedIn: 'root' })

export class UserService {

  constructor(private http: HttpClient) { }

  getLeague(): Observable<LeagueResponse>
  {
    return this.http.get<LeagueResponse>('/api/users/league', { withCredentials: true })
  }

  getMyLeagues(): Observable<LeaguesResponse>
  {
    return this.http.get<LeaguesResponse>('/api/users/leaguesa', { withCredentials: true })
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
