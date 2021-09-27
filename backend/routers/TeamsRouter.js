// import express from "express";
// import Config from "../models/configModel";

// const TeamsRouter = express.Router()

// TeamsRouter.get(
//     '/', 
//     async (req, res) => 
//     {
//         try
//         {
//             const config = await Config.findOne(
//                 {"login.email": 'asd@lol.it'}, 
//                 (err, docs) => (err) && err
//             )
//             res.send(config.teams)
//         }
//         catch(error)
//         {
//             res.send( { message: 'Unable to retrieve teams!', error: error } )
//         }
//     }
// )

// TeamsRouter.put(
//     '/', 
//     async (req, res) => 
//     {
//         const teams = req.body;
//         const id = req.session.config
//         console.log(id);

//         const config = await Config.findByIdAndUpdate(
//             id,
//             { teams: teams }, 
//             (err, doc) =>
//             {
//                 if(err)
//                     return res.status(400).send({ message: 'DB Error!' })
//                 else if(doc !== null)
//                     return res.send({ message: 'Teams Updated' })
//                 else
//                     return res.status(400).send({ message: 'Error Updating' })
//             }
//         )
//     }
// )

// //'614908440bc44b1048317580'

// TeamsRouter.post('/addplayertoteam', async(req, res) => {
//     try
//     {
//         const { name, paid, team, zone, img, Classic, Mantra, naz, piede, fantaTeam } = req.body;
//         if(!name || !paid || !team || !zone || !img || !Classic || !Mantra || !naz || !fantaTeam) 
//             return res.status(400).send({ message: "Player's details missing" })

//         const config = await Config.findOne({ "login.email": 'asd@lol.it' })
//         if(!config)
//             return res.status(400).send({ message: "Error Retrieving Config" })
//         else
//         {
//             const [ ruolo ] = Mantra.toLowerCase().split(';')
//             var teamToUpdate = config.teams.find(team => team.name === fantaTeam)
//             const whereToAdd = teamToUpdate.players[zone][ruolo] ? teamToUpdate.players[zone][ruolo] : teamToUpdate.players[zone];
//             teamToUpdate.players[zone][ruolo] = [...whereToAdd, { name, paid, team, zone, img, Classic, Mantra, naz, piede, fantaTeam }]
//             teamToUpdate.creditLeft = teamToUpdate.creditLeft - paid;
//             config.teams = config.teams.map(
//                 team => 
//                 {
//                     if(team.name === fantaTeam)
//                         team = teamToUpdate
//                     return team
//                 }
//             )
//             await config.save();
//             return res.send( { name, fantaTeam } )
//         }
        

//         // const teams = await Teams.find();

//         // pusher.trigger(
//         //     ACTIONS.SOCKET_NAME,
//         //     ACTIONS.ADD_PLAYER_CHANNEL, 
//         //     {
//         //         teams,
//         //         name,
//         //         team,
//         //         event: 'aggiunto a',
//         //     }
//         // );

//     }
//     catch(error)
//     {
//         res.status(400).send({ message: "Error Adding Player" })
//     }
// })

// TeamsRouter.delete('/:team/:zone/:name', async(req, res) => {
//     try
//     {
//         const { name, zone, team } = req.params;
//         if(!name || !zone) return res.status(400).send({ message: "Player's details missing" })
//         const teamWhereDelete = await Teams.findOne({ name: team })
//         const playertoDelete = teamWhereDelete[zone].find(e => e.name.toString() === name);
//         teamWhereDelete.creditLeft = teamWhereDelete.creditLeft + playertoDelete.paid;
//         teamWhereDelete[zone] = teamWhereDelete[zone].filter(player => player.name.toString() !== name)
//         await teamWhereDelete.save();
        
//         const teams = await Teams.find();

//         pusher.trigger(
//             ACTIONS.SOCKET_NAME, 
//             ACTIONS.ADD_PLAYER_CHANNEL, 
//             {
//                 teams,
//                 name,
//                 team,
//                 event: 'rimosso da',
//             }
//         );
//         res.send( { name, team } )
//     }
//     catch(error)
//     {
//         res.send(error)
//     }
// })

// export default TeamsRouter;