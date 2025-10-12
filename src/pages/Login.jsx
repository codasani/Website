import React, {useState} from 'react'
import * as api from '../api/kuaiAPI'

export default function Login({onLoggedIn, onAdmin}){
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [role,setRole] = useState('student')

  async function createAccount(){
    if(!name||!password) return alert('Enter name and password')
    try{
      const r = await api.signup(name, role, password)
      if(r.token) { onLoggedIn({name, role, token: r.token, accountId: r.accountId}); }
      else alert('Created. Please log in.')
    }catch(e){ alert('Signup failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  async function doLogin(){
    if(role === 'employee'){
      const pw = prompt('Enter admin password');
      if(pw === '1@2#3$'){ onAdmin(); return; } else { alert('Wrong admin password'); return; }
    }
    if(!name||!password) return alert('Enter name and password')
    try{
      const r = await api.login(name, password)
      if(r.token) onLoggedIn({name, role: r.role || role, token: r.token, accountId: r.accountId})
    }catch(e){ alert('Login failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  return (
    <div style={{display:'flex',gap:20}}>
      <div style={{flex:1}} className="panel">
        <h3>Quick Login</h3>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <button className="big-btn student" onClick={()=>setRole('student')}>Student Login</button>
          <button className="big-btn teacher" onClick={()=>setRole('teacher')}>Teacher Login</button>
          <button className="big-btn employee" onClick={()=>setRole('employee')}>Employee Login</button>
          <div style={{height:10}} />
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="employee">Employee</option>
          </select>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button className="btn" onClick={doLogin}>Login</button>
            <button className="btn ghost" onClick={createAccount}>Create Account</button>
          </div>
        </div>
      </div>
      <div style={{width:360}} className="side panel">
        <h3>Guide</h3>
        <div className="muted">Create Teacher & Student accounts. Teachers can reward. Employee uses shared password.</div>
      </div>
    </div>
  )
}
