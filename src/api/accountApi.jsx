import instance from "./instance";

export const createUser= (user)=>{
    const url ='/User';
    return instance.post(url,user)
}

export const getAllUser= ()=>{
    const url = "/User";
    return instance.get(url);
}