import React from 'react'
export default function UserCard({user, balance}){
  return (
    <div className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><strong>{user}</strong><div className="muted">Balance</div></div>
        <div style={{fontSize:22,fontWeight:800}}>{Number(balance).toFixed(2)} KUAI</div>
      </div>
    </div>
  )
}
