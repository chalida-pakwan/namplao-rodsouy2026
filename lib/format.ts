export function formatPriceTHB(n: number) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(n);
}
export function formatNumber(n: number) {
  return new Intl.NumberFormat('th-TH').format(n);
}
export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-').replace(/(^-|-$)/g, '');
}
