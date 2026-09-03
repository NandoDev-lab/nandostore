import MediaPlaceholder from './MediaPlaceholder'

// Card compartilhado por aplicativos e jogos. O callback onOpen mantém a
// navegação fora do componente, facilitando reutilização e testes.
export default function ProductCard({ item, onOpen }) {
  const label = item.type === 'game' ? 'Jogo' : 'Aplicativo'
  return <article className="product-card">
    {item.status === 'Em construção' && <div className="construction-banner">Em construção</div>}
    <MediaPlaceholder item={item} />
    <div className="product-copy">
      <span className="eyebrow">{label}</span>
      <h3>{item.name}</h3>
      <p>{item.description || 'Descrição pendente'}</p>
      <div className="card-meta"><span>{item.category || 'Categoria pendente'}</span><span>{item.platform || 'Plataforma pendente'}</span></div>
      <button className="text-button" onClick={() => onOpen(item)}>Ver detalhes <span aria-hidden="true">↗</span></button>
    </div>
  </article>
}
