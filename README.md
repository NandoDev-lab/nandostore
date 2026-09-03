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
- `src/data/profile.js`: nome, biografia, foto e links da página Sobre.
- `src/data/categories.js`: filtros do catálogo.
- `public/images/apps/`: ícones e screenshots reais.
- `public/images/ebooks/`: capas, PDFs e amostras.

Os campos ainda não informados aparecem como **Pendente** ou **Descrição pendente** sem quebrar a interface. Substitua os campos vazios pelos caminhos relativos dos arquivos, por exemplo `./images/apps/meu-icone.png`.

## Como atualizar imagens

### Imagens dos aplicativos

1. Coloque o ícone e as screenshots em `public/images/apps/`.
2. Abra `src/data/apps.js` e preencha `icon` com o caminho do ícone.
3. Preencha `screenshots` com uma lista dos caminhos das telas.

Exemplo:

```js
icon: './images/apps/esboco-facil-icone.png',
screenshots: [
	'./images/apps/esboco-facil-tela-01.png',
	'./images/apps/esboco-facil-tela-02.png',
],
```

Use o mesmo padrão para qualquer aplicativo ou jogo. Os caminhos começam com `./` porque o site é publicado em um subdiretório do GitHub Pages.

### Capa do e-book

Coloque a capa em `public/images/ebooks/` e preencha o campo `cover` no objeto correspondente em `src/data/ebooks.js`:

```js
cover: './images/ebooks/gatilhos-do-pecado-capa.png',
```

### Foto e conteúdo da página Sobre

Coloque a foto em `public/images/` e edite `src/data/profile.js`:

```js
export const profile = {
	name: 'PB. Fernando Saldanha',
	biography: 'Sua biografia aqui.',
	photo: './images/fernando-saldanha.png',
	socialLinks: [],
	professionalLinks: [],
}
```

Enquanto `photo` ou `biography` estiverem vazios, a página exibirá o placeholder e o aviso correspondente. Depois de alterar arquivos, execute `npm run build` e faça `git add .`, `git commit` e `git push` para publicar.

## Recursos incluídos

- Página inicial com destaques, recentes, jogos e e-book.
- Catálogos filtráveis de aplicativos, jogos e e-books.
- Pesquisa dinâmica por nome, categoria e palavras-chave.
- Página de detalhes com links externos e estado de informação ausente.
- Tema claro/escuro persistido em `localStorage`.
- Layout responsivo, foco visível, HTML semântico e textos alternativos.
- SEO básico, `robots.txt`, `sitemap.xml` editável e favicon.
- Seletor instantâneo de idioma entre Português (Brasil), English, Español, Deutsch, Русский e Français, persistido no navegador.

## Idiomas

O seletor de idioma fica no cabeçalho. A troca acontece instantaneamente, sem recarregar a página, e a preferência é salva em `localStorage`. Os seis idiomas disponíveis possuem dicionário próprio para a interface.

As traduções principais ficam em `src/i18n/LanguageContext.jsx` e as traduções adicionais em `src/i18n/additionalTranslations.js`. Para adicionar outro idioma, crie uma nova chave com o mesmo conjunto de chaves e adicione uma opção em `src/i18n/languages.js`. O conteúdo dos projetos e os nomes próprios continuam nos arquivos de dados, independentemente do idioma da interface.

Novos idiomas podem ser adicionados sem alterar as páginas ou os componentes. Para obter tradução automática de idiomas adicionais, seria necessário integrar um serviço externo de tradução.

O sitemap contém placeholders para usuário e repositório: atualize `public/sitemap.xml` antes da publicação.
