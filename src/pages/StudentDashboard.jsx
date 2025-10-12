import React, {useEffect, useState} from 'react'
import MessageBoard from '../components/MessageBoard'
import * as api from '../api/kuaiAPI'

export default function StudentDashboard({session, onLogout}){
  const [account, setAccount] = useState(null)
  const [txs, setTxs] = useState([])
  const [to, setTo] = useState('')
  const [amt, setAmt] = useState(1)

  useEffect(()=>{ load(); }, [])

  async function load(){
    try{
      const accounts = await api.getAccounts()
      const my = accounts.find(a=> (a.username || a.ownerName || '').toLowerCase() === (session.name||'').toLowerCase()) || accounts[0]
      setAccount(my)
      if(my) {
        const t = await api.getTransactions(my.accountId || my.id)
        // annotate my account id for display sign
        t.forEach(x=> x.myAccountId = my.accountId || my.id)
        setTxs(t)
      }
    }catch(e){ console.error(e); alert('Load failed') }
  }

  async function send(){
    if(!to||!amt) return alert('Enter recipient and amount')
    try{
      await api.postTransaction({ fromAccountId: account.accountId || account.id, toUsername: to, amount: Number(amt) })
      await load()
    }catch(e){ alert('Send failed: ' + (e.body?.error || JSON.stringify(e))) }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className="panel">
        <div><strong>{session.name}</strong><div className="muted">Account</div></div>
        <div style={{fontSize:22,fontWeight:800}}>{account ? Number(account.balance).toFixed(2) : '0.00'} KUAI</div>
      </div>
      <div style={{height:12}} />
      <div style={{display:'flex',gap:12}}>
        <div className="panel" style={{flex:1}}>
          <div><div className="muted">Send Kuai</div><input placeholder="Recipient name" value={to} onChange={e=>setTo(e.target.value)} /><input type="number" value={amt} onChange={e=>setAmt(e.target.value)} /></div>
          <div style={{height:8}} /><button className="btn" onClick={send}>Send</button>
        </div>
        <div style={{width:360}} className="panel">
          <h3>Your Transactions</h3>
          <MessageBoard transactions={txs} />
        </div>
      </div>
      <div style={{height:12}} /><button className="btn ghost" onClick={onLogout}>Log out</button>
    </div>
  )
}
