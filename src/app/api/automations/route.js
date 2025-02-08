
import handleDelete from "./handleDelete";
import handleGet from "./handleGet";
import handlePost from "./handlePost";
import handlePut from "./handlePut";

export const POST = async(req)=> handlePost(req);


export const GET = async(req)=> handleGet(req);

export const PUT = async(req)=> handlePut(req);

export const DELETE = async(req)=> handleDelete(req);

