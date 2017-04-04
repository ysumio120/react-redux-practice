export function setBookmarks(bookmarks) {
  return {
    type: "SET_BOOKMARKS",
    bookmarks
  }
}

export function getBookmarks(username) { 
  
  return (dispatch) => {

    fetch('/' + username + '/favorites', {
      method: "GET"
    })
    .then(response => {
      console.log(response)
      if(!response.ok) 
        throw new Error()
      
      return response.json()
    })
    .then((json) => {
      dispatch(setBookmarks(json))
    })
    .catch((error) => {
      console.log(error)
      dispatch(setBookmarks([]))
    })

  }
}