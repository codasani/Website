import React, {useEffect, useState} from 'react'
import * as api from '../api/kuaiAPI'

export default function AdminDashboard({onLogout}){
  const [accounts, setAccounts] = useState([])
  const [txs, setTxs] = useState([])

  useEffect(()=>{ load(); }, [])

  async function load(){
    try{
      const accs = await api.getAccounts()
      setAccounts(accs)
      const all = await api.getAllTransactions()
      setTxs(all)
    }catch(e){ alert('Load failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  async function setBal(id){
    const v = prompt('New balance'); if(v===null) return;
    try{ await api.setBalance(id, { balance: Number(v) }); await load(); }catch(e){ alert('Set failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  async function reset(){
    if(!confirm('Reset server data?')) return;
    try{ await api.adminReset(); alert('Reset requested'); await load(); }catch(e){ alert('Reset failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  return (
    <div>
      <div className="panel"><h3>Users & Balances</h3>
        <table className="admin-table"><thead><tr><th>Name</th><th>Balance</th><th>Actions</th></tr></thead><tbody>
          {accounts.map(a=> <tr key={a.accountId||a.id}><td>{a.ownerName||a.username}</td><td>{Number(a.balance).toFixed(2)}</td><td><button className="btn ghost" onClick={()=>setBal(a.accountId||a.id)}>Set</button></td></tr>)}
        </tbody></table>
      </div>
      <div style={{height:12}} />
      <div className="panel"><h3>All Transactions</h3>
        <div className="tx-list">{txs.map(t=> <div className="tx" key={t.id}><div><div style={{fontWeight:700}}>{t.type}</div><div className="muted">From: {t.from} • To: {t.to}</div></div><div className="amt">{Number(t.amount).toFixed(2)}</div></div>)}</div>
      </div>
      <div style={{height:12}} /><button className="btn ghost" onClick={reset}>Reset Server Data</button>
      <div style={{height:12}} /><button className="btn ghost" onClick={onLogout}>Log out</button>
    </div>
  )
}
