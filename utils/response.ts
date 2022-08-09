import express from 'express';
export function sendSuccessRespose(res: express.Response, code: number = 200, obj?: any) {
    return res.status(code).json(obj)
}
export function sendFailedResponse(res: express.Response, code: number = 400, obj?: any) {
    return res.status(code).json(obj)
}