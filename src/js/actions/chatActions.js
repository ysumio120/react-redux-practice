export function addChat(channel) {
  return {
    type: "ADD_CHAT",
    channel
  }
}

// export function loadStream(channel, player) {
//   return {
//     type: "LOAD_STREAM",
//     channel,
//     player
//   }
// }

// export function setMuted(muted) {
//   return {
//     type: "SET_MUTED",
//     muted
//   }
// }