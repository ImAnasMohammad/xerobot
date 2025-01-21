
export default function sendResponse(status=500,message=null,data=null){
    return new Response(JSON.stringify({data,message}), { status });
     
}