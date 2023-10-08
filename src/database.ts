
import { Database } from "bun:sqlite"

export interface ITodo {
    id?: number
    title: string
    isDone: boolean
    isDelete: boolean
}

export class TodoDatabase{
    private db: Database

    constructor() {
        this.db = new Database("todoDB.db", {create: true})
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error)
    }

    async init(){
        return this.db.run(
            'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, isDone BOOLEAN DEFAULT 0, isDelete BOOLEAN DEFAULT 0)'
        )
    }

    async getTodos() {
        return this.db.query('SELECT * from todos').all()
    }

    async retrieveTodo(id:number) {
        const prepareInsert = this.db.prepare("SELECT * from todos WHERE id = $id")
        return prepareInsert.get({ $id: id})
    }

    async addTodos(todo: ITodo){
        const prepareInsert = this.db.prepare("INSERT INTO todos (title, isDone) VALUES ($title, $isDone) RETURNING id")
        return prepareInsert.run({ $title: todo.title, $isDone: false})
    }

    async updateTodos(id:number, todo:ITodo){
        const prepareUpdate = this.db.prepare("UPDATE todos SET title=$title, isDone=$isDone, isDelete=$isDelete WHERE id=$id RETURNING id")
        return prepareUpdate.run({ $id:id, $title: todo.title, $isDone: todo.isDone, $isDelete: todo.isDelete})
    }
}
