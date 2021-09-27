import Pusher from "pusher";
import config from './config';

export const pusher = new Pusher({
  appId: config.PUSHER_ID,
  key: config.PUSHER_KEY,
  secret: config.PUSHER_SECRET,
  cluster: "ap4",
  useTLS: true
});

export const ACTIONS = 
  {
    SOCKET_NAME: "fantacalcio",
    ADD_PLAYER_CHANNEL: 'add-player',
    ASTA_PLAYER_CHANNEL: "asta-player",
    ASTA_BET_CHANNEL: "asta-bet",
    ASTA_COUNTDOWN_CHANNEL: "asta-countdown",
    ASTA_IS_IN_ASTA_CHANNEL: 'asta-is-in-asta',
    TEAM_LOCALSTORAGE: 'team',
    PLAYER_LOCALSTORAGE: 'player',
    CURRENTBID_LOCALSTORAGE: 'current-bid',
    IS_IN_ASTA_LOCALSTORAGE: 'is-in-asta',
  };