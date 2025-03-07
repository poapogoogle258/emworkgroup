
interface Response {
    statusCode : number,
    message : string,
    error? : string,
    data? : any

}



export function buildResult(data:any,code:number = 200) : Response {
    return {
        statusCode : code,
        message : "success",
        data : data,
    }
}

export function buildError(message:string,code:number = 500) : Response{
    return {
        statusCode : code,
        message : "error",
        error : message
    }
}
