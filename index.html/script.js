let posts = [];

function createPost() {
  const input = document.getElementById("post-input");
  const content = input.value.trim();

  if (content === "") return;

  const post = {
    id: Date.now(),
    content: content,
    likes: 0,
    comments: [],
  };

  posts.unshift(post); // latest post on top
  input.value = "";
  renderPosts();
}

function renderPosts() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.className = "post";

    postEl.innerHTML = `
      <div class="post-content">${post.content}</div>
      <div class="actions">
        <button onclick="likePost(${post.id})">Like (${post.likes})</button>
      </div>
      <div class="comment-section">
        <input type="text" id="comment-${
          post.id
        }" placeholder="Add a comment...">
        <button onclick="addComment(${post.id})">Comment</button>
        <div class="comments" id="comments-${post.id}">
          ${post.comments.map((c) => `<p>${c}</p>`).join("")}
        </div>
      </div>
    `;

    postList.appendChild(postEl);
  });
}

function likePost(id) {
  const post = posts.find((p) => p.id === id);
  post.likes++;
  renderPosts();
}

function addComment(id) {
  const input = document.getElementById(`comment-${id}`);
  const text = input.value.trim();
  if (text === "") return;

  const post = posts.find((p) => p.id === id);
  post.comments.push(text);
  input.value = "";
  renderPosts();
}

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
deleteBtn.classList.add('delete-btn');
deleteBtn.onclick = () => {
  postDiv.remove(); 
};
postDiv.appendChild(deleteBtn);

