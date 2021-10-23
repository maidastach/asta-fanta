import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeagueResponse, LeaguesResponse, Team, League, AuthResponse, TeamsResponse } from '../../Models';

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
  
  setLeague(league: League): Observable<LeagueResponse>
  {
    return this.http.post<LeagueResponse>('/api/leagues', league, { withCredentials: true })
  }

  updateLeagueConfig(id: string, config: League['config']): Observable<LeagueResponse>
  {
    return this.http.put<LeagueResponse>(`/api/leagues/${id}`, config, { withCredentials: true })
  }

  getTeamsByLeagueId(id: string): Observable<TeamsResponse>
  {
    return this.http.get<TeamsResponse>(`/api/teams/${id}`)
  }

  updateTeamsOwnership(id: string, teamConfig: { teams: Team[], newTeams: any, credits: number }): Observable<LeagueResponse>
  {
    return this.http.put<LeagueResponse>(`/api/teams/${id}`, teamConfig, { withCredentials: true })
  }

  deleteTeamFromConfig(id: string): Observable<TeamsResponse>
  {
    return this.http.delete<TeamsResponse>(`/api/teams/${id}`, { withCredentials: true })
  }
}
