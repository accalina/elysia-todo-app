import { Elysia } from "elysia";


function RouterHome(app: Elysia) {
    app.get('/', HTMLHome)
}

function HTMLHome() {
    return Bun.file("./template/home.html").text()
}

export default RouterHome