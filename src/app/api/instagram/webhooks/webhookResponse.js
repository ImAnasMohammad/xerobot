const success = (message="EVENT_RECEIVED",status=200)=>{
    return new Response(message,{status})
}


const failed = (error="Unsuccess",status=400)=>{
    return new Response(error,{status})
}


export {success,failed};