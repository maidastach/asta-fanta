export interface ConfigForm
{
    league: League
    login: Register
    users: User[];
    teams: Team[];
}

export interface User
{
    user: string;
    email: string;
    password: string;
    isAdmin: boolean;
    teams: Team[];
    leagues: League[];
    isAdminHere: League[];
};

export interface Login
{
    email: string;
    password: string;
};

export interface Register
{
    user: string;
    email: string;
    password: string;
    re_password?: string;
};

export interface League
{
    _id: string;
    admins: User[];
    users: User[];
    teams: Team[];
    config: 
        {
            name: string;
            playersMin: number;
            playersMax: number;
            teamsNumber: number;
            isMantra: boolean;
            isRandom: boolean;
            credits: number; 
        }
}

export interface Team 
{
    _id: string;
    owner: { name: string; _id: string; };
    name: string;
    players: 
        {
            goalkeepers: PlayerToAdd[];
            defenders:
                ({ dc: PlayerToAdd[]; dd: PlayerToAdd[]; ds: PlayerToAdd[]; e: PlayerToAdd[]; })
                | PlayerToAdd[];
            midfielders:
                ({ m: PlayerToAdd[]; c: PlayerToAdd[]; tc: PlayerToAdd[]; })
                | PlayerToAdd[];
            strikers:
                ({ w: PlayerToAdd[]; a: PlayerToAdd[]; pc: PlayerToAdd[]; }) 
                | PlayerToAdd[];
        };
    creditTot: number;
    creditLeft: number;
    isAdmin?: boolean;
}


export interface TeamForm 
{
    names: string[],
    owners: string[]
}

export interface CurrentBid 
{
    value: number;
    team: string;
}

export interface Players 
{
    name: string;
    team: string;
    zone?: string;
    img: string;
    Classic: string;
    Mantra: string;
    naz: string;
    piede?: string;
}

export interface PlayersFiltered 
{
    goalkeepers: Players[];
    defenders: Players[];
    midfielders: Players[];
    strikers: Players[];
}

export interface PlayerToAdd 
{
    name: string;
    team: string;
    zone: string;
    img: string;
    Classic: string;
    Mantra: string;
    naz: string;
    piede?: string;
    paid: number;
    fantaTeam: string;
}

export interface PlayerToDelete 
{
    fantaTeam: string;
    zone: string;
    name: string;
}



export interface LeagueResponse
{
    success: boolean;
    message: string;
    response: League;
}

export interface LeaguesResponse
{
    success: boolean;
    message: string;
    response: League[];
}

export interface TeamResponse
{
    success: boolean;
    message: string;
    response: Team;
}

export interface TeamsResponse
{
    success: boolean;
    message: string;
    response: Team[];
}

export interface ErrorResponse
{
    success: boolean;
    message: string;
    error: ErrorEvent;
}

export interface AuthResponse
{
    success: boolean;
    message: string;
    response: any;
    flag: string;
}

