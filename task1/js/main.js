const keyValuePairs = JSON.parse(localStorage.getItem("keyValuePairs")) || [];

const pairsInput = document.getElementById("pair-input");
const addBtn = document.getElementById("add-btn");
const pairsOutput = document.getElementById("output");
const sortByNameBtn = document.getElementById("sort-by-name-btn");
const sortByValueBtn = document.getElementById("sort-by-value-btn");
const deleteBtn = document.getElementById("delete-btn");
const regex = /^\s*([a-z0-9]+)\s*=\s*([a-z0-9]+)\s*$/i;

addBtn.onclick = (event) => {
    event.preventDefault();
    const match = pairsInput.value.match(regex);
    if (!match) {
        alert("Please enter a valid pair");
        return 0;
    }
    keyValuePairs.push({name: match[1].toLowerCase(), value: match[2].toLowerCase()});
    localStorage.setItem("keyValuePairs", JSON.stringify(keyValuePairs));
    renderPairs();
}

sortByNameBtn.onclick = (event) => {
    event.preventDefault();
    keyValuePairs.sort((a, b) => a.name.localeCompare(b.name));
    renderPairs();
}

sortByValueBtn.onclick = (event) => {
    event.preventDefault();
    keyValuePairs.sort((a, b) => a.value.localeCompare(b.value));
    renderPairs();
}

deleteBtn.onclick = (event) => {
    event.preventDefault();
    keyValuePairs.length = 0;
    localStorage.setItem("keyValuePairs", JSON.stringify(keyValuePairs));
    renderPairs();
}

function renderPairs() {
    pairsOutput.innerHTML = "";
    const ul = document.createElement("ul");
    for (const pair of keyValuePairs) {
        const li = document.createElement("li");
        li.innerText = `${capitalize(pair.name)} = ${capitalize(pair.value)}`;
        ul.appendChild(li);
    }
    pairsOutput.appendChild(ul);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

renderPairs();
