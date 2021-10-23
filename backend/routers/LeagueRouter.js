import express from "express";
import asyncHandler from 'express-async-handler';
import { getEveryleague, deleteLeague, createLeague, updateLeagueConfig } from "../controllers/LeagueControllers";

const LeagueRouter = express.Router();

//api/leagues

LeagueRouter.get('/', asyncHandler(getEveryleague))

LeagueRouter.delete('/:id', asyncHandler(deleteLeague))

LeagueRouter.post('/', asyncHandler(createLeague))

LeagueRouter.put('/:id', asyncHandler(updateLeagueConfig))

export default LeagueRouter;