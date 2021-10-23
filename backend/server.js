import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import path from "path";
import config from './config';
// import AstaRouter from "./routers/AstaRouter";
import AuthRouter from "./routers/AuthRouter";
import LeagueRouter from "./routers/LeagueRouter";
import UserRouter from "./routers/UserRouter";
import TeamsRouter from "./routers/TeamsRouter";

const app = express();



app.use(cors({origin: ['http://127.0.0.1:4200'], credentials: true}));
app.use(json());
app.use(session(config.SESSION_OPTIONS))

mongoose.connect(
    config.MONGODB_URL,
    config.MONGODB_CONFIG
)
.then(() => console.log('MongoDB Connected'))
.catch(error => console.log(error.reason));

//app.use('', RedirectRouter)
app.use('/api/leagues', LeagueRouter);
// app.use('/api/asta', AstaRouter);
app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/teams', TeamsRouter);
// app.use('/api/players', PlayersRouter);


app.use(
    (err, req, res, next) =>
    {
        // if(res.headersSent)
        //     return next(err)
        console.log('next method');
        return res.status(500).send(err.message)
    }
);

// app.post('/teams', async(req, res) => {
//     const team = req.body
//     console.log(team)

//     const Team = new Teams(team)

//     await Team.save()

//     console.log(Team);
//     res.send(Team)

// })

// app.post('/player', async(req, res) => {
//     const player = req.body
//     console.log(player)

//     const Team = await Teams.findOne({'name': 'Carlo'})

//     Team.players.defenders.dd.push({...player, fantaTeam: Team._id})

//     await Team.save()

//     console.log(Team);
//     res.send(Team)

// })

// const redirect = async(req, res, next) => 
// {
//     if(!req.session.config)
//         res.redirect('/')
//     else
//     {
//         const id = req.session.config
//         const config = await Config.findById(
//             id, 
//             (err, doc) => 
//             {
//                 if(err || (doc === null)) 
//                     res.redirect('/')
//             }
//         )
//         const league = (config.league.name) && (config.league.game) && (config.league.credits) && true
//         const teams = (config.teams.length > 2) && (!config.teams.every(team => team.name.includes('Squadra')))
//         if(req.url === '/new-game')
//         {
//             if(!league)
//                 next()
//             else if(league && !teams)
//                 res.redirect('/customize')
//             else if(league && teams)
//                 res.redirect('/asta')
//         }
//         else if(req.url === '/customize')
//         {
//             if(league && !teams)
//                 next()
//             else if(!league)
//                 res.redirect('/new-game')
//             else if(league && teams)
//                 res.redirect('/asta')
//         }
//         else if(req.url === '/asta')
//         {
//             if(league && !teams)
//                 res.redirect('/customize')
//             else if(!league)
//                 res.redirect('/new-game')
//             else if(league && teams)
//                 next()
//         }
//     }
// }

// app.get(
//     '/',
//     (req, res) => (req.session.config)
//         ? res.redirect('/asta')
//         : res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'asta-fanta', 'index.html'))
// )

app.use(express.static(path.join(__dirname, '..', 'public', 'dist', 'asta-fanta')));
app.get(
    '*', 
    (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'asta-fanta', 'index.html'))
);

app.listen(
    config.PORT, 
    () => console.log(`Server running on port ${config.PORT}`)
); 



// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));;
// });