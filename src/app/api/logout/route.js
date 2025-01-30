import destroyCookie from "@/utils/cookies/destroyCookie";



export async function GET() {

  return destroyCookie({success:true,message:'Logout successful'});
}