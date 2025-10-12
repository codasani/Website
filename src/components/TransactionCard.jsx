import React from 'react'
export default function TransactionCard({t}){
  return <div className="tx"><div><div style={{fontWeight:700}}>{t.type}</div><div className="muted">{t.memo}</div></div><div className="amt">{t.amount}</div></div>
}
