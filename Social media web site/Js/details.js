document.addEventListener('DOMContentLoaded', function() {
    // Parse the query string into URLSearchParams object to get postId
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    const theToken = localStorage.getItem('token');
    let baseURL = "https://tarmeezacademy.com/api/v1/";

    // Call function to fetch and display the post details
    getThePost(postId);

    // Function to fetch post details and render them
    async function getThePost(postId) {
        try {
            const response = await axios.get(`${baseURL}posts/${postId}`);
            const postData = response.data.data;

            // Select the main-post element to append content
            const mainElement = document.querySelector('.main-post');

            // Set profile image for post author
            let authorPhotoSrc;
            if (typeof postData.author.profile_image === 'string' && postData.author.profile_image.trim() !== '') {
                authorPhotoSrc = postData.author.profile_image;
            } else {
                authorPhotoSrc = 'https://via.placeholder.com/50';
            }

            // Set post image
            let postImageSrc;
            if (typeof postData.image === 'string' && postData.image.trim() !== '') {
                postImageSrc = postData.image;
            } else {
                postImageSrc = 'https://via.placeholder.com/800x400';
            }

            // Create post detail elements
            const postElement = document.createElement('div');
            postElement.classList.add('postDetail');
            postElement.innerHTML = `
                <h2>${postData.title}</h2>
                <div class="author-details">
                    <img src="${authorPhotoSrc}" alt="User Picture" class="author-photo">
                    <div class="author-name">${postData.author.username}</div>
                </div>
                <img src="${postImageSrc}" alt="Post Image">
                <div class="date">Posted on: ${postData.created_at}</div>
                <div class="post-body">${postData.body}</div>
            `;

            // Comments Section
            const commentsSection = document.createElement('div');
            commentsSection.classList.add('comments-section');

            // Loop through comments and create comment elements
            postData.comments.forEach(comment => {
                let commentAuthorPhotoSrc;
                if (typeof comment.author.profile_image === 'string' && comment.author.profile_image.trim() !== '') {
                    commentAuthorPhotoSrc = comment.author.profile_image;
                } else {
                    commentAuthorPhotoSrc = 'https://via.placeholder.com/50';
                }

                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <div class="comment-author">
                        <img src="${commentAuthorPhotoSrc}" alt="Author Photo" class="comment-author-photo">
                        <h4>${comment.author.username}</h4>
                    </div>
                    <div class="comment-body">${comment.body}</div>
                `;

                commentsSection.appendChild(commentElement);
            });

            // Create add comment section
            const addCommentSection = document.createElement('div');
            addCommentSection.classList.add('add-comment-section');
            addCommentSection.style.display = "none";
            addCommentSection.innerHTML = `
                <textarea id="commentField" rows="4" placeholder="Write a comment..."></textarea>
                <button id="submitCommentButton">Send</button>
            `;

            // Add event listener for submitting comments
            const submitCommentButton = addCommentSection.querySelector('#submitCommentButton');
            submitCommentButton.addEventListener("click", addComment);

            // Append all created elements to mainElement
            mainElement.appendChild(postElement);
            mainElement.appendChild(commentsSection);
            mainElement.appendChild(addCommentSection);

            if (theToken) {
                addCommentSection.style.display = "flex";
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Function to handle adding a comment
    async function addComment() {
        try {
            const theComment = document.getElementById("commentField");
            if (theComment.value.trim() === "") {
                theComment.placeholder = "Please, Write a comment first";
                theComment.style.fontSize = "20px";
                setTimeout(function() {
                    theComment.style.fontSize = "16px";
                }, 3000);
            } else {
                // Prepare comment data
                let params = {
                    "body": theComment.value
                };

                // Send comment to server
                await axios.post(`${baseURL}posts/${postId}/comments`, params, {
                    headers: {
                        "authorization": `Bearer ${theToken}`
                    }
                });

                // Refresh post details after adding comment
                document.querySelector('.main-post').innerHTML = "";
                await getThePost(postId);
            }
        } catch (error) {
            console.log(error);
        }
    }
});
