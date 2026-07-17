/*
  All content on this page is sample data for the MERIDIAN demo brand.
  Images are self-hosted in /public/images (originally sourced from Unsplash,
  each verified visually before shipping).
*/

export const CAPABILITIES = [
  {
    title: 'Commercial',
    body: 'Offices, retail and mixed-use towers, from excavation to final fit-out.',
    image: '/images/cap-commercial.jpg',
    alt: 'Glass office towers photographed from street level at dusk',
  },
  {
    title: 'Civil & Infrastructure',
    body: 'Earthworks, roads, bridges and utilities that carry a city’s weight.',
    image: '/images/cap-civil.jpg',
    alt: 'Excavators cutting a terraced foundation into open ground',
  },
  {
    title: 'Industrial',
    body: 'Plants, warehouses and logistics hubs engineered for heavy duty cycles.',
    image: '/images/cap-industrial.jpg',
    alt: 'Crew in orange vests tying rebar on a structural deck',
  },
  {
    title: 'Restoration & Retrofit',
    body: 'Structural repair and seismic upgrades for buildings worth keeping.',
    image: '/images/cap-restoration.jpg',
    alt: 'Workers climbing reinforced column cages on a live site',
  },
]

export const PROJECTS = [
  {
    name: 'Meridian One Tower',
    sector: 'Commercial',
    city: 'Karachi',
    year: '2025',
    image: '/images/proj-meridian-one.jpg',
    alt: 'Cluster of high-rise towers disappearing into fog, shot upward',
  },
  {
    name: 'Crescent Medical Campus',
    sector: 'Healthcare',
    city: 'Lahore',
    year: '2023',
    image: '/images/proj-crescent.jpg',
    alt: 'Angular white building facade with a glass atrium under clear sky',
  },
  {
    name: 'Northgate Logistics Hub',
    sector: 'Industrial',
    city: 'Faisalabad',
    year: '2024',
    image: '/images/proj-northgate.jpg',
    alt: 'Concrete frame under construction with orange formwork',
  },
  {
    name: 'Orchard District Residences',
    sector: 'Residential',
    city: 'Islamabad',
    year: '2022',
    image: '/images/proj-orchard.jpg',
    alt: 'Tower cranes rising above a scaffolded high-rise crown',
  },
]

/* Sample figures for the demo brand. */
export const STATS = [
  { value: 214, suffix: '', label: 'Projects delivered' },
  { value: 17, suffix: '', label: 'Years operating' },
  { value: 1.2, suffix: 'M', decimals: 1, label: 'Square metres built' },
  { value: 96, suffix: '%', label: 'Repeat-client rate' },
]

export const PROCESS = [
  {
    digit: '01',
    title: 'Preconstruction',
    body: 'Feasibility, estimating and value engineering settled before a single permit is filed.',
  },
  {
    digit: '02',
    title: 'Engineering',
    body: 'Structural design and BIM coordination resolve clashes on screen, not on site.',
  },
  {
    digit: '03',
    title: 'Construction',
    body: 'Self-performed concrete and steel, with safety audits on every shift.',
  },
  {
    digit: '04',
    title: 'Handover',
    body: 'Commissioning, documentation and a defect-free walkthrough. Keys on schedule.',
  },
]

export const MANIFESTO =
  'Buildings outlive the people who make them. So we estimate honestly, engineer conservatively, and finish every structure as if our name were cast into the concrete.'

export const MANIFESTO_IMAGE = {
  src: '/images/manifesto-frame.jpg',
  alt: 'Black steel space-frame structure lit against a dark sky',
}

export const QUOTE = {
  text: 'Meridian gave us a real schedule, then beat it by three weeks. I have never seen a contractor run subcontractors this cleanly.',
  name: 'Amara Siddiqui',
  role: 'Development Director, Crescent Health Trust',
}
