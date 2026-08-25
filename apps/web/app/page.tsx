'use client';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
type Status = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST';
type Lead = { id:string; name:string; email:string; company:string; value:number; status:Status };
const API=process.env.NEXT_PUBLIC_API_URL??'http://localhost:3001';
const statuses:Status[]=['NEW','CONTACTED','QUALIFIED','WON','LOST'];
const labels:Record<Status,string>={NEW:'New',CONTACTED:'Contacted',QUALIFIED:'Qualified',WON:'Won',LOST:'Lost'};
export default function HomePage(){
 const [leads,setLeads]=useState<Lead[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const load=useCallback(async()=>{try{const r=await fetch(`${API}/api/leads`);if(!r.ok)throw new Error();setLeads(await r.json());setError('')}catch{setError('Could not reach the API. Start the app, then refresh.')}finally{setLoading(false)}},[]);
 useEffect(()=>{void load()},[load]);
 async function addLead(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;const data=Object.fromEntries(new FormData(form));const r=await fetch(`${API}/api/leads`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,value:Number(data.value)})});if(!r.ok)return setError('Check the form fields and try again.');const lead=await r.json();form.reset();setLeads(c=>[lead,...c]);setError('')}
 async function changeStatus(id:string,status:Status){const r=await fetch(`${API}/api/leads/${id}/status`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})});if(r.ok)setLeads(c=>c.map(l=>l.id===id?{...l,status}:l))}
 async function remove(id:string){const r=await fetch(`${API}/api/leads/${id}`,{method:'DELETE'});if(r.ok)setLeads(c=>c.filter(l=>l.id!==id))}
 const pipeline=useMemo(()=>leads.reduce((sum,l)=>l.status!=='LOST'?sum+l.value:sum,0),[leads]);
 return <main className="shell">
  <header><div><p className="eyebrow">LEAD / SALES WORKSPACE</p><h1>Pipeline overview</h1><p className="muted">Capture opportunities and move them from first contact to close.</p></div><div className="live"><span/> CRM dashboard</div></header>
  {error&&<div className="error">{error}</div>}
  <section className="metrics"><article><p>Total leads</p><strong>{leads.length}</strong></article><article><p>Qualified</p><strong>{leads.filter(l=>l.status==='QUALIFIED').length}</strong></article><article><p>Open pipeline</p><strong>₹{pipeline.toLocaleString('en-IN')}</strong></article><article><p>Won</p><strong>{leads.filter(l=>l.status==='WON').length}</strong></article></section>
  <section className="grid">
   <form className="panel form" onSubmit={addLead}><div><p className="eyebrow">NEW OPPORTUNITY</p><h2>Add a lead</h2></div><label>Contact name<input name="name" minLength={2} required placeholder="Aarav Mehta"/></label><label>Work email<input name="email" type="email" required placeholder="aarav@company.com"/></label><label>Company<input name="company" minLength={2} required placeholder="Acme Systems"/></label><label>Estimated value (₹)<input name="value" type="number" min="0" required placeholder="75000"/></label><label>Notes<textarea name="notes" maxLength={500} placeholder="What does this prospect need?"/></label><button type="submit">Add to pipeline</button></form>
   <section className="panel"><div className="table-title"><div><p className="eyebrow">ACTIVE DATABASE</p><h2>Leads</h2></div><span>{leads.length} records</span></div>{loading?<p className="empty">Loading leads…</p>:leads.length===0?<p className="empty">No leads yet. Add your first opportunity.</p>:<div className="table-wrap"><table><thead><tr><th>Contact</th><th>Company</th><th>Value</th><th>Stage</th><th/></tr></thead><tbody>{leads.map(l=><tr key={l.id}><td><strong>{l.name}</strong><small>{l.email}</small></td><td>{l.company}</td><td>₹{l.value.toLocaleString('en-IN')}</td><td><select value={l.status} onChange={e=>changeStatus(l.id,e.target.value as Status)}>{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select></td><td><button className="delete" onClick={()=>remove(l.id)} aria-label={`Delete ${l.name}`}>×</button></td></tr>)}</tbody></table></div>}</section>
  </section>
 </main>
}
