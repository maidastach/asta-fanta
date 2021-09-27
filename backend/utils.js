import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1247211",
  key: "7a8e6cf5b8698223b0dd",
  secret: "4d367a2041458a98f0d3",
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