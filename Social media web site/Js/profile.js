document.addEventListener('DOMContentLoaded', function() {
    let baseURL = "https://tarmeezacademy.com/api/v1/";

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('UserId');
    
    getUserCard(userId);
    getUserPosts(userId);
    
    async function getUserCard(userId) {
        try {
            const response = await axios.get(`${baseURL}users/${userId}`);
            const userInfo = response.data.data;    

            // Set default image if user does not have one
            let profileImage;
            if (typeof userInfo.profile_image === 'string' && userInfo.profile_image.trim() !== '') {
                profileImage = userInfo.profile_image;
            } else {
                profileImage = 'https://via.placeholder.com/150';
            }

            // Set default email if user does not have one
            const email = userInfo.email ? userInfo.email : `${userInfo.username}@gmail.com`;

            const profileSection = document.querySelector('section');
            const userProfileHtml = `
                <div class="profile-card">
                    <img class="profile-image" src="${profileImage}" alt="${userInfo.username}">
                    <div class="profile-info">
                        <h2>${userInfo.name}</h2>
                        <p><strong>Username:</strong> ${userInfo.username}</p>
                        <p><strong>Email:</strong> ${email}</p>
                    </div>
                </div>
                <div class="profile-post">
                        <p><strong>Posts:</strong><span>${userInfo.posts_count}</span></p>
                        <p><strong>Comments:</strong><span> ${userInfo.comments_count}<span></p>
                </div>
            `;
            profileSection.innerHTML = userProfileHtml;
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserPosts(userId) {
        try {
            const response = await axios.get(`${baseURL}users/${userId}/posts`);
            const postsData = response.data.data;

            const container = document.querySelector('.container');
            const mainElement = container.querySelector('.main-profile');

            postsData.forEach(post => {
                const postElement = createPostElement(post);
                mainElement.appendChild(postElement);
            });

            function createPostElement(post) {
                // Set default image if user does not have one
                let profileImage;
                if (typeof post.author.profile_image === 'string' && post.author.profile_image.trim() !== '') {
                    profileImage = post.author.profile_image;
                } else {
                    profileImage = 'https://via.placeholder.com/50';
                }

                // Set default post image if post does not have one
                let postImage;
                if (typeof post.image === 'string' && post.image.trim() !== '') {
                    postImage = post.image;
                } else {
                    postImage = 'https://via.placeholder.com/800x400';
                }

                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="user">
                        <div class= "user-p-n">
                            <img class="profile-image" src="${profileImage}" alt="User Picture">
                            <span class="name">${post.author.username}</span>
                        </div>
                    </div>
                    <img class="post-image" src="${postImage}" alt="Post Image">
                    <div class="date">${post.created_at}</div>
                    <h2 class="title">${post.title}</h2>
                    <div class="content">${post.body}</div>
                    <hr>
                    <div class="footer">
                        <span class="comments">(${post.comments_count}) comments</span>
                        <div class="tags">
                            ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                return postElement;
            }
        } catch (error) {
            console.log(error);
        }
    }
});
