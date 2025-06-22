function displayPost() {
    const URL = "http://localhost:3000/posts"
    fetch(URL)
    .then(res => res.json())
    .then(posts => {
        
    })
    }

displayPost()