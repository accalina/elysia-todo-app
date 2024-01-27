import { t } from "elysia"

export interface IResponse {
    message: string
    data?: any
    success: boolean
    meta?: object
}

export const TResponse = t.Object({
    message: t.String(),
    data: t.Any(),
    success: t.Boolean(),
    meta: t.Any()
})

export function GeneralResponse(body: IResponse) {
    return {
        "message": body.message,
        "data": body.data || [],
        "success": body.success,
        "meta": body.meta || {}
    }
}