
const URL = 'https://blog-server-bk4x.onrender.com/posts';
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
    <p>${post.date}</p>
    <p>${post.content}</p>
    <p>${post.summary}</p>
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
        <p>${post.date}</p>
        <p><strong>Summary:</strong> ${post.summary}</p>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
      `;
    });
}


function addNewPostListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      date: form.date.value,
      summary:form.summary.value,
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



