
import handleDelete from "./handleDelete";
import handleGet from "./handleGet";
import handlePut from "./handlePut";

export const GET = async (req)=>await handleGet(req);

export const PUT = async (req)=>await handlePut(req);


export const DELETE= async (req)=>await handleDelete(req);