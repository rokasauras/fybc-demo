export type TreatmentCategory = 'hydration' | 'lift' | 'age' | 'clean'

export type Treatment = {
  id: string
  name: string
  category: TreatmentCategory[]
  tag: string
  duration: string
  price: number
  intro: string
  detail: string
}

export const treatments: Treatment[] = [
  {
    id: 'hydra-summum',
    name: 'Hydra Summum',
    category: ['hydration'],
    tag: 'Best for glow',
    duration: '50 minutes',
    price: 108,
    intro: 'Deep hydration with hyaluronic acid, massage and a soothing mask for skin that feels plumper, smoother and more radiant.',
    detail: 'A hydration-led Guinot facial for dryness, tightness and dullness. The experience combines professional products, massage and a soothing mask to support a fresh, comfortable glow.',
  },
  {
    id: 'hydradermie-lift-1000',
    name: 'Hydradermie Lift 1000',
    category: ['lift'],
    tag: 'Lift & tone',
    duration: '50 minutes',
    price: 125,
    intro: 'Advanced facial muscle stimulation and hydration designed to tone facial features and leave skin looking visibly firmer.',
    detail: 'An advanced lifting and toning treatment combining hydration with facial muscle stimulation. Ideal when firmness and facial contour are the main priorities.',
  },
  {
    id: 'hydradermie-1000',
    name: 'Hydradermie 1000',
    category: ['hydration', 'age'],
    tag: 'Advanced facial',
    duration: '50 minutes',
    price: 125,
    intro: 'Concentrated hyaluronic acid and vitamins support hydration, radiance and softer-looking fine lines.',
    detail: 'A technology-led facial focused on hydration, radiance and softer-looking fine lines using concentrated serum and a thermal applicator.',
  },
  {
    id: 'age-summum',
    name: 'Age Summum',
    category: ['age'],
    tag: 'Anti-ageing',
    duration: '50 minutes',
    price: 125,
    intro: 'Vitamin C, hyaluronic acid and pro-collagen focused on fine lines, firmness, dark spots and loss of radiance.',
    detail: 'A targeted anti-ageing facial positioned around firmness, fine lines, uneven tone and radiance.',
  },
  {
    id: 'hydraclean',
    name: 'Hydraclean',
    category: ['clean'],
    tag: 'Great first facial',
    duration: '30 minutes',
    price: 59,
    intro: 'A focused deep-cleansing treatment to help remove excess oil and impurities, leaving skin feeling cleaner and brighter.',
    detail: 'A short deep-cleansing treatment for impurities and excess oil. A simple, accessible first facial for congested skin.',
  },
  {
    id: 'bespoke-facial',
    name: 'Bespoke Facial',
    category: ['hydration', 'lift', 'age', 'clean'],
    tag: 'Not sure? Start here',
    duration: 'Personalised',
    price: 71,
    intro: 'Begin with a skin assessment and let Mona tailor the treatment to your skin’s condition and priorities on the day.',
    detail: 'A consultation-led facial where the treatment approach is chosen after assessing the client’s skin — ideal when you are unsure what to book.',
  },
]

export const recommendations: Record<TreatmentCategory, { title: string; copy: string; treatmentId: string }> = {
  hydration: { title: 'Hydration & glow', copy: 'For dryness, tightness, dullness or skin that simply looks tired.', treatmentId: 'hydra-summum' },
  lift: { title: 'Lift & firmness', copy: 'For skin that feels less firm, facial contours and a visibly lifted finish.', treatmentId: 'hydradermie-lift-1000' },
  age: { title: 'Lines & ageing', copy: 'Target fine lines, loss of radiance, uneven tone and signs of ageing.', treatmentId: 'age-summum' },
  clean: { title: 'Breakouts & clarity', copy: 'For congestion, excess oil, impurities or a deep skin refresh.', treatmentId: 'hydraclean' },
}

export type Customer = {
  id: string
  initials: string
  name: string
  email: string
  lastVisit: string
  nextAction: string
  value: number
  segment: string
}

export const customers: Customer[] = [
  { id: 'C-1001', initials: 'SW', name: 'Sophie Walker', email: 'sophie@example.com', lastVisit: '29 Aug', nextAction: 'Skin check-in due', value: 1240, segment: 'VIP' },
  { id: 'C-1002', initials: 'AN', name: 'Amelia North', email: 'amelia@example.com', lastVisit: '21 Aug', nextAction: 'Rebook Age Summum', value: 845, segment: 'Repeat' },
  { id: 'C-1003', initials: 'LM', name: 'Leila Martin', email: 'leila@example.com', lastVisit: '12 Aug', nextAction: 'Cream refill in 6 days', value: 690, segment: 'Subscription' },
  { id: 'C-1004', initials: 'ER', name: 'Emma Reed', email: 'emma@example.com', lastVisit: '04 Jul', nextAction: 'Win-back sequence', value: 515, segment: 'At risk' },
  { id: 'C-1005', initials: 'HC', name: 'Hannah Cole', email: 'hannah@example.com', lastVisit: 'Yesterday', nextAction: 'Post-treatment check-in', value: 350, segment: 'New' },
]
