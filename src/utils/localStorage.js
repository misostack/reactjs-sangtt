export function getTokenLocal() {
  try {
    const auth = localStorage.getItem('auth');
    if (!auth) return undefined;

    return JSON.parse(auth);
  } catch (err) {
    return undefined;
  }
}

export function setTokenLocal(data) {
  try {
    if(data) localStorage.setItem('auth', JSON.stringify(data))
  }
  catch(err){
    
  }
}

export function removeToken() {
  try {
    localStorage.removeItem('auth')
  }
  catch(err){
    
  }
}
