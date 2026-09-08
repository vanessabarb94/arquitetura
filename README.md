# Modelo de Site — Arquitetura e Interiores (peça de demonstração)

## Rodada 2 de ajustes (mesma pasta v5, arquivos atualizados)

A primeira versão desta peça errou a mão ao "genericizar": tirou não só a marca/fotos da Thais (correto), mas também a elegância e o movimento do site original (incorreto) — resultado parecia um template morto, sem apelo comercial. Ajustes desta rodada, a pedido da cliente:

- **Paleta restaurada**: voltou ao creme (`#F4EFE7`) + espresso (`#2B2620`) do site original, agora com acentos suaves em vez de cor viva (argila `#A9835F` e oliva `#8A9174`, no lugar do terracota mais forte da v1 desta pasta).
- **Nome fictício**: "**Traço**" substitui o placeholder `[Nome do Escritório]` — soa como uma marca real (e conversa com a copy "do primeiro traço à obra"), mas não representa nenhum escritório existente.
- **Fundo com parallax responsivo**: um padrão discreto de linhas arquitetônicas atrás do conteúdo (`.bg-motif`) que se move com o mouse e também tem uma deriva lenta contínua quando o mouse fica parado — mesmo princípio da v3 do projeto de referência, sem reaproveitar a implementação.
- **Transição suave entre seções**: as antigas divisas retas de cor (`section-light`/`section-dark` cortando abruptamente) viraram um gradiente de ~96px com uma linha fina central que "se desenha" (anima de 0 a 100% de largura) quando entra na tela.
- **Escritório com blur + glass**: a seção voltou a ter a foto do ambiente ampliada e borrada como fundo, um painel de vidro (`backdrop-filter: blur`) com o texto por cima, e a mesma foto nítida emoldurada ao lado — em vez do bloco de cor sólida simples da v1 desta pasta.
- **Rodapé com o mesmo tratamento de blur**, no lugar do bloco de cor chapada.
- **Crossfade do hero mais lento** (1,8s de transição a cada 4,2s, como no site de referência) para reforçar a sensação de "vivo".

O que **não** voltou (segue como na Rodada 1, por ser identidade real da cliente de referência, não princípio de design): nome/logo reais, fotos da profissional, vídeo do escritório, contatos reais, galeria 3D em Three.js (mantida como grid CSS por leveza/robustez).

## Rodada 3 de ajustes (mesma pasta v5, arquivos atualizados)

A cliente pediu fidelidade ainda maior aos mecanismos exatos do site de referência (v3), não só ao princípio geral:

- **Paleta corrigida**: não é "bege com marrom escuro" — é bege com **verde envelhecido**. As cores de fundo (creme/espresso) são as mesmas da v2 desta pasta, mas agora o acento de destaque em botões, filtros ativos, hover de cards e links é o **verde oliva** (`#4C523C`/`#3A3F2E`), igual ao papel que o oliva cumpre no site de referência — na v2 desta pasta eu tinha usado um tom argila/terracota como acento principal, por engano.
- **Títulos em caixa alta** (`text-transform: uppercase`) em todos os `h1`/`h2`/`h3`.
- **Seção Escritório removida** por completo (markup, CSS e link do menu/rodapé).
- **Linha horizontal de ponta a ponta no header**, embaixo da logo e do botão de consultoria, que "se desenha" (anima de 0 a 100% de largura) 900ms depois do carregamento da página — igual ao `header-rule` do site de referência.
- **Efeito de carregamento da página**: o portal (ver abaixo) e a linha do header agora disparam juntos ao carregar, dando a sensação de "a página está viva assim que abre", não só depois de rolar.
- **Efeito de revelação nos títulos igual ao da referência**: cada letra nasce de baixo pra cima (`translateY(120%) → 0`), com atraso crescente entre uma letra e outra, dentro de uma máscara que corta o excesso (`overflow: hidden` por caractere) — o efeito "split-text-reveal" original, não a versão simplificada (fade + leve deslocamento) que eu tinha usado até a Rodada 2. Toca automaticamente no título do Hero ao carregar, e nos demais títulos ao rolar até eles.
  - **Bug corrigido nesta rodada**: a primeira implementação quebrava palavras no meio da linha (ex.: "CARR" numa linha e "EGA" na próxima), porque cada letra era um bloco independente. Corrigido agrupando as letras de cada palavra num wrapper com `white-space: nowrap`, permitindo quebra de linha só entre palavras.
- **Portal de abertura**: as iniciais "T" (de Traço) aparecem dentro de um quadrado no centro da tela ao carregar, seguram um instante, e então o quadrado "explode" (escala) enquanto dois painéis (esquerdo/direito) deslizam para fora, revelando o site — igual ao mecanismo da referência, com a inicial trocada.

Todos os efeitos respeitam `prefers-reduced-motion` (loader não aparece, textos já vêm revelados, linhas já vêm desenhadas).



Site institucional **genérico**, sem nome, logo ou foto de profissional real — construído pela Aurora Growth Lab como peça de demonstração para prospecção de clientes no nicho de arquitetura/interiores. Reaproveita a estrutura de seções e princípios de UX validados no projeto anterior (`squads/website-creator/output/2026-08-27-architecture-luxury/v3`), sem copiar identidade, fotos ou dados de contato daquele cliente real.

## O que é diferente da v3 (projeto do cliente real)

- **Sem nome/logo real**: wordmark tipográfico placeholder `[Nome do Escritório]`.
- **Sem foto de pessoa**: nenhuma seção usa retrato ou foto de corpo inteiro.
- **Fotos 100% de banco gratuito** (Pexels), sem vínculo com nenhum projeto real — ver tabela de créditos abaixo.
- **Contato com placeholders**: WhatsApp, e-mail e Instagram são todos fictícios, marcados com comentário `PLACEHOLDER` no HTML.
- **Paleta e tipografia próprias** (areia `#EFEAE2` + grafite `#23211E` + terracota `#B5674B`; fontes Fraunces + Work Sans via Google Fonts) — não reaproveita os hex nem as fontes do cliente real.
- **Portfólio em grid CSS responsivo com filtro**, em vez da galeria 3D em Three.js — mais leve (~5,9 MB de imagens no total, vs. ~24 MB da v3), sem dependência de WebGL ou módulos JS, e abre direto de `file://` sem precisar de servidor local.
- **Sem vídeo**: seção Escritório usa imagem estática de banco.

## Créditos das imagens (Pexels, licença gratuita — pexels.com/license)

| Arquivo | Pexels photo ID | URL |
|---|---|---|
| hero-1.jpg | 4857757 | pexels.com/photo/4857757 |
| hero-2.jpg | 8134745 | pexels.com/photo/8134745 |
| hero-3.jpg | 30484316 | pexels.com/photo/30484316 |
| escritorio.jpg | 8606292 | pexels.com/photo/8606292 |
| portfolio/sala-1.jpg | 6180674 | pexels.com/photo/6180674 |
| portfolio/sala-2.jpg | 5698004 | pexels.com/photo/5698004 |
| portfolio/cozinha-1.jpg | 29923543 | pexels.com/photo/29923543 |
| portfolio/cozinha-2.jpg | 10827396 | pexels.com/photo/10827396 |
| portfolio/banho-1.jpg | 7166635 | pexels.com/photo/7166635 |
| portfolio/banho-2.jpg | 16249146 | pexels.com/photo/16249146 |
| portfolio/externa-1.jpg | 17556197 | pexels.com/photo/17556197 |
| portfolio/externa-2.jpg | 8134849 | pexels.com/photo/8134849 |
| portfolio/comercial-1.jpg | 17051853 | pexels.com/photo/17051853 |
| portfolio/comercial-2.jpg | 6044231 | pexels.com/photo/6044231 |
| antes-depois/01-antes.jpg | 3951742 | pexels.com/photo/3951742 |
| antes-depois/01-depois.jpg | 7166635 (mesma de banho-1) | pexels.com/photo/7166635 |
| antes-depois/02-antes.jpg | 15798784 | pexels.com/photo/15798784 |
| antes-depois/02-depois.jpg | 6970077 | pexels.com/photo/6970077 |
| antes-depois/03-antes.jpg | 10397022 | pexels.com/photo/10397022 |
| antes-depois/03-depois.jpg | 29923543 (mesma de cozinha-1) | pexels.com/photo/29923543 |

A licença do Pexels permite uso comercial sem atribuição obrigatória; a tabela acima é mantida como rastreabilidade interna, não como requisito legal de crédito público no site.

## Executar localmente

Não precisa de servidor — abra `index.html` direto no navegador (duplo clique). Todo o JS usa `<script>` clássico (sem `type="module"`), então funciona também via `file://`.

Se preferir servir localmente:
```powershell
python -m http.server 4173
```
Acesse `http://localhost:4173/`.

## Antes de usar num pitch real / publicar para um cliente

- [ ] Substituir `[Nome do Escritório]` (header e footer) pelo nome real do lead ou manter genérico se for só demonstração.
- [ ] Substituir WhatsApp, e-mail e Instagram (marcados `PLACEHOLDER` no `index.html`) por dados reais.
- [ ] Trocar `href="https://seudominio.com.br/"` (canonical, sitemap.xml, robots.txt) pelo domínio real.
- [ ] Se for virar site de um cliente real: trocar as fotos de banco pelo portfólio real do profissional, e reescrever a seção Antes/depois com transformações reais (a nota "imagens ilustrativas" deixa de fazer sentido nesse caso).
- [ ] Configurar analytics consentido (ex. Plausible/GA4 com banner de consentimento) — não incluído nesta peça de demonstração.

## Stack

HTML5 semântico + CSS puro (custom properties) + JS vanilla (~80 linhas, sem dependências/CDN além do Google Fonts). Sem build step — os arquivos são publicáveis como estão em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, S3, etc.).

## Rollback

Este é o output do run `2026-09-04-162903`, pasta `v5/`. Versões anteriores do mesmo run (`v1`–`v4`, se existirem) contêm os artefatos de briefing/estratégia/copy/direção visual, não o site em si. Para reverter, basta apontar a hospedagem para uma pasta de output anterior ou para a v3 do projeto de referência (`../2026-08-27-architecture-luxury/v3`), que é um site distinto e não deve ser confundido com este.
