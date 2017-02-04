export function addStream(stream) {
  return {
    type: "ADD_STREAM",
    stream
  }
}

export function loadStream(channel, player) {
  return {
    type: "LOAD_STREAM",
    channel,
    player
  }
}