document.addEventListener("DOMContentLoaded", function() {

    const loginBtn = document.getElementById('loginBtn');
    const regBtn = document.getElementById('registerBtn');
    const addPostBtn = document.getElementById('addPostBtn'); 

    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const addPostModal = document.getElementById('addPostModal'); 

    const logForm = document.querySelector('#loginModal form');
    const regForm = document.querySelector('#registerModal form');
    const addPostForm = document.querySelector('#addPostModal form'); 

    const loginCloseBtn = loginModal.querySelector('.loginCloseBtn');
    const registerCloseBtn = document.querySelector('.registerCloseBtn');
    const addPostCloseBtn = document.querySelector('.addPostCloseBtn'); 

    const loginFormBtn = document.querySelector('.loginFormBtn');
    const regFormBtn = document.querySelector('.registerFormBtn');
    const addPostFormBtn = document.querySelector('.addPostFormBtn'); 

    const loginModaltittle = document.querySelector('#loginModal h1');
    const loginModalMessage = document.querySelector('#loginModal p');
    const regModalMessage = document.querySelector('#registerModal p');
    const addPostModalMessage = document.querySelector('#addPostModal p'); 

    const deleteModal = document.getElementById('deleteModal');
    const deleteFormBtn = document.querySelector('.deleteFormBtn');
    const deleteCloseBtn = document.querySelector('.deleteCloseBtn');


    const profileLink= document.querySelector(".profile-link");
    const user = JSON.parse(localStorage.getItem('user'));


    if (user) {
        profileLink.href = `profile.html?UserId=${user.id}`;
    }

    const pageId = document.body.getAttribute('data-page-id');
    let currentPage = 1;
    let lastPage = 1;
    let baseURL = "https://tarmeezacademy.com/api/v1/";

    updateButtons();

    if (pageId === 'home') {
        getAllPost(currentPage);
        window.addEventListener('scroll', checkScrollToEnd)

        // Event listener for Add Post button
        addPostBtn.addEventListener('click', addOrEditPost);
    }

    function checkScrollToEnd() {
        const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (endOfPage && currentPage < lastPage) {
            console.log("Bottom of the page reached");
            
            currentPage = currentPage + 1;
            getAllPost(currentPage);
        }
    }

    async function getAllPost(page) {
        const container = document.querySelector('.container');
        const mainElement = container.querySelector('.main-index');

        try {
            const response = await axios.get(`${baseURL}posts?limit=10&page=${page}`);
            const postsData = response.data.data;
            lastPage = response.data.meta.last_page;

            postsData.forEach(post => {
                const postElement = createPostElement(post);
                mainElement.appendChild(postElement);
            });

            updateButtons();

        } catch (error) {
            console.error(error);
        }
    }
    
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
        postElement.dataset.post = JSON.stringify(post);
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

        postElement.addEventListener('click', () => {
            console.log("Post clicked:", post.id);
            window.location.href = `postDetails.html?postId=${post.id}`;
        });


        // Add click event listener directly to .user-p-n element within this postElement
        const profileDiv = postElement.querySelector('.user-p-n');
        profileDiv.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling up

            // Get the post author's ID directly from post.author
            const userId = post.author.id;
            console.log("Clicked on profile div", userId);

            
            // Example: Redirect to a profile page based on the post author's ID
            window.location.href = `profile.html?UserId=${userId}`;
        });
        
        
        return postElement;
    }

    function updateButtons() {

        console.log ("in Update function");
        const userNameHeader = document.getElementById('userNameHeader');
        const userPhoto = document.getElementById('userPhoto');
        const userInfo = document.getElementById('userInfo');

        const theToken = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
    
        // Check if there is a valid token
        if (theToken && user) {
            console.log ("User logged in");

            // Show user info section
            userInfo.style.display = 'flex';

            userInfo.addEventListener("click",function(){
                window.location.href = `profile.html?UserId=${user.id}`;
            });

            // Update user information if available
            
            userNameHeader.textContent = user.name;
    
            // Update user photo if available
            if (typeof user.profile_image === 'string' && user.profile_image.trim() !== '') {
                userPhoto.src = user.profile_image;
            }
            userPhoto.alt = user.name;
            
            // Hide registration button and update login/logout button text
            regBtn.style.display = 'none';
            loginBtn.textContent = 'Logout';

            // Show add post button if available
            if (addPostBtn) {addPostBtn.style.display = 'block';}

            // Check if edit/delete post buttons need to be displayed
            if (!document.querySelector(".btnsDiv")){
                editDeletPostButtons();
            }

        } else {

            console.log("User not logged in")

            // Hide user info section
            userInfo.style.display = 'none';

            // Show registration button and update login/logout button text
            regBtn.style.display = 'block';
            loginBtn.textContent = 'Login';

            if (addPostBtn) {addPostBtn.style.display = 'none';}
            
            // Hide user info section
            userInfo.style.display = 'none';
        }
    }

    function editDeletPostButtons() {
        const posts = document.querySelectorAll('.post');
        const user = JSON.parse(localStorage.getItem('user'));
    
        posts.forEach(postElement => {
            const post = JSON.parse(postElement.dataset.post); // Retrieve the post object
            const authorId = post.author.id;
    
            // Check if user is authenticated and is the author of the post
            if (user && user.id == authorId) {
                const btnsDiv = document.createElement('div');
                btnsDiv.classList.add('btnsDiv');
    
                btnsDiv.innerHTML = `
                    <button class="edBtn">Edit</button>
                    <button class="deletBtn">Delete</button>
                `;
    
                const userDiv = postElement.querySelector('.user');
                userDiv.appendChild(btnsDiv);
    
                const editPostBtn = btnsDiv.querySelector('.edBtn');
                const deletPostBtn = btnsDiv.querySelector('.deletBtn');
    
                editPostBtn.addEventListener('click', function(event) {
                    event.stopPropagation();
                    const buttonText = event.target.textContent;
                    addOrEditPost(post, buttonText);
                });
    
                deletPostBtn.addEventListener('click', function(event) {
                    event.stopPropagation();
                    deletePost(post);
                });
            }
        });
    }
    
    async function deletePost(post) {
        try {
            registerModal.style.display = 'none';
            loginModal.style.display = 'none';
            addPostModal.style.display = 'none';
            deleteModal.style.display = 'block';

            deleteCloseBtn.addEventListener('click', function () {
                deleteModal.style.display = 'none';
            });

            deleteFormBtn.addEventListener('click', async function () {
                const theToken = localStorage.getItem("token");
                const theHeader = { "authorization": `Bearer ${theToken}` };

                await axios.delete(`${baseURL}posts/${post.id}`, { headers: theHeader });
                location.reload();
            });

        } catch (error) {
            console.error(error);
        }
    }

    // Function to show Add/ Post modal
    async function addOrEditPost(post, btnText) {
        let isCreate = true;
        
        addPostModal.style.display = 'block';
        
        addPostCloseBtn.addEventListener('click', function() {
            addPostModal.style.display = 'none';
            addPostForm.reset();
        });

        if (btnText === "Edit") {
            document.querySelector('#addPostModal h1').textContent = "Edit Post";
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postBody').value = post.body;
            addPostFormBtn.textContent = "Update";
            isCreate = false;
        } else {
            document.querySelector('#addPostModal h1').textContent = "Add Post";
            document.getElementById('postTitle').value = "";
            document.getElementById('postBody').value = "";
            addPostFormBtn.textContent = "Create";
        }

        addPostFormBtn.addEventListener('click', async function() {
            const postTitle = document.getElementById('postTitle').value;
            const postBody = document.getElementById('postBody').value;
            const postImage = document.getElementById('postImage').files[0];

            if (postTitle.trim() === '' || postBody.trim() === '' || !postImage) {
                addPostModalMessage.textContent = "Please enter Post title, body, and select an image.";
                return;
            }

            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('body', postBody);
            formData.append('image', postImage);

            const theToken = localStorage.getItem("token");
            const theHeader = { "authorization": `Bearer ${theToken}` };

            let url = isCreate ? `${baseURL}posts` : `${baseURL}posts/${post.id}`;

            if (!isCreate) {
                formData.append("_method", "put");
            }

            try {
                const response = await axios.post(url, formData, { headers: theHeader });
                console.log(response);
                message("Post added/edited successfully");
                location.reload();
            } catch (error) {
                addPostModalMessage.textContent = error.response.data.message;
                addPostForm.reset();
            }
        });
    }

    // Show login modal when Login button is clicked
    regBtn.addEventListener('click', RegFunction);

    function RegFunction(){

        // Display the registration modal
        registerModal.style.display = 'block';

        // Event listener to close the modal
        registerCloseBtn.addEventListener('click', function () {
            registerModal.style.display = 'none';
            regForm.reset(); //Reset the registration form
            //regModalMessage.textContent = ''; // Clear any previous error messages CHECK THEN
        });

        // Event listener for registration form submission
        regFormBtn.addEventListener('click', function() {

            // Retrieve form input values
            const userName = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const name = document.getElementById('registerName').value;
            const userImage = document.getElementById('userImage').files[0]; 

            // Validate form fields
            if (userName.trim() === '' || password.trim() === '' || name.trim() === '' || !userImage) {
                regModalMessage.textContent = "Please enter user name, name, password, and your photo";
                return;
            }

            // Create FormData object to send form data as multipart/form-data
            const formData = new FormData();
            formData.append('username', userName);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('image', userImage);


            //`${baseURL}posts?limit=10&page=${page}`
             // Send POST request to register user
            axios.post( `${baseURL}register`,formData)
            .then(function(response) {
                console.log(response);

                // Store token and user data in localStorage upon successful registration
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.user));

                message("Registration successful");
                updateButtons(); // Update UI buttons (e.g., login/logout state)
            })
            .catch(function(error) {
                // Handle registration errors
                regModalMessage.textContent = error.response.data.message; // Display error message
                regForm.reset();
            });
        });
    }

    // Event listener for Login button click
    loginBtn.addEventListener('click', function () {
        if (loginBtn.textContent === 'Login') {
            logInFunction()
        }
        else {
            logOutFunction()
        }
    });
    
    function logInFunction() {
        
        const userNameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Display login modal
        loginModal.style.display = 'block';

        // Event listener to close the login modal
        loginCloseBtn.addEventListener('click', function () {
            loginModal.style.display = 'none';
            logForm.reset();
            //loginModalMessage.textContent = ''; // Clear any previous error messages CHECK THEN
        });

        // Event listener for login form submission
        loginFormBtn.addEventListener('click', function() {
            const userName = userNameInput.value;
            const password = passwordInput.value;
    
            // Validate username and password inputs
            if (userName.trim() === '' || password.trim() === '') {
                loginModalMessage.textContent = "Please enter both user Name and password.";
                return;
            }

            // Create object with login credentials
            const params = {
                "username" : userName,
                "password" : password
            };

            // Send POST request to login endpoint
            axios.post(`${baseURL}login`,params)
            .then(function(response) {

                // Store token and user data in localStorage upon successful login
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.user));

                // Conditional logic based on current page
                const pageId = document.body.getAttribute('data-page-id');
                if (pageId === 'postDetails'){
                    const commentSection = document.querySelector(".add-comment-section");
                    commentSection.style.display = "flex";
                }

                message("Login successful"); // Placeholder for success message function
                updateButtons(); // Update UI buttons (e.g., login/logout state)

            })
            .catch(function(error) {
                // Handle login errors
                loginModalMessage.textContent = error.response.data.message; // Display error message
                logForm.reset();
            });
        });
    }

    function logOutFunction() {
        // Remove all edit/delete buttons
        const allEditDeletPostBtns = document.querySelectorAll(".btnsDiv");
        allEditDeletPostBtns.forEach(btnsDiv => {
            btnsDiv.remove();
        });

        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
        // Remove comment section if present
        const commentSection = document.querySelector(".add-comment-section");
        if (commentSection){
            commentSection.remove();
        }
    
        message("Logout successful"); // Placeholder for success message function
        updateButtons(); // Update UI buttons (e.g., login/logout state)
        window.location.href = `index.html`;
    }

    function message(theMessage){

        // Hide all modals except login modal
        registerModal.style.display = 'none';
        if (deleteModal) {deleteModal.style.display = 'none';}
        if (addPostModal) {addPostModal.style.display = 'none';}
        loginModal.style.display = 'block';

        // Display success message in login modal
        loginModalMessage.style.color = "#4CAF50";
        loginModalMessage.textContent = theMessage;

        // Hide the login form and clear title
        logForm.style.display = 'none'; 
        loginModaltittle.textContent = ""; 

        // Set a timeout to hide the login modal and show the form again after 2 seconds
        setTimeout(function() {
            loginModal.style.display = 'none';
            logForm.style.display = 'flex'; // Show the login form again for the next login attempt
            loginModalMessage.textContent = '';
            logForm.reset(); // Reset the login form fields
        }, 2000);
    }

});


