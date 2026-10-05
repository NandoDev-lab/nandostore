/** Renderiza uma ação externa somente quando há um destino utilizável. */
export default function LinkButton({ href, children }) {
  if (!href) return null

  return <a className="button secondary" href={href} target="_blank" rel="noreferrer">{children}</a>
}
