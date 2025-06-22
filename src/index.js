let blogPosts = []
function displayPost() {
    const URL = "http://localhost:3000/posts"
    fetch(URL)
    .then(res => res.json())
    .then(posts => {
        blogPosts = posts;
       const blogContainer = document.getElementById("blogItems");
       const link = document.createElement("a");
       let ids = 0
       for(let post of posts){
           link.href = "#"
           const li = document.createElement("li")
           li.addEventListener("click", linkClicked(ids))
         li.textContent = post.title;
         link.appendChild(li)
         blogContainer.appendChild(link)
        showBlogItem(0)
        ids = ids + 1;
       }
    })
}

function showBlogItem(itemId){
    const blogTitle = document.getElementById("blogTitle");
      blogTitle.innerText = blogPosts[itemId].title;
      const blogContent = document.getElementById("blogContent");
      blogContent.innerText = blogPosts[itemId].content;
}

function linkClicked(id){
    showBlogItem(id)    
    console.log("id clicked", id)
}

displayPost();


