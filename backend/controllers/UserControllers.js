import { League } from "../models/leagueModel"
import { Teams } from "../models/teamModel"
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

export const getOneTeam = async(req, res, next) =>
{
    //for any user, to read just one league
    const user = req.session.user
    !user && next()

    const id = req.params.id
    !id && next()

    const team = await Teams.findById(
        id,
        err => err && next()
    )
    if(!team)
        return next()
    else if(team)
        return res.send({ success: true, response: team })
}

export const getMyTeams = async(req, res, next) => 
{
    const userId = req.session.user
    if(!userId) 
        return next()

    await User.findById(userId)
        .populate(
            {
                path: 'teams',
                model: 'Teams',
            }
        )
        .exec(
            (err, user) =>
            {
                if(err | !user)
                    return next()
                else if(user)
                    return res.send({ success: true, response: user.teams })
            }
        )
}