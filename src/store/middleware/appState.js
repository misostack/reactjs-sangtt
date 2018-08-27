// import {AppState} from 'react-native';
// import {checkPermissions} from '@actions/permissions/check-permissions';
// import {wsInit, wsMsgClose} from '@actions/web-sockets/web-sockets';

const ACTIVE = 'active';
const BACKGROUND = 'background';
let currentState = ACTIVE;

const appStateMiddleware = (store) => {
  // AppState.addEventListener('change', (appState) => {
  //   const state = store.getState();
  //   const {webSocket: {connection, wsid}} = state;
  //   if (appState !== ACTIVE) {
  //     if (connection) {
  //       store.dispatch(wsMsgClose(connection));
  //     }
  //   }
  //   if (currentState === BACKGROUND) {
  //     store.dispatch(checkPermissions());
  //   }
  //   if (appState === ACTIVE) {
  //     if (!connection) {
  //       const reconnect = wsid ? true : false;
  //       store.dispatch(wsInit(reconnect));
  //     }
  //   }
  //   currentState = appState;
  // });
  return (next) => (action) => next(action);
};

export default appStateMiddleware;
