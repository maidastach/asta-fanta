import { League } from "../models/leagueModel"
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

export const updateLeague = async(req, res, next) =>
{

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

    const league = await new League({ config: req.body })
    
    if(!league)
        return next()

    league.users.push(user)
    league.admins.push(user)

    user.leagues.push(league)
    user.isAdminHere.push(league)

    await user.save(
        err => err && next()
    )
    await league.save(
        err => err && next()
    )
    
    return res.send({ success: true, message: 'League created', response: league, user: user })
}

export const getLeaguesByUser = async(req, res, next) =>
{

}

//LeagueRouter.get('/:user', asyncHandler(getLeaguesByAdmin))