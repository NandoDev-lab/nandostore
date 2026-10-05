/**
 * Agrupa conteúdo sob um cabeçalho editorial consistente.
 * @param {{ title: string, kicker: string, children: import('react').ReactNode, action?: import('react').ReactNode }} props
 */
export default function Section({ title, kicker, children, action }) {
  return <section className="content-section"><div className="section-heading"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{action}</div>{children}</section>
}
