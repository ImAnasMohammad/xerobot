
export default function sendResponse({status,...data}){
    return new Response(JSON.stringify({...data}), { status }); 
}