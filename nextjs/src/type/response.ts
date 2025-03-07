
  
  export interface Response<T> {
    statusCode : number,
    message : string,
    error? : string,
    data? : T
  
  }

