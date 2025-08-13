const usersContainer = document.getElementById('users-container');

if (usersContainer) {
    console.log("sdsad")
}

fetch("https://jsonplaceholder.typicode.com/users")
    .then(usersData => usersData.json())
    .then(users => {
        for (const user of users) {
            const userContainer = document.createElement('div');
            userContainer.className = 'user-container';
            const name = document.createElement('h2');
            name.textContent = user.name;
            const id = document.createElement('p');
            id.textContent = `User id: ${user.id}`;
            const detail = document.createElement('a');
            detail.className = 'btn';
            detail.href = `user-details.html?userId=${user.id}`;
            detail.textContent = "More details";
            userContainer.append(name, id, detail);
            usersContainer.appendChild(userContainer);
        }
    })
.catch(error => {
    const contentWasNotFound = document.createElement("h2");
    contentWasNotFound.className = "alert";
    contentWasNotFound.innerText = `Sorry, something went wrong. Please try again later.`;
    userInfo.appendChild(contentWasNotFound);
})
