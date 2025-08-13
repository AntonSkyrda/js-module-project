const params = new URLSearchParams(window.location.search);
const postInfo = document.getElementById("detail-information");
const userId = params.get("userId");
const postId = params.get("postId");

const backToUser = document.getElementById("back-to-user");
backToUser.href = `user-details.html?userId=${userId}`;


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(postData => postData.json())
.then(post => {
    const postTitle = document.createElement("h2");
    postTitle.innerText = `Title: ${post.title}`;
    const bodyContainer = document.createElement("div");
    bodyContainer.classList.add("body-container");
    const postBody = document.createElement("p");
    postBody.innerText = post.body;
    bodyContainer.appendChild(postBody);
    const currentPostId = document.createElement("p");
    currentPostId.innerText = `Id: ${post.id}`;
    const postedByUserId = document.createElement("p");
    postedByUserId.innerText = `Posted by user with id: ${post.userId}`;
    const loadComments = document.createElement("button");
    loadComments.className = "btn load-content";
    loadComments.innerText = "Load Comments of current post";
    loadComments.onclick = () => {
        fetchPostComments(postId);
    }
    postInfo.append(postTitle, currentPostId, postedByUserId, bodyContainer, loadComments);
})
.catch(error => {
    const contentWasNotFound = document.createElement("h2");
    contentWasNotFound.className = "alert";
    contentWasNotFound.innerText = `Sorry, something went wrong. Please try again later.`;
    userInfo.appendChild(contentWasNotFound);
});

function fetchPostComments(postId) {
    const oldCommentsContainer = document.querySelector(".comments-container");
    if (oldCommentsContainer) {
        oldCommentsContainer.remove()
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(commentsData => commentsData.json())
    .then(comments => {
        const commentsContainer = document.createElement("div");
        commentsContainer.className = "comments-container";
        console.log(comments)
        for (const comment of comments) {
            const commentContainer = document.createElement("div");
            commentContainer.className = "comment-container";
            const commentName = document.createElement("h3");
            commentName.innerText = comment.name;
            const commentAuthor = document.createElement("p");
            commentAuthor.innerText = `Commented by: ${comment.email}`;
            const commentId = document.createElement("p");
            commentId.innerText = `Comment id: ${comment.id}`;
            const commentBodyContainer = document.createElement("div");
            commentBodyContainer.classList.add("body-container");
            const commentBody = document.createElement("p");
            commentBody.innerText = comment.body;
            commentBodyContainer.appendChild(commentBody);
            commentContainer.append(commentName, commentAuthor, commentId, commentBodyContainer);
            commentsContainer.appendChild(commentContainer);

        }
        postInfo.appendChild(commentsContainer);
    })
    .catch(error => {
        const contentWasNotFound = document.createElement("h2");
        contentWasNotFound.className = "alert";
        contentWasNotFound.innerText = `Sorry, something went wrong. Please try again later.`;
        userInfo.appendChild(contentWasNotFound);
    });
}


