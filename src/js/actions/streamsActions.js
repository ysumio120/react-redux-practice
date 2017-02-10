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

export function setMuted(muted) {
  return {
    type: "SET_MUTED",
    muted
  }
}

export function setActiveChannel(tabName) {
  return {
    type: "SET_CHANNEL",
    tabName
  }
}