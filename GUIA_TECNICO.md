# Guia técnico do NandoStore

Este documento descreve a estrutura e os fluxos do código do NandoStore. O projeto é um catálogo estático feito com React e Vite: não possui API, banco de dados, autenticação ou área administrativa. O conteúdo publicado é mantido nos módulos de dados em `src/data/`.

## Visão geral

O navegador carrega `index.html`, que monta `src/main.jsx`. O ponto de entrada aplica `StrictMode`, carrega os estilos globais e renderiza `App`. O provider de idioma envolve a aplicação; dentro dele, `AppContent` mantém o estado global, interpreta o hash da URL e escolhe qual página exibir.

```text
index.html
└── src/main.jsx
    └── LanguageProvider
        └── App (src/App.jsx)
            ├── Header
            ├── Home, Catalog, Detail, About ou SearchResults
            ├── FeedbackModal
            └── footer
```

## Mapa de arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Documento HTML inicial, metadados de compartilhamento e elemento `#root` do React. |
| `vite.config.js` | Ativa o plugin React, define caminhos relativos para hospedagem estática e polling para observar arquivos. |
| `package.json` | Dependências e comandos `dev`, `build`, `lint` e `preview`. |
| `src/main.jsx` | Carrega estilos globais, ativa `StrictMode` e monta `App`. |
| `src/App.jsx` | Provider, estado global, navegação por hash, armazenamento local, seleção rotativa do banner e composição das páginas. |
| `src/App.css` | Tokens visuais, componentes, layouts, estados e regras responsivas da aplicação. |
| `src/index.css` | Fontes, cores globais, reset de box sizing e estilos básicos de elementos. |
| `src/components/Header.jsx` | Navegação, busca, seletor de idioma e alternância de tema. |
| `src/components/Section.jsx` | Cabeçalho reutilizável de seção com título, identificação e ação opcional. |
| `src/components/ProductCard.jsx` | Card de aplicativo ou jogo, incluindo resumo, continuação, metadados e links externos. |
| `src/components/EbookCard.jsx` | Card de e-book com título localizado, capa, autor e idioma original. |
| `src/components/MediaPlaceholder.jsx` | Imagem de produto ou placeholder quando a imagem falta ou falha. |
| `src/components/LinkButton.jsx` | Link externo estilizado; não renderiza elemento quando o destino está vazio. |
| `src/components/ProjectShowcase.jsx` | Exibição de projetos técnicos e estado vazio para listas sem demonstrações. |
| `src/components/FeedbackModal.jsx` | Modal de compartilhamento e avaliação, com Web Share API e fallback para copiar URL. |
| `src/pages/Home.jsx` | Página inicial; separa apps e e-books nos destaques e recentes e mostra projetos. |
| `src/pages/Catalog.jsx` | Catálogo de apps/jogos com filtro local ou catálogo de e-books. |
| `src/pages/Detail.jsx` | Detalhe de app, jogo ou e-book, incluindo metadados e ações disponíveis. |
| `src/pages/SearchResults.jsx` | Pesquisa global e apresentação dos resultados usando os cards existentes. |
| `src/pages/About.jsx` | Perfil, biografia localizada, foto e links de contato com ícones. |
| `src/data/apps.js` | Registros de aplicativos e jogos. |
| `src/data/ebooks.js` | Registros de e-books, traduções de títulos e destinos de venda. |
| `src/data/profile.js` | Biografia, versões por idioma, foto e redes/contatos do perfil. |
| `src/data/categories.js` | Opções disponíveis no filtro de apps e jogos. |
| `src/data/projects.js` | Listas de automações contábeis e sites demonstráveis. |
| `src/i18n/languageContext.js` | Instância do contexto compartilhado de idioma. |
| `src/i18n/LanguageContext.jsx` | Provider, dicionários, persistência do idioma e função de tradução. |
| `src/i18n/useLanguage.js` | Hook de acesso ao idioma e às traduções. |
| `src/i18n/languages.js` | Códigos e nomes apresentados no seletor. |
| `src/i18n/additionalTranslations.js` | Dicionários complementares de espanhol, alemão, russo e francês. |
| `src/utils/catalog.js` | Funções puras para unir, pesquisar, filtrar, localizar títulos e ordenar itens. |

## Navegação e estado global

O roteamento usa o fragmento da URL (`window.location.hash`), adequado para hospedagem estática sem configuração de servidor. As seções são `#/home`, `#/apps`, `#/ebooks` e `#/about`; os detalhes usam `#/app/{id}` ou `#/ebook/{id}`. Ao detectar `hashchange`, `App` atualiza a rota e localiza o registro correspondente em `catalogItems`.

`navigate` limpa a busca e a seleção antes de trocar de seção. `openItem` cria o hash do detalhe e volta o scroll ao topo. O botão de voltar do detalhe navega para a página inicial.

As preferências e estados simples são persistidos em `localStorage`:

| Chave | Uso |
| --- | --- |
| `nandostore-language` | Idioma selecionado. |
| `nandostore-theme` | Tema claro ou escuro. |
| `nandostore-visits` | Contador de visitas. |
| `nandostore-feedback-seen` | Impede reabrir automaticamente o primeiro modal de feedback. |
| `nandostore-banner-book` | Identificador da capa exibida anteriormente no banner, para alterná-la na próxima recarga. |

O modal de feedback usa `navigator.share` quando disponível. Em navegadores sem essa API, tenta copiar a URL com `navigator.clipboard` e mostra confirmação local.

## Contrato dos dados

### Apps e jogos

Cada entrada em `apps.js` usa `id` estável para navegação e `type` (`app` ou `game`) para identificar a categoria. `name` e `description` são o nome e a chamada curta exibida no card e no início do detalhe. `fullDescription` contém o restante do texto. No card, textos longos são cortados para a prévia; “Continuar lendo...” abre o detalhe. `category`, `platform`, `status`, `version`, `size`, `createdAt` e `updatedAt` alimentam filtros ou informações do detalhe.

`icon` aponta para um arquivo em `public/images/apps/`; `screenshots` é uma lista de imagens. `googlePlay`, `download`, `github` e `website` são destinos externos opcionais. `featured` controla a inclusão em destaques. Campos sem valor devem permanecer vazios até haver informação confirmada; os componentes mostram o estado apropriado ou ocultam uma ação sem destino.

### E-books

Cada entrada em `ebooks.js` usa `type: 'ebook'`, `id`, `title` e `titleTranslations`. O mapa `titleTranslations` aceita os códigos de idioma da interface; se não houver título traduzido, a tela usa `title` original. `author`, `description`, `synopsis` e `category` alimentam os cards e a página de detalhes. `cover` aponta para `public/images/ebooks/`.

`format`, `platform`, `price`, `purchaseLink`, `pdf` e `sample` representam formato, loja, preço e destinos disponíveis. Atualmente, o botão de compra usa `purchaseLink`, e o botão de amostra só aparece quando `sample` está preenchido. O modelo possui os campos `pdf` e `sample`, mas não há um leitor iframe ou mecanismo de proteção de PDF implementado. Arquivos colocados em `public/` são copiados para a saída pública e podem ser acessados diretamente; não coloque ali um PDF completo de venda. `featured` e as datas controlam destaques e ordenação.

### Perfil e projetos

`profile.js` contém `name`, `biography`, `biographyTranslations`, `photo`, `socialLinks` e `professionalLinks`. Cada link tem `label` e `href`; o `label` deve corresponder a um ícone registrado em `profileIcons` no componente `About`.

`projects.js` mantém duas listas independentes. Cada projeto demonstrável pode conter `id`, `name`, `description`, `technologies`, `repository`, `demo` e `image`. As listas vazias exibem um estado orientativo, sem criar projetos fictícios.

`categories.js` define os IDs usados nos botões de filtro. `filterApps` compara o `type` do registro com esses IDs; o filtro `all` inclui todos os apps e jogos.

## Internacionalização

Os códigos aceitos são `pt-BR`, `en`, `es`, `de`, `ru` e `fr`. `LanguageProvider` lê o idioma salvo, fornece `language`, `setLanguage`, `languages` e `t`, salva as trocas no navegador e atualiza `document.documentElement.lang`.

O dicionário principal de português e inglês e as extensões adicionais são mesclados no provider. A função `t(chave)` procura primeiro no idioma ativo, depois em inglês e, se ainda não houver valor, devolve a própria chave. Rótulos adicionados dinamicamente, como idioma original, plataforma, conteúdo não publicado e continuação de leitura, também precisam cobrir todos os idiomas suportados.

O hook `useLanguage` deve ser chamado somente dentro de `LanguageProvider`; fora dele, lança um erro explícito. Para acrescentar um idioma, atualize `languages.js`, forneça o dicionário correspondente e inclua as traduções dinâmicas usadas pelo provider.

## Funções do catálogo

- `allItems(apps, ebooks)` combina os dois conjuntos para pesquisa e resolução de detalhes.
- `getEbookTitle(item, language)` escolhe o título localizado ou retorna o original.
- `searchItems(items, query)` remove espaços externos, ignora diferenças entre maiúsculas/minúsculas e pesquisa os valores textuais, incluindo traduções de título.
- `filterApps(apps, filter)` filtra por `type` sem alterar o array recebido.
- `sortByRecent(items)` cria uma cópia ordenada por `updatedAt`, usando `createdAt` como alternativa; itens sem data ficam depois dos datados.

Essas funções não dependem de React e podem ser testadas isoladamente.

## Estilos e responsividade

`index.css` define as fontes DM Sans e Space Grotesk, o reset básico e o comportamento global de elementos. `App.css` concentra os tokens de cor em variáveis CSS, incluindo valores alternativos para o tema escuro. Os estilos são organizados por cabeçalho, conteúdo, cards, catálogo, detalhes, perfil, demonstrações e modal.

As regras em `max-width: 800px` adaptam os layouts principais para tablet; `max-width: 560px` ajusta a página Sobre; `max-width: 480px` reorganiza cabeçalho, cards e grade para celular. O seletor de idioma tem largura mínima fixa para não cortar nomes como “Português (Brasil)”. Ao alterar uma regra responsiva, verifique que imagens mantêm proporção e que os controles não criam rolagem horizontal.

## Comandos e publicação

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

O build gera a pasta `dist/`, que não é fonte editável. Para publicar no GitHub Pages, o caminho relativo `base: './'` do Vite e a navegação por hash evitam depender de rotas configuradas no servidor. O processo de publicação está descrito na seção correspondente do README.