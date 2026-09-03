// Links ausentes são exibidos como estado desabilitado em vez de receber um
// href inválido. Isso comunica claramente o que ainda precisa ser preenchido.
export default function LinkButton({ href, children }) {
  return href ? <a className="button secondary" href={href} target="_blank" rel="noreferrer">{children}</a> : <span className="button disabled">Link pendente</span>
}
