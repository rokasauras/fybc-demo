import { useState } from 'react'
import { Link } from 'react-router-dom'
import { customers } from '../data'

const nav = ['Overview', 'Customers', 'Appointments', 'Follow-ups', 'Products', 'Campaigns']

export default function DashboardPage() {
  const [active, setActive] = useState('Overview')
  return (
    <div className="dashboard-shell">
      <aside className="dash-sidebar">
        <Link className="dash-brand" to="/"><span className="brand-mark dark">FY</span><span>Forever Young<small>OWNER</small></span></Link>
        <nav>{nav.map((item) => <button key={item} className={active === item ? 'active' : ''} onClick={() => setActive(item)}><span>{item === 'Overview' ? '⌂' : item === 'Customers' ? '◎' : item === 'Appointments' ? '□' : item === 'Follow-ups' ? '↗' : item === 'Products' ? '◇' : '✦'}</span>{item}</button>)}</nav>
        <div className="dash-sidebar-foot"><span className="avatar">M</span><div><strong>Mona</strong><small>Clinic owner</small></div></div>
      </aside>
      <main className="dash-main">
        <header className="dash-header"><div><p className="eyebrow">Business command centre</p><h1>{active}</h1></div><div className="dash-header-actions"><Link className="button secondary" to="/">View website</Link><button className="button primary">+ Add customer</button></div></header>
        <div className="demo-banner">Demo data only · This shows how the React website can grow into the customer platform behind Forever Young.</div>
        <section className="kpi-grid">
          <article><span>Revenue this month</span><strong>£18,640</strong><small>↑ 14.2% vs last month</small></article>
          <article><span>Active customers</span><strong>1,284</strong><small>63 visited in the last 30 days</small></article>
          <article><span>Rebooking rate</span><strong>71%</strong><small>Target 78%</small></article>
          <article><span>Product recurring</span><strong>£2,860</strong><small>94 active subscriptions</small></article>
        </section>
        <section className="dash-grid-main">
          <article className="panel revenue-panel"><div className="panel-head"><div><span className="panel-kicker">Revenue trajectory</span><h2>From a great clinic to a £250k+ business</h2></div><select><option>Last 12 months</option></select></div><div className="revenue-bars">{[44,49,52,47,58,62,65,68,73,79,84,91].map((h,i)=><div key={i} className="bar-wrap"><span className="bar" style={{height:`${h}%`}} /><small>{['O','N','D','J','F','M','A','M','J','J','A','S'][i]}</small></div>)}</div><div className="goal-line"><span>Annualised run-rate</span><strong>£223,680</strong><span className="status-pill">89% of £250k</span></div></article>
          <article className="panel next-actions"><div className="panel-head"><div><span className="panel-kicker">Today</span><h2>Next best actions</h2></div><span className="count-badge">8</span></div><ul><li><span className="action-icon">↗</span><div><strong>5 treatment follow-ups</strong><small>Customers due a 7-day skin check-in</small></div><button>Open</button></li><li><span className="action-icon">◇</span><div><strong>3 product refills</strong><small>Recurring products due within 7 days</small></div><button>Open</button></li><li><span className="action-icon">✦</span><div><strong>21 lapsed customers</strong><small>No visit in 120+ days · potential win-back</small></div><button>Build campaign</button></li></ul></article>
        </section>
        <section className="panel customer-panel"><div className="panel-head"><div><span className="panel-kicker">Customer intelligence</span><h2>Customers needing attention</h2></div><button className="text-button">View all 1,284 →</button></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Segment</th><th>Last visit</th><th>Next best action</th><th>Lifetime value</th><th></th></tr></thead><tbody>{customers.map((customer)=><tr key={customer.id}><td><div className="customer-cell"><span className="avatar small">{customer.initials}</span><div><strong>{customer.name}</strong><small>{customer.email}</small></div></div></td><td><span className={`segment ${customer.segment.toLowerCase().replace(' ','-')}`}>{customer.segment}</span></td><td>{customer.lastVisit}</td><td>{customer.nextAction}</td><td><strong>£{customer.value.toLocaleString()}</strong></td><td><button className="row-arrow">→</button></td></tr>)}</tbody></table></div></section>
        <section className="dash-bottom-grid"><article className="panel"><span className="panel-kicker">Funnel</span><h2>Website → appointment</h2><div className="funnel-list"><div><span>1,842</span><small>Visitors</small></div><div><span>472</span><small>Facial finder</small></div><div><span>186</span><small>Booking starts</small></div><div><span>121</span><small>Booked</small></div></div><p className="metric-note"><strong>6.6%</strong> visitor-to-booking conversion</p></article><article className="panel"><span className="panel-kicker">Retention</span><h2>Customer base health</h2><div className="donut"><div><strong>74%</strong><small>active</small></div></div><div className="legend"><span><i />Active · 950</span><span><i />At risk · 219</span><span><i />Lapsed · 115</span></div></article><article className="panel"><span className="panel-kicker">Automation opportunity</span><h2>£4,120 estimated recoverable</h2><p>Customers who historically bought treatments or products but are now overdue for a visit or refill.</p><button className="button primary panel-button">Create win-back campaign</button></article></section>
      </main>
    </div>
  )
}
