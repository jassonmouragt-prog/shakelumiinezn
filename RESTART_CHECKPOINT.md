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
- Build validado com TypeScript: 17 rotas compilando sem erros. **Atenção:** se surgirem erros TS falsos em `.next/dev/types/validator.ts`, limpar a pasta `.next` antes de buildar.
- Último commit: `5019255` em `origin/master` (branch já empurrada, deploy Vercel ativo). Porém, o redirect www→apex do `next.config.ts` e este arquivo estão **pendentes de commit/push**.

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