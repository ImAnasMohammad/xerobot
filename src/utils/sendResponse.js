
export default function sendResponse(res){
    const {data=null,message=null,status=500} = res;
    if(data!==null) return new Response(JSON.stringify({data,success:true}), { status:200 });
    return new Response(JSON.stringify({success:false,message}), { status });
     
}