
import { Database } from "bun:sqlite"

export function NewDatabase() {
    return new Database("todoDB.db", {create: true})
}