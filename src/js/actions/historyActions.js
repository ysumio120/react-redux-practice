export function setHistory(history) {
  return {
    type: "SET_HISTORY",
    history
  }
}

export function getHistory(username) { 
  
  return (dispatch) => {

    fetch('/' + username + '/history', {
      method: "GET"
    })
    .then(response => {
      console.log(response)
      if(!response.ok) 
        throw new Error()
      
      return response.json()
    })
    .then((json) => {
      console.log(json)
      json.viewHistory.sort(function(a, b) {
        if(a.dateViewed < b.dateViewed) return 1;
        else if(a.dateViewed > b.dateViewed) return -1;
        else return 0;
      })
      dispatch(setHistory(json.viewHistory));
    })
    .catch((err) => {
      console.log(err)
      dispatch(setHistory([]));
    })
  
  }
}