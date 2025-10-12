const API_BASE = 'https://website1-v07a.onrender.com/api';

async function request(path, opts = {}){
  const headers = opts.headers || {};
  if(opts.body && typeof opts.body === 'object'){
    headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(API_BASE + path, {...opts, headers});
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if(!res.ok) throw { status: res.status, body: json };
  return json;
}

export async function signup(name, role, password){
  return request('/auth/signup', { method: 'POST', body: { name, role, password } });
}
export async function login(name, password){
  return request('/auth/login', { method: 'POST', body: { name, password } });
}
export async function getAccounts(){
  return request('/accounts', { method: 'GET' });
}
export async function getTransactions(accountId){
  return request('/transactions?accountId=' + encodeURIComponent(accountId), { method: 'GET' });
}
export async function postTransaction(body){
  return request('/transactions', { method: 'POST', body });
}
export async function postReward(body){
  return request('/rewards', { method: 'POST', body });
}
export async function getAllTransactions(){
  return request('/transactions', { method: 'GET' });
}
export async function setBalance(accountId, body){
  return request('/accounts/' + encodeURIComponent(accountId), { method: 'PATCH', body });
}
export async function adminReset(){
  return request('/admin/reset', { method: 'DELETE' });
}
