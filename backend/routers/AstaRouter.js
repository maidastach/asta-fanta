import express from "express";
import { ACTIONS, pusher } from '../utils';

const AstaRouter = express.Router();

let objectPlayer;

let currentBid;
      // {
      //   value: 0,
      //   team: '',
      // }
let countdown = 10;

let outOfAsta = [];

const countdownStart = setInterval(
  () => {
    if (countdown > 0 && currentBid)
    {
      countdown = countdown - 1;
      console.log(countdown);
    }
  }
  ,1000
)

if (countdown === 0) clearInterval(countdownStart);

AstaRouter.delete('/player', (req, res) => {
  objectPlayer = null
  return res.json( { success: true, message: 'Player deleted' } ) })

AstaRouter.get('/player', (req, res) => {
  return res.send(objectPlayer);
})

AstaRouter.post('/player', (req, res) => {
  objectPlayer = req.body;
  pusher.trigger(ACTIONS.SOCKET_NAME, ACTIONS.ASTA_PLAYER_CHANNEL, objectPlayer);
    return res.json( { success: true, message: 'Player submitted' } ) 
})

AstaRouter.get("/bet", (req, res) => {
  return res.send(currentBid);
});

AstaRouter.post("/bet", (req, res) => {
  currentBid = req.body
  countdown = 10;
  pusher.trigger(ACTIONS.SOCKET_NAME, ACTIONS.ASTA_BET_CHANNEL, currentBid);
  return res.send(currentBid);
});

AstaRouter.get("/countdown", (req, res) => {
  return res.send({countdown});
});

// AstaRouter.post("/countdown", (req, res) => {
//   countdown = req.body.countdown;
//   pusher.trigger(ACTIONS.SOCKET_NAME, ACTIONS.ASTA_COUNTDOWN_CHANNEL, countdown);
//   return res.send(countdown);
// });

AstaRouter.get('/isinasta', (req, res) => {
  return res.send(outOfAsta)
})

AstaRouter.post('/isinasta', (req, res) => {
  const { team }  = req.body;
  if(!outOfAsta.includes(team)) outOfAsta = [...outOfAsta, team];
  pusher.trigger(ACTIONS.SOCKET_NAME, ACTIONS.ASTA_IS_IN_ASTA_CHANNEL, outOfAsta);
  res.send(outOfAsta)
})

export default AstaRouter; 