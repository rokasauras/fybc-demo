import { FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { recommendations, treatments, type Treatment, type TreatmentCategory } from '../data'

type Modal = 'finder' | 'booking' | 'detail' | null

const categories: { key: TreatmentCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'hydration', label: 'Hydration' },
  { key: 'lift', label: 'Lifting' },
  { key: 'age', label: 'Anti-ageing' },
  { key: 'clean', label: 'Cleansing' },
]

export default function WebsitePage() {
  const assetBase = import.meta.env.BASE_URL
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState<TreatmentCategory | 'all'>('all')
  const [modal, setModal] = useState<Modal>(null)
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(treatments[0])
  const [finderResult, setFinderResult] = useState<Treatment | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)

  const filteredTreatments = useMemo(
    () => (filter === 'all' ? treatments : treatments.filter((t) => t.category.includes(filter))),
    [filter],
  )

  const openBooking = (treatment?: Treatment) => {
    if (treatment) setSelectedTreatment(treatment)
    setBookingComplete(false)
    setModal('booking')
  }

  const runFinder = (goal: TreatmentCategory) => {
    const result = treatments.find((t) => t.id === recommendations[goal].treatmentId)!
    setFinderResult(result)
    setModal('finder')
  }

  const submitBooking = (event: FormEvent) => {
    event.preventDefault()
    setBookingComplete(true)
  }

  return (
    <div className="site-shell">
      <div className="topbar">Award-winning Guinot skincare in Fulham · Personalised by Mona</div>
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#top" aria-label="Forever Young Beauty Clinic home">
            <span className="brand-mark">FY</span>
            <span className="brand-text">Forever Young <small>BEAUTY CLINIC</small></span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#treatments" onClick={() => setMenuOpen(false)}>Treatments</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About Mona</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
            <Link className="owner-link" to="/dashboard">Owner demo</Link>
          </nav>
          <div className="nav-actions">
            <button className="button secondary desktop-only" onClick={() => { setFinderResult(null); setModal('finder') }}>Find my facial</button>
            <button className="button primary desktop-only" onClick={() => openBooking()}>Book now</button>
            <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">{menuOpen ? '×' : '☰'}</button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Advanced skincare · Fulham, London</div>
              <h1>Skin that feels <em>like you</em>, only brighter.</h1>
              <p>Results-focused Guinot facials, lifting treatments and personalised skincare from an award-winning beauty specialist. No guesswork — just the right treatment for your skin.</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => openBooking()}>Book a treatment <span>→</span></button>
                <button className="button secondary" onClick={() => { setFinderResult(null); setModal('finder') }}>Help me choose <span>↗</span></button>
              </div>
              <div className="trust-row">
                <div className="trust-item"><span className="trust-dot">★</span><span><strong>4.9</strong> Google rating</span></div>
                <div className="trust-item"><span className="trust-dot">✦</span><span>Guinot Crown Salon</span></div>
                <div className="trust-item"><span className="trust-dot">⌖</span><span>343 Fulham Palace Road</span></div>
              </div>
            </div>
            <div className="hero-media">
              <img className="hero-photo" src={`${assetBase}images/forever-young-facial.jpg`} alt="Forever Young facial treatment" />
              <div className="hero-badge"><div><strong>Award-winning skincare</strong><span>Personalised by Mona</span></div></div>
            </div>
          </div>
        </section>

        <section className="proof-strip section-compact">
          <div className="container proof-grid">
            <div className="proof"><strong>20+ years</strong><span>of customer relationships</span></div>
            <div className="proof"><strong>Guinot Crown Salon</strong><span>recognised in 2022 & 2023</span></div>
            <div className="proof"><strong>Regional award winner</strong><span>specialist-led treatments</span></div>
            <div className="proof"><strong>Bespoke care</strong><span>your skin, not a template</span></div>
          </div>
        </section>

        <section className="goal-section" id="goals">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">Start with your skin</div><h2>What would you like to improve?</h2></div>
              <p>You do not need to know the name of a Guinot treatment. Tell us what you want from your skin and we’ll guide you to the best match.</p>
            </div>
            <div className="goal-grid">
              {(Object.keys(recommendations) as TreatmentCategory[]).map((goal) => (
                <button className="goal-card" key={goal} onClick={() => runFinder(goal)}>
                  <span className="goal-icon">{goal === 'hydration' ? '◌' : goal === 'lift' ? '↟' : goal === 'age' ? '✧' : '≈'}</span>
                  <h3>{recommendations[goal].title}</h3>
                  <p>{recommendations[goal].copy}</p>
                  <span className="text-link">See my options →</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="signature">
          <div className="container signature-grid">
            <div className="image-stack">
              <div className="image-main"><img className="shop-photo" src={`${assetBase}images/banana-beauty-lab-storefront.jpg`} alt="Banana Beauty Lab storefront at 343 Fulham Palace Road" /></div>
              <div className="image-small"><img src={`${assetBase}images/guinotdoctor.png`} alt="Guinot skincare consultation and professional products" /></div>
            </div>
            <div className="signature-copy">
              <div className="eyebrow">The Forever Young approach</div>
              <h2>Luxury treatment. Clinical thinking. Personal care.</h2>
              <p>Every facial starts with the person in front of us. Your treatment is selected and adjusted around your skin’s condition, your goals and how you want to feel when you leave.</p>
              <ul className="tick-list">
                <li>Skin assessment before treatment</li><li>Professional Guinot protocols</li><li>Advanced lifting & hydration options</li><li>Product advice without pressure</li><li>Options for sensitive skin</li><li>Clear treatment plan when useful</li>
              </ul>
              <button className="button primary" onClick={() => { setFinderResult(null); setModal('finder') }}>Find the right facial</button>
            </div>
          </div>
        </section>

        <section className="treatments-section" id="treatments">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">Popular Guinot facials</div><h2>Choose by result, not jargon.</h2></div>
              <p>The full menu can grow behind this page, while the main journey stays focused on treatments customers can understand quickly.</p>
            </div>
            <div className="filter-row">
              {categories.map((category) => <button key={category.key} className={`filter-btn ${filter === category.key ? 'active' : ''}`} onClick={() => setFilter(category.key)}>{category.label}</button>)}
            </div>
            <div className="treatment-grid">
              {filteredTreatments.map((treatment) => (
                <article className="treatment-card" key={treatment.id}>
                  <div className={`treatment-visual visual-${treatment.category[0]}`}><span className="tag">{treatment.tag}</span></div>
                  <div className="treatment-body">
                    <h3>{treatment.name}</h3><p>{treatment.intro}</p>
                    <div className="meta"><span>{treatment.duration}</span><strong>{treatment.id === 'bespoke-facial' ? `From £${treatment.price}` : `£${treatment.price}`}</strong></div>
                    <div className="card-actions">
                      <button onClick={() => { setSelectedTreatment(treatment); setModal('detail') }}>Details</button>
                      <button className="book" onClick={() => openBooking(treatment)}>Book</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey-section">
          <div className="container journey-grid">
            <div>
              <div className="eyebrow">Beyond one appointment</div>
              <h2>A skincare relationship, not a one-off transaction.</h2>
              <p>Future customer accounts can bring treatment history, skin goals, home-care recommendations, loyalty rewards and product refills into one simple place.</p>
              <div className="journey-actions"><Link className="button primary" to="/account">Preview customer account</Link><Link className="button secondary" to="/dashboard">Preview owner dashboard</Link></div>
            </div>
            <div className="account-preview">
              <div className="preview-top"><span className="mini-logo">FY</span><span>Good afternoon, Sophie</span><span className="status-pill">Gold member</span></div>
              <div className="skin-score"><span>Skin plan</span><strong>Hydration + radiance</strong><small>Next recommended treatment in 12 days</small></div>
              <div className="preview-cards"><div><span>Next appointment</span><strong>18 Sep · 14:30</strong><small>Hydra Summum</small></div><div><span>Product refill</span><strong>6 days</strong><small>Longue Vie Cellulaire</small></div></div>
              <div className="progress-line"><span style={{ width: '74%' }} /></div>
              <small>£28 until your next £10 loyalty reward</small>
            </div>
          </div>
        </section>

        <section className="review-section" id="reviews">
          <div className="container">
            <div className="review-head"><div><div className="eyebrow">Client feedback</div><h2>Results people come back for.</h2></div><div className="rating">4.9 ★<small>Google rating</small></div></div>
            <div className="review-grid">
              <article className="review-card"><div className="stars">★★★★★</div><blockquote>“I saw the effects immediately. Mona is super friendly, highly professional and knowledgeable.”</blockquote><footer>Maddalena · Google review</footer></article>
              <article className="review-card"><div className="stars">★★★★★</div><blockquote>“The facials are amazing — they know how to tailor the treatment to what my skin needs.”</blockquote><footer>Sara · Google review</footer></article>
              <article className="review-card"><div className="stars">★★★★★</div><blockquote>“Since that facial I have had so many compliments on the smooth and clear appearance of my skin.”</blockquote><footer>Katie · Google review</footer></article>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about-grid">
            <div className="portrait"><img src="https://images.pexels.com/photos/3736306/pexels-photo-3736306.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Placeholder for Mona portrait" /></div>
            <div className="about-copy">
              <div className="eyebrow">Meet your specialist</div><h2>Personal skincare, led by Mona.</h2>
              <p>Forever Young has long-standing relationships with customers in Fulham. The new digital experience should make that personal expertise obvious and turn decades of trust into a modern growth engine.</p>
              <div className="award-box"><strong>Guinot Crown Salon</strong><span>Award recognition in 2022 & 2023 · Regional Beauty Therapist of the Year</span></div>
              <button className="button primary" onClick={() => openBooking()}>Book with Mona</button>
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="container faq-wrap"><div className="eyebrow">Before you book</div><h2>Questions, answered.</h2>
            <details><summary>Which facial is right for me?</summary><p>Use the facial finder as a starting point. If you are unsure, choose the bespoke option and the treatment can be adapted after a skin assessment.</p></details>
            <details><summary>How often should I have a facial?</summary><p>The ideal frequency depends on your skin, goals and treatment type. A personalised plan can be recommended after your appointment.</p></details>
            <details><summary>Can I build a longer-term skincare plan?</summary><p>Yes. The customer account concept in this MVP is designed for treatment history, home-care recommendations, scheduled follow-ups and loyalty.</p></details>
          </div>
        </section>

        <section className="location" id="visit"><div className="location-grid"><div className="map-card"><div className="pin" /></div><div className="location-copy"><div className="eyebrow">Visit Forever Young</div><h2>Skincare in the heart of Fulham.</h2><p>Private, personalised treatments from Banana Beauty Space on Fulham Palace Road.</p><div className="location-list"><div><strong>Address</strong><br />343 Fulham Palace Road, Fulham, London SW6 6TD</div><div><strong>Call</strong><br />07594 572 765</div><div><strong>Email</strong><br />mona@foreveryoungbeautyclinic.co.uk</div></div><button className="button primary" onClick={() => openBooking()}>Book an appointment</button></div></div></section>
      </main>

      <footer className="site-footer"><div className="container"><div className="footer-grid"><div><div className="footer-brand">Forever Young Beauty Clinic</div><p>Award-winning, personalised skincare in Fulham. A digital experience designed around trust, retention and long-term customer relationships.</p></div><div><div className="footer-label">Explore</div><div className="footer-links"><a href="#treatments">Treatments</a><a href="#about">About Mona</a><Link to="/account">My account</Link></div></div><div><div className="footer-label">Business demo</div><div className="footer-links"><Link to="/dashboard">Owner dashboard</Link><span>CRM · Loyalty · Follow-ups</span><span>Product subscriptions</span></div></div></div><div className="copyright"><span>© 2026 Forever Young Beauty Clinic · React MVP concept</span><span>Privacy · Terms · Accessibility</span></div></div></footer>

      <button className="mobile-cta" onClick={() => openBooking()}>Book a treatment</button>

      {modal && <div className="modal open" onMouseDown={(e) => { if (e.currentTarget === e.target) setModal(null) }}>
        <div className="modal-card">
          <button className="modal-close" onClick={() => setModal(null)}>×</button>
          {modal === 'finder' && <>
            <div className="eyebrow">30-second facial finder</div><h2>What matters most to you?</h2><p>Choose your main goal. This can later become a richer questionnaire or AI-guided consultation.</p>
            <div className="quiz-options">{(Object.keys(recommendations) as TreatmentCategory[]).map((goal) => <button className="quiz-option" key={goal} onClick={() => runFinder(goal)}>{recommendations[goal].title}<small>{recommendations[goal].copy}</small></button>)}</div>
            {finderResult && <div className="recommendation show"><div className="eyebrow">Your suggested starting point</div><h3>{finderResult.name}</h3><p>{finderResult.intro}</p><strong>{finderResult.duration} · £{finderResult.price}</strong><button className="button primary" onClick={() => openBooking(finderResult)}>Book {finderResult.name}</button></div>}
          </>}
          {modal === 'detail' && <><div className="eyebrow">Treatment overview</div><h2>{selectedTreatment.name}</h2><p>{selectedTreatment.detail}</p><button className="button primary modal-action" onClick={() => openBooking(selectedTreatment)}>Book this treatment</button></>}
          {modal === 'booking' && <><div className="eyebrow">Simple booking flow</div><h2>Book {selectedTreatment.name}</h2><p>Production version: live availability, authenticated customer details and a booking provider/payment integration.</p><form className="booking-form" onSubmit={submitBooking}><label className="full">Treatment<select value={selectedTreatment.id} onChange={(e) => setSelectedTreatment(treatments.find((t) => t.id === e.target.value)!)}>{treatments.map((t) => <option value={t.id} key={t.id}>{t.name}</option>)}</select></label><label>Preferred date<input type="date" required /></label><label>Preferred time<select><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><label>First name<input placeholder="Your name" required /></label><label>Mobile<input placeholder="07…" required /></label><button className="button primary full" type="submit">Continue to availability →</button></form><div className="prototype-note">Demo only — this React MVP does not send or store personal information.</div>{bookingComplete && <div className="success-note">Prototype complete ✓ · In AWS this becomes a real lead/customer event.</div>}</>}
        </div>
      </div>}
    </div>
  )
}
