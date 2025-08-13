const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
const userInfo = document.getElementById("detail-information");


fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then(userData => userData.json())
.then(user => {
    if (user) {
        const name = document.createElement("h2");
        name.innerText = user.name;
        const userEmail = document.createElement("p");
        userEmail.innerText = `Email: ${user.email}`;
        const phoneNumber = document.createElement("p");
        phoneNumber.innerText = `Phone number: ${user.phone}`;
        const username = document.createElement("p");
        username.innerText = `Username: ${user.username}`;
        const website = document.createElement("p");
        website.innerText = `User website: ${user.website}`;
        const addressInfo = document.createElement("div");
        addressInfo.className = "details";
        const addressTitle = document.createElement("h3");
        addressTitle.innerText = "Address details";
        const city = document.createElement("p");
        city.innerText = `City: ${user.address.city}`;
        const street = document.createElement("p");
        street.innerText = `Street: ${user.address.street}`;
        const suite = document.createElement("p");
        suite.innerText = `Suite: ${user.address.suite}`;
        const zipCode = document.createElement("p");
        zipCode.innerText = `Zip code: ${user.address.zipcode}`;
        const lat = document.createElement("p");
        lat.innerText = `Lat: ${user.address.geo.lat}`;
        const long = document.createElement("p");
        long.innerText = `Lng: ${user.address.geo.lng}`
        addressInfo.append(addressTitle, city, street, suite, zipCode, lat, long);
        const companyInfo = document.createElement("div");
        companyInfo.className = "details";
        const companyTitle = document.createElement("h3");
        companyTitle.innerText = "Company details";
        const companyName = document.createElement("p");
        companyName.innerText = `Name: ${user.company.name}`;
        const catchPhrase = document.createElement("p");
        catchPhrase.innerText = `Company catch phrase: ${user.company.catchPhrase}`;
        const bs = document.createElement("p");
        bs.innerText = `Company bs: ${user.company.bs}`
        const loadPosts = document.createElement("button");
        loadPosts.className = "btn load-content";
        loadPosts.innerText = "Posts of current user";
        loadPosts.onclick = () => {
            fetchUserPosts(user.id);
        }

        companyInfo.append(companyTitle, companyName, catchPhrase, bs);
        userInfo.append(name, userEmail, phoneNumber, userEmail, website, addressInfo, companyInfo, loadPosts);


    }
})
.catch(error => {
    const userNotFound = document.createElement("h2");
    userNotFound.className = "alert";
    userNotFound.innerText = `Sorry, something went wrong. Please try again later.`;
    userInfo.appendChild(userNotFound);
});

function fetchUserPosts(userId) {
    const oldPostsContainer = document.querySelector(".posts-container");
    if (oldPostsContainer) {
        oldPostsContainer.remove();
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(userPosts => userPosts.json())
    .then(posts => {

        const postsContainer = document.createElement("div");
        postsContainer.className = "posts-container";
        console.log(posts);
        for (const post of posts) {
            const postContainer = document.createElement("div");
            postContainer.className = "post-container";
            const postTitle = document.createElement("h5");
            postTitle.innerText = `Title: ${post.title}`;
            const postDetail = document.createElement("a");
            postDetail.href = `post-details.html?userId=${userId}&postId=${post.id}`;
            postDetail.className = "btn post-details-link";
            postDetail.innerText = `See more details`;
            postContainer.append(postTitle, postDetail);
            postsContainer.appendChild(postContainer);

        }
        userInfo.appendChild(postsContainer);
    })
    .catch(error => {
        const contentWasNotFound = document.createElement("h2");
        contentWasNotFound.className = "alert";
        contentWasNotFound.innerText = `Sorry, something went wrong. Please try again later.`;
        userInfo.appendChild(contentWasNotFound);
    });
}

fetchUserPosts();
