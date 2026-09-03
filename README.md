# NandoStore

Portal estático para divulgação dos aplicativos, jogos e e-books de PB. Fernando Saldanha. Construído com React e Vite, sem backend ou login, com dados separados para facilitar uma futura integração com API e painel administrativo.

## Instalação

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

## Build e preview

```bash
npm run build
npm run preview
```

## Publicação no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto para a branch `main`.
2. No repositório, abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **GitHub Actions** como source.
4. Faça push das alterações. O workflow `.github/workflows/deploy.yml` instala as dependências, gera `dist` e publica automaticamente.
5. Em um repositório de projeto, o endereço será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O Vite usa `base: './'` e a navegação usa hash (`#/apps`, `#/ebooks`), então os links e recarregamentos são compatíveis com hospedagem estática.

## Onde cadastrar conteúdo

- `src/data/apps.js`: aplicativos e jogos.
- `src/data/ebooks.js`: e-books, incluindo campos de compra, PDF, amostra, ISBN e editora.
- `src/data/categories.js`: filtros do catálogo.
- `public/images/apps/`: ícones e screenshots reais.
- `public/images/ebooks/`: capas, PDFs e amostras.

Os campos ainda não informados aparecem como **Pendente** ou **Descrição pendente** sem quebrar a interface. Substitua os campos vazios pelos caminhos relativos dos arquivos, por exemplo `./images/apps/meu-icone.png`.

## Recursos incluídos

- Página inicial com destaques, recentes, jogos e e-book.
- Catálogos filtráveis de aplicativos, jogos e e-books.
- Pesquisa dinâmica por nome, categoria e palavras-chave.
- Página de detalhes com links externos e estado de informação ausente.
- Tema claro/escuro persistido em `localStorage`.
- Layout responsivo, foco visível, HTML semântico e textos alternativos.
- SEO básico, `robots.txt`, `sitemap.xml` editável e favicon.

O sitemap contém placeholders para usuário e repositório: atualize `public/sitemap.xml` antes da publicação.
