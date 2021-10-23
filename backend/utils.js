import Pusher from "pusher";
import config from './config';
import { Teams } from "./models/teamModel";

export const pusher = new Pusher({
  appId: config.PUSHER_ID,
  key: config.PUSHER_KEY,
  secret: config.PUSHER_SECRET,
  cluster: "ap4",
  useTLS: true
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
    IS_IN_ASTA_LOCALSTORAGE: 'is-in-asta',
  };

export const addTeamFromCustomize = async(teamConfig, league, next) =>
{
  let teams = [];
      teamConfig.newTeams.forEach(
          team =>
          {
              teams = [
                  ...teams, 
                  { 
                      owner: { name: team.owner }, 
                      name: team.name, 
                      creditTot: teamConfig.credits, 
                      creditLeft: teamConfig.credits
                  }
              ];
          }
      )
      await Teams.insertMany(
          teams,
          async(err, teamsArray) =>
          {
              if(err)
                  return next();
              teamsArray.forEach(
                  team => league.teams.push(team._id)
              )
              await league.save(err => err && next())
          }
      )
}

export const updateTeamsFromCustomize = async(teamConfig, next) => 
{
  teamConfig.teams.forEach(
    async team => 
    {
        await Teams.findByIdAndUpdate(
            team._id, 
            { 
                name: team.name, 
                "owner.name": team.owner.name, 
                creditTot: teamConfig.credits, 
                creditLeft: teamConfig.credits
            }, 
            err => 
            {
                if(err)
                    return next()
            }
        )
    }
  )
}

  // export const updateTeamsByConfig = async(league, config) => 
  // {
  //   if(league.config.teamsNumber > config.teamsNumber) //removing team
  //   {
  //       const difference = config.teamsNumber - league.config.teamsNumber;
  //       const toDelete = league.teams.slice(difference);        
  //       toDelete.forEach(
  //           async team =>
  //           {
  //               await Teams.findByIdAndDelete(
  //                   team, 
  //                   err => 
  //                   {
  //                       if(!err)
  //                           league.teams.splice(difference)
  //                       else
  //                           return next()
  //                   }
  //               )
  //           }
  //       )
  //   }
  //   else if(league.config.teamsNumber < config.teamsNumber) //adding team
  //   {
  //       let teams = [];
  //       for(let i = league.config.teamsNumber; i < config.teamsNumber; i++)
  //       {
  //           teams = [
  //               ...teams, 
  //               { 
  //                   owner: { name: `Giocatore ${i + 1}` }, 
  //                   name: `Squadra ${i + 1}`, 
  //                   creditTot: req.body.credits, 
  //                   creditLeft: req.body.credits
  //               }
  //           ];
  //       }
  //       await Teams.insertMany(
  //           teams,
  //           (err, teamsArray) =>
  //           {
  //               if(err)
  //                   return next();
  //               teamsArray.forEach(
  //                   team => {
  //                       league.teams.push(team._id)
  //                       console.log(league.teams)
  //                   }
  //               )
  //           }
  //       )
  //   }
  // }

  // export const updateCreditsByConfig = async(league, config) => 
  // {
  //   league.teams.forEach(
  //       async team => 
  //       {
  //           await Teams.findByIdAndUpdate(
  //               team._id, 
  //               { creditTot: config.credits, creditLeft: config.credits }, 
  //               err => 
  //               {
  //                   if(err)
  //                     return next()
  //               }
  //           )
  //       }
  //   )
  // }

  // export const updateConfig = async(league, config) => 
  // {
    
    
  //   league.config = config;

  //   await league.save(
  //       err =>
  //       {
  //           if(err)
  //               return next()
  //       }
  //   )

  // }