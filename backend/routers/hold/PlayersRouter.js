import express from 'express'
import Players from '../models/playerModel';

const PlayersRouter = express.Router();

PlayersRouter.get(
    '/', 
    async (req, res) => 
    {
        try
        {
            const players = await Players.find();
            players 
                ? res.send(players) 
                : res.send( { message: 'Unable to retrieve players!' } )  
        }
        catch(error)
        {
            res.send( { message: 'Unable to retrieve players!', error: error } )
        }
})

export default PlayersRouter;