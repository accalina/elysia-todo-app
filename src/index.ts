import { Elysia } from "elysia";
import { logger } from "@grotto/logysia"
import { staticPlugin } from "@elysiajs/static"
import { html } from "@elysiajs/html"
import { swagger } from "@elysiajs/swagger"
import Router from "./router";


const app = new Elysia()

app.use(logger())
app.use(staticPlugin())
app.use(html())
app.use(swagger({
  path: '/v2/swagger',
  documentation: {
    info: {
      title: "Elysia Todo App Documentation",
      version: '1.0.0'
    }
  }
}))
app.get('/favicon.ico', () => Bun.file('public/favicon.ico'))
Router(app)
app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
