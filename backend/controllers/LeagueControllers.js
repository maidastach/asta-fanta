import { League } from "../models/leagueModel"
import { Teams } from "../models/teamModel"
import { User } from "../models/userModel"

export const getEveryleague = async(req, res, next) =>
{
    //for admin of the whole app to manage the leagues
    const leagues = await League.find(
        {},
        err => err && next()
    )

    if(!leagues)
        return res.send({ success: true, message: 'No leagues' })
    
    return res.send({ success: true, response: leagues })
}

export const updateLeagueConfig = async(req, res, next) =>
{
    const userId = req.session.user
    !userId && next()

    const leagueId = (req.params.id)
    !leagueId && next()

    const config = req.body;
    !config && next()

    const league = await League.findByIdAndUpdate(
        leagueId,
        {
            "config.name": config.name,
            "config.playersMin": config.playersMin,
            "config.playersMax": config.playersMax,
            "config.isMantra": config.isMantra,
            "config.isRandom": config.isRandom,
        },
        err => 
        {
            if(err)
                return next()
        }
    );
    
    return res.send({ success: true, message: 'League Updated', response: league })
}

export const deleteLeague = async(req, res, next) =>
{
    //for admin only, to delete just on league
    const userId = req.session.user
    !userId && next()

    const leagueId = (req.params.id).toString()
    !leagueId && next()

    const user = await User.findById(
        userId,
        err => err && next()
    )
    !user && next()

    user.leagues = user.leagues.filter(league => league.toString() !== leagueId)
    user.isAdminHere = user.isAdminHere.filter(league => league.toString() !== leagueId)

    //to delete all the teams in the league

    const league = await League.findByIdAndDelete(
        leagueId,
        async(err) => err && next()
    )
    if(league){
        await user.save()
        return res.send({ success: true, message: 'League Deleted' })
    }
        
    return res.status(400).send({ success: false, message: 'Unable to Delete' })
}

export const createLeague = async(req, res, next) =>
{
    const userId = req.session.user
    if(!userId)
        return next()

    const user = await User.findById(
        userId,
        err => err && next()
    )
    if(!user)
        return next()

    const createTeams = async() =>
    {
        let teams = [];
        for(let i = 0; i < req.body.teamsNumber; i++)
        {
            teams = [
                ...teams,
                { 
                    owner: { name: `Giocatore ${i + 1}` }, 
                    name: `Squadra ${i + 1}`, 
                    creditTot: req.body.credits, 
                    creditLeft: req.body.credits,
                    league: league,
                }
            ]    
        }
        await Teams.insertMany(
            teams,
            async(err, teamsArray) =>
            {
                if(err)
                    return next()
                teamsArray.forEach(
                    team => {
                        league.teams.push(team._id); 
                    }
                )
                league.admins.push(user)
                await league.save(
                    err => {
                        if(err)
                            return next() 
                    }
                )
            }
        )
    }

    const league = new League({ config: req.body })
    
    if(!league)
        return next()
    else
    {
        await createTeams()
        user.isAdminHere.push(league)
        await user.save(
            err => err && next()
        )
        return res.send({ success: true, message: 'League created', response: league, user: user })

    }

    //league.users.push(user)
    
    
}
