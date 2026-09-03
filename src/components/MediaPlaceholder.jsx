import { useState } from 'react'

// Renderiza a imagem cadastrada ou um estado visual previsível quando o arquivo
// ainda não existe. Assim, um cadastro incompleto nunca quebra o layout.
export default function MediaPlaceholder({ item, large = false }) {
  const image = item.icon || item.cover
  const label = item.name || item.title
  const [imageFailed, setImageFailed] = useState(false)

  if (image && !imageFailed) {
    return <img className={large ? 'item-art large' : 'item-art'} src={image} alt={label} onError={() => setImageFailed(true)} />
  }

  return <div className={`placeholder ${large ? 'large' : ''}`} aria-label={`Imagem pendente de ${label}`}><span>{label.slice(0, 1)}</span></div>
}
