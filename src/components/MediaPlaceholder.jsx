import { useState } from 'react'

// Renderiza icon/cover e troca para uma inicial se o arquivo estiver ausente ou
// falhar no carregamento. `label` permite usar o título já localizado pelo pai.
export default function MediaPlaceholder({ item, large = false, label: labelOverride }) {
  const image = item.icon || item.cover
  const label = labelOverride || item.name || item.title
  const [imageFailed, setImageFailed] = useState(false)

  if (image && !imageFailed) {
    return <img className={large ? 'item-art large' : 'item-art'} src={image} alt={label} onError={() => setImageFailed(true)} />
  }

  return <div className={`placeholder ${large ? 'large' : ''}`} aria-label={`Imagem pendente de ${label}`}><span>{label.slice(0, 1)}</span></div>
}
