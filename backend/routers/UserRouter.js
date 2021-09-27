import express from 'express';
import asyncHandler from 'express-async-handler';

import { getOneLeague, getMyLeagues, getMyTeams } from '../controllers/UserControllers';

const UserRouter = express.Router();

///api/users

UserRouter.get('/leagues/:id', asyncHandler(getOneLeague))

UserRouter.get('/leagues', asyncHandler(getMyLeagues))

// UserRouter.get('/:id', asyncHandler(getMyTeams))

export default UserRouter;