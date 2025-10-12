import React from 'react'

export default function Welcome({onStart}){
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh'}}>
      <div style={{fontSize:36,fontWeight:900}}>Welcome to Kuai Classroom Bank!</div>
      <div style={{height:12}}/>
      <button className="btn" onClick={onStart} style={{marginTop:20}}>Start Banking</button>
    </div>
  )
}
