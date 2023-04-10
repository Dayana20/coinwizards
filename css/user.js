// Get the elements
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postSubmitButton = document.getElementById('post-submit');
const userPostsSection = document.getElementById('user-posts');
const followerPostsSection = document.getElementById('follower-posts');

// Create an array to store the posts
let posts = [];

// Function to render the posts to the userPostsSection
function renderPosts() {
  // Clear the section first
  userPostsSection.innerHTML = '';

  // Loop through the posts array and create a list item for each post
  posts.forEach(post => {
    const listItem = document.createElement('li');
    const title = document.createElement('h3');
    const content = document.createElement('p');

    title.textContent = post.title;
    content.textContent = post.content;

    listItem.appendChild(title);
    listItem.appendChild(content);
    userPostsSection.appendChild(listItem);
  });
}

// Add event listener to the post submit button
postSubmitButton.addEventListener('click', () => {
  // Get the input values
  const title = postTitleInput.value;
  const content = postContentInput.value;

  // Create a new post object and add it to the posts array
  const post = {
    title: title,
    content: content
  };
  posts.push(post);

  // Render the posts
  renderPosts();

  // Clear the input fields
  postTitleInput.value = '';
  postContentInput.value = '';
});