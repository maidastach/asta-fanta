import express from 'express';
import asyncHandler from 'express-async-handler';

import { getOneLeague, getAdminLeagues, getMyTeams, getOneTeam } from '../controllers/UserControllers';

const UserRouter = express.Router();

///api/users

UserRouter.get('/leagues/:id', asyncHandler(getOneLeague))

UserRouter.get('/leagues', asyncHandler(getAdminLeagues))

UserRouter.get('/teams/:id', asyncHandler(getOneTeam))

UserRouter.get('/teams', asyncHandler(getMyTeams))


//UserRouter.get('/:user', asyncHandler(getLeaguesByUser))

//UserRouter.get('/:user', asyncHandler(getLeaguesByAdmin))

export default UserRouter;