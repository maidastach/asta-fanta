import { League } from "../models/leagueModel"
import { User } from "../models/userModel"

export const getOneLeague = async(req, res, next) =>
{
    //for any user, to read just one league
    const user = req.session.user
    !user && next()

    const id = req.params.id
    !id && next()

    const league = await League.findById(id)
        .populate(
            {
                path: 'admins',
                model: 'Users',
            }
        )
        .populate(
            {
                path: 'users',
                model: 'Users',
            }
        )
        .exec(
            (err, league) =>
            {
                if(err | !league)
                    return next()
                else if(league)
                    return res.send({ success: true, response: league })
            }
        )
}

export const getMyLeagues = async(req, res, next) => 
{
    const userId = req.session.user
    if(!userId) 
        return next()

    await User.findById(userId)
        .populate(
            {
                path: 'leagues',
                model: 'Leagues',
            }
        )
        .exec(
            (err, user) =>
            {
                if(err | !user)
                    return next()
                else if(user)
                    return res.send({ success: true, response: user.leagues })
            }
        )
}

// export const getMyTeams = async(req, res, next) => 
// {

// }


// import Config from "../models/configModel";

// export const getLeague = async(req, res) => 
// {
//     const id = req.session.config;
//     if(!id)
//         return res.status(401).send({ success: false, message: 'Unauthorized access' })
//     else
//     {
//         const config = await Config.findById(
//             id,
//             (err, doc) => 
//             {
//             if(err)
//                 return res.status(400).send({ success: false, message: 'DB Connection error', error: err })
//             }
//         )
//         if(config)
//         {
//             if(config.league && config.league.name && config.league.teamsNumber)
//                 return res.send({ success: true, message: 'OK', response: config.league })
//             else
//                 res.send({ success: false, message: 'No League created yet', data: 'No League' })
//         }
//         else
//             return res.status(400).send({ success: false, message: "No config file" })
//     }
    
// }

// export const getAllLeagues = async(req, res) => 
// {
//     const id = req.session.config;
//     if(!id)
//         return res.status(401).send({ success: false, message: 'Unauthorized access' })
//     else
//     {
//         const config = await Config.findById(
//             id,
//             (err, doc) => 
//             {
//             if(err)
//                 return res.status(400).send({ success: false, message: 'DB Connection error', error: err })
//             }
//         )
//         if(config)
//         {
//             const email = config.login.email
//             const matchingConfigs = await Config.find({'login.email': email})

//             if(matchingConfigs.length > 0)
//             {
//                 const leagues = matchingConfigs.map(config => config.league)
//                 return res.send({ success: true, message: 'OK', response: leagues })
//             }
//             else
//                 res.status(400).send({ success: false, message: 'No League created yet', data: 'No League' })
//         }
//         else
//             return res.status(400).send({ success: false, message: "No config file" })
//     }
    
// }

// export const newLeague = async(req, res) => 
// {
//     const league = req.body;
//     const id = req.session.config;

//     let config = await Config.findById(
//         id, 
//         (err, doc) => 
//         {
//             if(err)
//                 return res.status(400).send({ message: 'DB error!' })
//         }
//     )

//     if(!config)
//         return res.status(400).send({ message: 'error saving' }) 
//     else
//     {
//         const { user, email, password } = config.login
//         if(config.league)
//             config = await new Config();
//         if(!config)
//             return res.status(400).send({ success: false, message: 'Errore nel salvataggio, Riprova' })
//         else
//         {
//             config.login = { user, email, password }
//             config.users = [{user, email, password, isAdmin: true}]
//             config.league = league
//             await config.save()
//             req.session.config = await config._id.toString()
//             res.status(200).send({ success: true, message: 'ADMIN Registered & League Created' })
//         }

//     }
// }