import express from 'express';
import asyncHandler from 'express-async-handler';

import { getOneLeague, getMyLeagues, getMyTeams, getOneTeam } from '../controllers/UserControllers';

const UserRouter = express.Router();

///api/users

UserRouter.get('/leagues/:id', asyncHandler(getOneLeague))

UserRouter.get('/leagues', asyncHandler(getMyLeagues))

UserRouter.get('/teams/:id', asyncHandler(getOneTeam))

UserRouter.get('/teams', asyncHandler(getMyTeams))

export default UserRouter;