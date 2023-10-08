import { Elysia } from "elysia";
import { ITodo, TodoDatabase } from "../../database";
import { GeneralResponse, IResponse } from "../../helper/response";


export default function RouterTodo(app: Elysia) {
    app.group('/todo', app => app // @ts-ignore
        .get('/', async ({db}) => await ListTodo(db)) // @ts-ignore
        .post('/', async ({body, db}) => await CreateTodo(body, db)) // @ts-ignore
        .get('/:id', async ({db, params}) => await RetrieveTodo(params, db)) // @ts-ignore
        .put('/:id', async ({params, body, db}) => await UpdateTodo(params, body, db)) // @ts-ignore
        .patch('/:id', async ({params, body, db}) => await UpdateTodo(params, body, db)) // @ts-ignore
    )
}

async function ListTodo (db: TodoDatabase) {
    const data = await db.getTodos()

    return GeneralResponse({
        message: "Success list todo",
        data: data,
        success: true
    } as IResponse)
}

async function RetrieveTodo (params: any, db: TodoDatabase) {
    const id = params.id
    const data = await db.retrieveTodo(id)

    return GeneralResponse({
        message: "Success retrieve todo",
        data: data,
        success: true
    } as IResponse)
}

async function CreateTodo(body: any, db: TodoDatabase) {
    const data = await db.addTodos({
        title: body.title,
        isDone: false,
        isDelete: false
    })

    return GeneralResponse({
        message: "Success create todo",
        data: data,
        success: true
    } as IResponse) 
}

async function UpdateTodo(params: any, body: any, db: TodoDatabase) {
    const id = params.id
    const retrieveData = await db.retrieveTodo(id) as ITodo

    try {
        const updateData = await db.updateTodos(id,{
            title: body.title || retrieveData.title,
            isDone: body.isDone || retrieveData.isDone,
            isDelete: body.isDelete || retrieveData.isDelete
        })
        const data = await db.retrieveTodo(id)
        return GeneralResponse({
            message: `Success update todo ${updateData}`,
            data: data,
            success: true
        } as IResponse) 
    } catch (e) {
        return GeneralResponse({
            message: "Error on update todo: " + e,
            success: false
        } as IResponse) 
    }
}
