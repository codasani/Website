import React from 'react'

export default function MessageBoard({ transactions }){
  if(!transactions || transactions.length === 0) return <div className="panel muted">No transactions yet</div>
  return (
    <div className="tx-list">
      {transactions.map(t=> (
        <div className="tx" key={t.id || Math.random()}>
          <div>
            <div style={{fontWeight:700}}>{(t.type||'transfer').toUpperCase()}</div>
            <div className="muted">{t.memo || ''} • {new Date(t.date).toLocaleString()}</div>
          </div>
          <div style={{fontWeight:800}}>{(t.to === t.myAccountId ? '+' : '-')}{Number(t.amount).toFixed(2)} KUAI</div>
        </div>
      ))}
    </div>
  )
