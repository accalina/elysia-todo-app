

export interface IResponse {
    message: string
    data?: any
    success: boolean
    meta?: object
}

export function GeneralResponse(body: IResponse) {
    return {
        "message": body.message,
        "data": body.data || [],
        "success": body.success,
        "meta": body.meta || {}
    }
}