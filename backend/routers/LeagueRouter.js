import express from "express";
import asyncHandler from 'express-async-handler';
import { getEveryleague, updateLeague, deleteLeague, createLeague } from "../controllers/LeagueControllers";

const LeagueRouter = express.Router();

//api/leagues

LeagueRouter.get('/', asyncHandler(getEveryleague))

LeagueRouter.put('/:id', asyncHandler(updateLeague))

LeagueRouter.delete('/:id', asyncHandler(deleteLeague))

LeagueRouter.post('/', asyncHandler(createLeague))

export default LeagueRouter;