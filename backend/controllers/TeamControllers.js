import { League } from "../models/leagueModel"
import { Teams } from "../models/teamModel"
import { addTeamFromCustomize, updateTeamsFromCustomize } from "../utils"

export const getTeamsByLeagueId = async(req, res, next) =>
{
    const user = req.session.user
    !user && next()

    const id = req.params.id
    !id && next()

    const league = await League.findById(id)
        .populate(
            {
                path: 'teams',
                model: 'Teams',
            }
        )
        .exec(
            (err, league) =>
            {
                if(err | !league)
                    return next()
                else if(league)
                    return res.send({ success: true, message: 'Teams retrieved', response: league.teams })
            }
        )
}

export const updateTeamsByLeagueId = async(req, res, next) =>
{
    const user = req.session.user
    !user && next();

    const leagueId = req.params.id;
    !leagueId && next()

    const league = await League.findById(leagueId);
    !league && next();

    const teamConfig = req.body;
    !teamConfig && next()

    if(teamConfig.newTeams)
    {
        league.config.teamsNumber += teamConfig.newTeams.length;
        await addTeamFromCustomize(teamConfig, league, next)
    }

    await updateTeamsFromCustomize(teamConfig, next)

    if(league.config.credits !== teamConfig.credits)
    {
        league.config.credits = teamConfig.credits;
        await league.save(err => err && next())
    }

    return res.send({ success: true, message: 'Teams Updated !', response: league })
}

export const deleteTeamFromConfig = async(req, res, next) =>
{
    const user = req.session.user
    !user && next();

    const teamId = req.params.id;
    !teamId && next()

    await Teams.findByIdAndDelete(
        teamId,
        async(err, doc) =>
        {
            if(err | !doc)
                return next()
            const league = await League.findById(doc.league.toString());
            league.teams = league.teams.filter(
                team => team.toString() !== doc._id.toString()
            )
            league.config.teamsNumber -= 1;
            await league.save(
                err => err && next()
            )
            await League.findById(doc.league.toString()).populate(
                {
                    path: 'teams',
                    model: 'Teams',
                }
            )
            .exec(
                (err, league) =>
                {
                    if(err | !league)
                        return next()
                    else if(league)
                        return res.send({ success: true, message: 'Teams deleted', response: league.teams })
                }
            )                
        }
    )
}

