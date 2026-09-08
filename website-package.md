# Website Package

## File tree and routes
One-page site (âncoras, sem rotas separadas), pt-BR único:
```
v5/
├── index.html
├── styles.css
├── script.js
├── sitemap.xml
├── robots.txt
├── README.md
└── assets/img/
    ├── hero-1.jpg, hero-2.jpg, hero-3.jpg
    ├── escritorio.jpg
    ├── portfolio/ (sala-1/2, cozinha-1/2, banho-1/2, externa-1/2, comercial-1/2)
    └── antes-depois/ (01–03, antes/depois)
```
Âncoras: `#topo`, `#sobre`, `#escritorio`, `#portfolio`, `#antes-depois`, `#onde-atende`, `#contato`.

## Implementation status
HTML semântico (header/main/section/footer, uma única `h1`, `h2` por seção), skip link funcional, CTA consistente ("Agendar consultoria") repetido no header, Escritório e fechamento. Filtro de portfólio, crossfade de hero (desativado em mobile por peso de dados, conforme visual-direction.md), reveal-on-scroll via `IntersectionObserver`, antes/depois com tags sempre visíveis (não dependem de hover para comunicar informação) e toggle por toque. Nenhum `<script type="module">` usado — aprendizado técnico do squad aplicado preventivamente.

**Desvio registrado da direção visual:** os pares "antes/depois" reaproveitam duas fotos já usadas no portfólio (banho-1 e cozinha-1) como lado "depois", em vez de 3–4 pares totalmente exclusivos — decisão para manter o total de imagens baixo (17 arquivos únicos, 5,9 MB) sem comprometer a variedade percebida. Documentado no README.

## SEO by language
Único idioma (pt-BR): title e meta description exclusivos, canonical placeholder (`https://seudominio.com.br/`, marcado para troca), sitemap.xml e robots.txt gerados e reciprocamente consistentes. Sem hreflang (não se aplica — um único idioma). JSON-LD **não incluído propositalmente**: como o site não representa uma entidade real (nome, endereço e telefone são placeholders), publicar `ProfessionalService` schema com dados falsos seria schema enganoso — anti-pattern explícito do squad. Ao customizar para um cliente real, adicionar schema com os dados reais nesse momento.

## Accessibility and responsive tests
Testado via Playwright (servidor local, porta 4173):
- **360×800:** sem overflow horizontal (`scrollWidth === clientWidth`), filtro de portfólio em scroll horizontal, grid 2 colunas, hero com imagem única estática.
- **768×1024:** sem overflow horizontal, grid de portfólio 2 colunas, layout onde-atende ainda em 2 colunas (ajusta para 1 coluna abaixo de 900px conforme CSS).
- **1440×900:** grid 3 colunas, layout desktop completo conforme visual-direction.md.
- Contraste verificado nos tokens (ver visual-direction.md) — texto escuro sobre claro e texto claro sobre escuro em AAA; botão `--accent` com texto escuro em AA (5.2:1).
- Foco visível (`outline: 3px`) implementado em CTAs, filtros e cards de contato.
- `prefers-reduced-motion`: crossfade, reveal e transições desativados via media query dedicada.
- Alt text descritivo em todas as imagens (nenhum "imagem bonita" ou vazio).

## Performance and links
- Peso total de imagens: **5,9 MB** (17 arquivos únicos), bem abaixo dos ~24 MB da referência interna (v3), sem vídeo.
- Console do navegador limpo (0 erros, 0 avisos) após correção do favicon ausente (adicionado como SVG inline em data URI — sem arquivo extra).
- Nenhum link vazio: CTAs de contato (`href="#"`) estão claramente marcados como `PLACEHOLDER` no HTML, não como links quebrados silenciosos.
- Fontes via Google Fonts (`Fraunces`, `Work Sans`) com `preconnect`; única dependência externa do site.
- Sem JavaScript de terceiros, sem CDN de framework (Three.js removido nesta versão, ver visual-direction.md).

## Deployment README
Ver `README.md` nesta mesma pasta: build (nenhum — arquivos estáticos), execução local (`python -m http.server` ou abrir `index.html` direto), hospedagem sugerida (Netlify/Vercel/GitHub Pages/S3), checklist de customização antes de publicar para um cliente real, créditos/licenças de todas as 17 imagens (Pexels, uso livre), e rollback (apontar para outra versão do run ou para a v3 do projeto de referência, que é um site distinto).

## Open issues and client dependencies
- Analytics consentido: não incluído nesta peça de demonstração (não há tráfego real a medir).
- Se esta peça virar site de um cliente real: trocar nome/logo/contato pelos dados reais, trocar fotos de banco pelo portfólio real, e reescrever a seção Antes/depois com transformações reais (a nota "imagens ilustrativas" só faz sentido enquanto for material de demonstração).
- Domínio (`seudominio.com.br`) é placeholder em `index.html`, `sitemap.xml` e `robots.txt` — trocar nos três arquivos juntos ao customizar.

---

# Implementation Approval
Status: APPROVED
Routes and viewport checks: seção única (âncoras) testada em 360, 768 e 1440px via Playwright, sem overflow.
Languages and SEO: pt-BR completo; canonical, sitemap e robots conferidos e consistentes.
Forms and assets: sem formulário (CTAs são links); 17 imagens com alt, origem e licença documentados; placeholders de contato marcados no HTML.
Deployment notes: README aprovado para host estático; domínio, DNS e substituição de placeholders ficam a cargo de quem for customizar para um cliente real.
