import Pusher from "pusher-js";
import { Team } from "./Models";

export const pusher = new Pusher('7a8e6cf5b8698223b0dd', {
  cluster: 'ap4',
});

export const ACTIONS = 
{
    SOCKET_NAME: "fantacalcio",
    ADD_PLAYER_CHANNEL: 'add-player',
    ASTA_PLAYER_CHANNEL: "asta-player",
    ASTA_BET_CHANNEL: "asta-bet",
    ASTA_COUNTDOWN_CHANNEL: "asta-countdown",
    ASTA_IS_IN_ASTA_CHANNEL: 'asta-is-in-asta',
    TEAM_LOCALSTORAGE: 'team',
    PLAYER_LOCALSTORAGE: 'player',
    CURRENTBID_LOCALSTORAGE: 'current-bid',
    IS_IN_ASTA_LOCALSTORAGE: 'is-in-asta'
};

// export const mapTeams = (teams: Team[]) => {
//     return teams.map(
//         (team: Team) => {
//             const dc = team.defenders.filter(def => def.positions && def.positions[0] === 'DC')
//             const ds = team.defenders.filter(def => def.positions && def.positions[0] === 'DS')
//             const dd = team.defenders.filter(def => def.positions && def.positions[0] === 'DD')
//             const e = team.midfielders.filter(def => def.positions && def.positions[0] === 'E')
//             const m = team.midfielders.filter(def => def.positions && def.positions[0] === 'M')
//             const c = team.midfielders.filter(def => def.positions && def.positions[0] === 'C')
//             const w = team.offensives.filter(def => def.positions && def.positions[0] === 'W')
//             const t = team.offensives.filter(def => def.positions && def.positions[0] === 'T')
//             const a = team.strikers.filter(def => def.positions && def.positions[0] === 'A')
//             const pc = team.strikers.filter(def => def.positions && def.positions[0] === 'PC')

//             return {
//             ...team, 
//             defenders: { dc: dc.length, dd: dd.length, ds: ds.length }, 
//             midfielders: { e: e.length, m: m.length, c: c.length }, 
//             offensives: { w: w.length, t: t.length },
//             strikers: { a: a.length, pc: pc.length }
//             }
//         }
//     )
// }
