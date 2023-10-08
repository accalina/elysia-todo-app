import { Elysia, t } from "elysia";
import { ITodo, TodoDatabase } from "../../database";
import { GeneralResponse, IResponse, TResponse } from "../../helper/response";

const TBody = t.Object({
    title: t.String({default: "my first todo item"}),
    isDone: t.Boolean({default: false}),
    isDelete: t.Boolean({default: false})
})

const getListParams = t.Object({
    type: t.Optional(t.String({default: "", description: "should be: '[empty]' / 'done' / 'deleted'"}))
})


const basicSchema = {response:TResponse}
const bodySchema = {body: TBody, response:TResponse}
const getListSchema = {response:TResponse, query: getListParams}

export default function RouterTodo(app: Elysia) {
    app.group('/todo', app => app // @ts-ignore
        .get('/', async ({query, db}) => {return await ListTodo(query, db)}, getListSchema) // @ts-ignore
        .post('/', async ({body, db}) => {return await CreateTodo(body, db)}, bodySchema) // @ts-ignore
        .get('/:id', async ({params, db}) => {return await RetrieveTodo(params, db)}, basicSchema) // @ts-ignore
        .put('/:id', async ({params, body, db}) => {return await UpdateTodo(params, body, db)}, bodySchema) // @ts-ignore
        .patch('/:id', async ({params, body, db}) => {return await UpdateTodo(params, body, db)}, bodySchema) // @ts-ignore
    )
}

async function ListTodo (query: any, db: TodoDatabase) {
    const type = query.type || ""
    const data = await db.getTodos(type)
    return GeneralResponse({
        message: "Success list todo " + type,
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
