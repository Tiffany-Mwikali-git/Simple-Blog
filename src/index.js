// const posts = document.querySelector('posts')

// let blogPosts = []

// const URL = "http://localhost:3000/posts"

// function displayPosts() {
//         fetch(URL)
//         .then(res => res.json())
//         .then(posts => {


//         blogPosts = posts;
//        const blogContainer = document.getElementById("blogItems");
//        const link = document.createElement("a");
//        let ids = 0
//        for(let post of posts){
//            link.href = "#"
//            const li = document.createElement("li")
//            li.addEventListener("click", linkClicked(ids))
//          li.textContent = post.title;
//          link.appendChild(li)
//          blogContainer.appendChild(link)
//         showBlogItem(0)
//         ids = ids + 1;
//        }
//     })
// }

// function showBlogItem(itemId){
//     const blogTitle = document.getElementById("blogTitle");
//       blogTitle.innerText = blogPosts[itemId].title;
//       const blogContent = document.getElementById("blogContent");
//       blogContent.innerText = blogPosts[itemId].content;
// }

// function linkClicked(id){
//     showBlogItem(id)    
//     console.log("id clicked", id)
// }

// displayPosts();


const URL = 'http://localhost:3000/posts';
const postList = document.getElementById('post-list');
const form = document.getElementById('post-form');


function displayPosts() {
  fetch(URL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = '';
      posts.forEach(post => {
        const div = createPostCard(post);
        postList.appendChild(div);
      });
    });
}


function createPostCard(post) {
  const div = document.createElement('div');
  div.className = 'post';
  div.innerHTML = `
    <h3>${post.title}</h3>
    <p><em>by ${post.author}</em></p>
    <p>${post.content}</p>
    ${post.image ? `<img src="${post.image}" class="post-image" style="max-width: 100px;">` : ''}
  `;
  div.style.cursor = 'pointer';
  div.addEventListener('click', () => handlePostClick(post.id));
  return div;
}


function handlePostClick(postId) {
  fetch(`${URL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      const details = document.getElementById('post-detail');
      details.innerHTML = `
        <h2>${post.title}</h2>
        ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
      `;
    });
}


function addNewPostListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      author: form.author.value,
      content: form.content.value,
      image: form.image.value
    };

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(post => {
      const postCard = createPostCard(post);
      postList.prepend(postCard);
      form.reset();
    });
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);



