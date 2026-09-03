// Padroniza o cabeçalho das seções e evita que cada página repita a mesma
// estrutura de título, identificação e ação opcional.
export default function Section({ title, kicker, children, action }) {
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{action}</div>{children}</section>
}
