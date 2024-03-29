import {url} from "./url.js"
const btnShop = document.querySelector("#btnShop")
const btnLogout = document.querySelector("#btnLogout")
const tableGames = document.querySelector("#tableGames")
const idSession = parseInt(window.location.href.split("=")[1])

btnShop.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "shop.html?id=" + idSession;
})

btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "index.html";
})

async function loadGames() {
    const allGames = await (await fetch("https://danklif.github.io/AppGames/public/games.json")).json()
    const ownGames = await (await fetch(url + "/users/ownedgames?id_user=" + idSession, {mode:"cors"})).json()

    const gameList = allGames.filter(game => {
        return ownGames.map(game => {
            return game.id_game
        }).includes(parseInt(game.id))
    })

    let template = ``

    gameList.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.name}</td>
            <td>${e.launch_date}</td>
            <td>${e.desc}</td>
            <td>${e.company}</td>
        </tr>
        `
    });

    tableGames.innerHTML = template
}

loadGames()