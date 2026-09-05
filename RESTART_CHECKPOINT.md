# CHECKPOINT - Retomar após reiniciar

Data: 2026-09-05
Objetivo: Site Shakelumiinezn ativo na Vercel + repositório GitHub + banco Neon (Postgres)

## Estado atual
- Deploy de produção ativo: https://shakelumiinezn.com.br (domínio próprio, concluído - 2026-09-05) e https://shakelumiinezn.vercel.app.
- Repositório GitHub: https://github.com/jassonmouragt-prog/shakelumiinezn (branch master).
- Vercel conectado ao GitHub (deploy automático em push na master via `vercel git connect`).
- **Persistência no Neon (Postgres serverless)** — projeto Neon `sparkling-cherry-15094366`.
- **Produtos no site sincronizados e com carregamento resiliente**:
  - `INITIAL_PRODUCTS` em `lib/mock-data.ts` contém os 14 produtos do cardápio real (com imagens, badges e categorias), servindo como fallback imediato.
  - `AppContext` hidrata do `/api/products` mesclando dados do banco com o fallback local (imagem, badge e galeria preservados quando vazios no banco). Estado `isLoading` controla o skeleton na listagem.
  - Categorias reais: shakes, bebidas, salgados, novidades, mais-vendidos (combos e kits removidos).
- **Área do Revendedor FOI REMOVIDA** em `fa5bc81` (2026-09-05): páginas `/revenda` e `/revendedor`, APIs `api/resellers/*` e `api/commissions`, gestão de revendedores no admin — tudo removido. Diretórios vazios `app/(site)/revenda`, `app/(site)/revendedor`, `app/api/resellers`, `app/api/commissions` podem ser deletados.
- **Login real do admin**: tabela `users`, senha com hash (scrypt), sessão via cookie HttpOnly `lumiine_session` (HMAC-SHA256). Admin seed: `admin@lumiine.com` / `admin123`.
- API routes atuais em `app/api/`: auth (login/logout/me), products (+[id]), orders (+[id]), loyalty, expenses (+[id]), stock.
- Redesenho Executivo do Painel Administrativo (`/admin`): identidade Obsidian & Gold (`#09090B`, `#0E0E12`, `#18181C` com acentos `#D4AF37` / `#E8C868`), sidebar por categorias (Visão Geral, Operações, Finanças), drawer mobile, dashboard com KPIs, gestão de pedidos com filtros, catálogo com controle de visibilidade e foto, controle de estoque, painel financeiro & DRE (despesas).
- Favicon e título da aba customizados com a identidade da marca.
- Hero com animação 3D do produto (WebM VP9 no Chrome/Edge com transparência, fallback MP4 via Canvas nos demais).
- Build validado com TypeScript: 16 rotas compilando sem erros. **Atenção:** se surgirem erros TS falsos em `.next/dev/types/validator.ts`, limpar a pasta `.next` antes de buildar.
- Último commit: `33fe1a5` em `origin/master` com redirect www→apex aplicado e deploy Ready.
- **Hardening de segurança (2026-09-05)**: autenticação exigida em todas as rotas admin (`lib/auth.ts` com `getAdmin()` + 401), validação de entrada (`lib/validate.ts`) em POST/PATCH/DELETE, rate limiting por IP no Neon (`lib/rate-limit.ts`, tabela `rate_limits`) no POST de pedidos e no login, anti-enumeração no login (hash dummy via scrypt), `lib/session.ts` endurecido (secret exclusivo `SESSION_SECRET`, expiração de 7d no token), `lib/password.ts` com limite de 1024 chars, `AppContext` só carrega dados admin autenticado (e limpa no logout), headers de segurança no `next.config.ts`, `metadataBase` no layout.
- **CSP com nonce via `proxy.ts` (2026-09-05)**: a CSP estática (`script-src 'self'`) bloqueava os scripts inline do Next (`self.__next_f`), matando a hidratação no cliente — botões (carrinho, login, checkout) não respondiam. Corrigido com `proxy.ts` (convenção do Next 16, antigo middleware) gerando um nonce por request, injetado no `x-nonce` + `Content-Security-Policy`; CSP removida do `next.config.ts` (evita header duplicado) e `force-dynamic` no `app/layout.tsx` (exigência para nonce). Scripts agora vêm com `nonce` e a hidratação volta a funcionar. APIs/estáticos ficam fora do CSP via matcher.
- **Produto `menu-monte-seu-shake` restaurado no Neon** (2026-09-05): linha estava ausente do banco (removida por engano); restaurada via upsert idêntico ao seed (stock 100, 7 addons). O fallback do cliente já corrigia a exibição, mas o admin/estoque dependia da linha.

## Domínio personalizado (CONCLUÍDO - 2026-09-05)
- Domínio: **shakelumiinezn.com.br** (Registro.br), delegado via nameservers Vercel (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`) — Opção B (delegação total).
- `vercel domains inspect shakelumiinezn.com.br` confirmou nameservers atuais corretos e sem WARNING.
- SSL emitido manualmente (a Vercel não emitiu sozinha): `vercel certs issue shakelumiinezn.com.br` e `vercel certs issue www.shakelumiinezn.com.br`.
- Apex respondendo HTTPS 200 em https://shakelumiinezn.com.br. `www` também 200 (sem redirect automático; a Vercel NÃO gerencia redirect www sozinha, a despeito do esperado).
- **PENDENTE:** redirect www→apex adicionado em `next.config.ts` (via `has: { type: "host" }` + `permanent: true`), validado no build local. Falta apenas commit + push para o deploy automático aplicar.
- Conta Vercel (scope `jason-3c4d`, usuário `jassonmouragt-9214`). Outros domínios: `sualojinhamakeup.com.br` (nameservers Vercel, funcionando).

## Fontes de trabalho locais (NÃO versionadas)
- "hype drink - product animation 3d.mov" (sem alpha)
- "hype drink - product animation 3d_1.mov" (COM alpha, argb 720x1280)
- "CARDÁPIO SHAKE LUMIINE - ATUALIZADO.pdf"
- "cardapio-pagina-4.png"
- img01-06.jpg, sobre nós.jpg, logo.png, 3d product.png, screen-capture.mp4

## Instrução permanente do usuário
- Sempre que houver erros (operacional, segurança, visual), CORRIGIR automaticamente e avisar o que foi feito.
- Manter o padrão visual executivo e alto nível de acabamento em todas as telas.