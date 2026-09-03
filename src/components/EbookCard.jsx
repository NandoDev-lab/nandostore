import MediaPlaceholder from './MediaPlaceholder'

// Card específico para livros, separado do card de apps porque seus campos
// principais (autor e formato) pertencem a outro domínio de dados.
export default function EbookCard({ item, onOpen }) {
  return <article className="product-card ebook-card">
    <MediaPlaceholder item={item} />
    <div className="product-copy">
      <span className="eyebrow">E-book</span>
      <h3>{item.title}</h3>
      <p>{item.author}</p>
      <div className="card-meta"><span>{item.category || 'Categoria pendente'}</span><span>Digital</span></div>
      <button className="text-button" onClick={() => onOpen(item)}>Ler detalhes <span aria-hidden="true">↗</span></button>
    </div>
  </article>
}
