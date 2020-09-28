const TOKEN:string = 'token';


const USER = 'user';
const USER_PROFILE_REDIRECT = 'profile_ref_id';

export const get = () =>{
    return  localStorage.getItem(TOKEN);
}

export const getProfileRedirect = () =>{
  return  localStorage.getItem(USER_PROFILE_REDIRECT);
}

export const setProfileRedirect = (value:any) =>{
  return  localStorage.setItem(USER_PROFILE_REDIRECT,value);
}

export const removeProfileRedirect = () =>{
  localStorage.removeItem(USER_PROFILE_REDIRECT);
}

export const getUser = ():any =>{
   let user = localStorage.getItem(USER);
   return user;
}


export const storeToken = (value:any) =>{
  localStorage.setItem(TOKEN, value); 
}

export const storeUser = (value:any) =>{
  localStorage.setItem(USER, JSON.stringify(value)); 
}

export const clearAll= ()=>{
  localStorage.clear();
}