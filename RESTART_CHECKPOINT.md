# CHECKPOINT - Retomar após reiniciar

Data: 2026-09-12
Objetivo: Site Shakelumiinezn ativo na Vercel + repositório GitHub + banco Neon (Postgres)

## Estado atual

### Últimos commits (sessão 2026-09-12, todos pushed em origin/master)
- `752620f` feat: acréscimo único nas bebidas funcionais, máx. 3 sabores e preço por item no WhatsApp
- `db2cc64` fix: cadastro de produtos com peso/litragem opcional e erros de salvamento visíveis
- Working tree limpo.

### Produtos & Monte Seu Shake (alterações desta sessão)
- **Peso/Litragem opcional no admin**: era hardcoded `weight: '600g'` no cadastro de produto (`app/admin/page.tsx`). Agora há campo opcional "Peso / Litragem" nas modais Criar e Editar. Listagem do admin mostra "Sem peso/litragem definido" quando vazio. Enviado `''` quando vazio; APIs POST/PATCH já tratam peso vazio.
- **Produtos não salvando — corrigido**: originava de erros do servidor engolidos (`.catch(() => {})`). Agora:
  - `addProduct`/`updateProduct`/`deleteProduct`/`toggleProductShowcase` mostram toast de erro (tipo `'error'`, ícone vermelho) com a mensagem real do servidor.
  - Produto falho é removido da lista otimista no POST falho.
  - **Id real do servidor** retornado pelo POST é usado (antes o cliente criava `prod-<timestamp>` próprio e o servidor outro → PATCH/DELETE em produto recém-criado dava 404).
  - **Importante**: sem `.env.local` no repo, o POST local falha com "DATABASE_URL não configurado" e o site cai no fallback `INITIAL_PRODUCTS`. Para persistir localmente: criar `.env.local` (ver `.env.local.example`) + `npm run db:migrate` + `npm run db:seed`.
- **Monte Seu Shake — Bebidas Funcionais**: acréscimo ÚNICO de R$ 2,00 (não por item). Novo campo `surcharge?: number` em `CustomizationStep` (`types/index.ts`); passo `bebida` em `lib/mock-data.ts` usa `surcharge: 2` e opções sem `price`. Cálculo atualizado nos 3 pontos que somam a montagem: página do produto (`stepsTotal`), `cartSubtotal` (AppContext) e `CartDrawer` (`customTotal`). Renomes: "Copo de NRG" → "Chá de NRG", "Copo de Herbal Concentrate" → "Chá de Herbal Concentrate" (ids `copo-nrg`/`copo-herbal` mantidos).
- **Monte Seu Shake — Escolha o Sabor**: `max: 3` (até 3 opções; UI já mostra contador X/3 e trava no limite).
- Revisão geral: corrigido preço por item na mensagem WhatsApp (`buildWhatsAppMessage` em `CartDrawer.tsx`) que não incluía custos de personalização (adicionais + surcharge) — linhas não batiam com o total.

### Verificação
- `npx tsc --noEmit` e `npm run build` passam (Next 16.3.4, Turbopack).
- Lint ainda tem ~30 erros/warnings PRÉ-EXISTENTES (`no-explicit-any`, `react-hooks/set-state-in-effect`, `react-hooks/purity` Math.random, unused imports/vars). Não vêm das mudanças desta sessão.

### Limitação conhecida (não corrigida)
- Modal de detalhes do pedido no admin: preço por item NÃO inclui custos de personalização (addons/seleções não são persistidos separadamente em `order_items` — só o texto resumo em `selected_flavor`). Corrigir exige mudança de schema + route de pedidos.

## Estado anterior (checkpoint 2026-09-05)
- Deploy de produção ativo: https://shakelumiinezn.com.br (domínio próprio) e https://shakelumiinezn.vercel.app.
- Repositório GitHub: https://github.com/jassonmouragt-prog/shakelumiinezn (branch master), Vercel conectado (deploy automático em push).
- Persistência no Neon (Postgres serverless) — projeto Neon `sparkling-cherry-15094366`.
- `INITIAL_PRODUCTS` em `lib/mock-data.ts` (14 produtos) como fallback; `AppContext` hidrata do `/api/products` mesclando com fallback (imagem, badge, galeria).
- Área do Revendedor REMOVIDA (`fa5bc81` 2026-09-05).
- Login real do admin (tabela `users`, scrypt hash, cookie `lumiine_session` HMAC). Admin seed: `admin@lumiine.com` / `admin123`.
- Redesenho Executivo do Painel Admin (`/admin`), identidade Obsidian & Gold.
- CSP com nonce via `proxy.ts` (convenção Next 16, antigo middleware) + `force-dynamic` no `app/layout.tsx`.
- Produto `menu-monte-seu-shake` restaurado no Neon.
- Domínio personalizado concluído com redirect www→apex no `next.config.ts`.

## Fontes de trabalho locais (NÃO versionadas)
- "hype drink - product animation 3d.mov" (sem alpha)
- "hype drink - product animation 3d_1.mov" (COM alpha, argb 720x1280)
- "CARDÁPIO SHAKE LUMIINE - ATUALIZADO.pdf"
- "cardapio-pagina-4.png"
- img01-06.jpg, sobre nós.jpg, logo.png, 3d product.png, screen-capture.mp4

## Instrução permanente do usuário
- Sempre que houver erros (operacional, segurança, visual), CORRIGIR automaticamente e avisar o que foi feito.
- Manter o padrão visual executivo e alto nível de acabamento em todas as telas.