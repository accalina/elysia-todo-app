import { Elysia } from "elysia"
import RouterHome from "./pages/home"
import RouterTodo from "./pages/todo"

function Router(app:Elysia) {
    RouterHome(app)
    RouterTodo(app)
}

export default Router