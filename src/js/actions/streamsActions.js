export function addStream(navChannel, streamChannel) {
  return {
    type: "ADD_STREAM",
    navChannel,
    streamChannel
  }
}

export function removeStream(navChannel, streamChannel) {
  return {
    type: "REMOVE_STREAM",
    navChannel,
    streamChannel
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