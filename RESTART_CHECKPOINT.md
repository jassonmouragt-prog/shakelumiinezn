# CHECKPOINT - Retomar após reiniciar

Data: 2026-09-04
Objetivo: Site Shakelumiinezn ativo na Vercel + repositório GitHub + banco Neon (Postgres)

## Estado atual
- Deploy de produção ativo: https://shakelumiinezn.vercel.app
- Repositório GitHub: https://github.com/jassonmouragt-prog/shakelumiinezn (branch master)
- Vercel conectado ao GitHub (deploy automático em push na master via `vercel git connect`).
- **Persistência no Neon (Postgres serverless)** — projeto Neon `sparkling-cherry-15094366`.
- **Área do Revendedor exclusiva (`/revendedor`)**:
  - Login individual para revendedores via `/api/resellers/login` e `/api/resellers/me`.
  - Tabela `users` vinculada a `reseller_id` (`db/schema.sql`, `lib/resellers.ts`).
  - Painel do revendedor com dashboard de comissões, link de indicação, extrato de pedidos indicados e status de repasse.
  - Cadastro de acesso para revendedores direto pelo painel admin (gera usuário e senha).
- **Redesenho Executivo do Painel Administrativo (`/admin`)**:
  - Identidade visual Obsidian & Gold (`#09090B`, `#0E0E12`, `#18181C` com acentos `#D4AF37` / `#E8C868`).
  - Navegação desktop fixa por categorias: Visão Geral (Dashboard), Operações (Pedidos, Catálogo, Estoque) e Finanças & Rede (Despesas & Margens, Revendedores & Comissões).
  - Drawer mobile completo com backdrop blur.
  - Topbar contextual com atalhos de ação rápida específicos por aba ativa.
  - Dashboard Executivo com 4 KPI cards (Faturamento Bruto, Despesas Operacionais, Comissões a Repassar, Lucro Líquido Real com Margem Líquida %), feed de pedidos em tempo real e resumos operacionais.
  - Gestão de Pedidos com filtros rápidos por status, busca em tempo real e atualização de status em 1 clique.
  - Catálogo de Produtos com controle de visibilidade na vitrine, badges de categoria e modal de criação/edição com upload de foto.
  - Controle de Estoque com indicadores visuais de estoque baixo, modal de movimentação rápida (entrada/saída) e histórico auditável.
  - Painel Financeiro & DRE com gráficos de margem, listagem de despesas operacionais por categoria e lançamento rápido.
  - Gestão de Revendedores com aprovação de cadastros, controle de comissões e criação de credenciais de acesso.
- **Login real do admin**: tabela `users`, senha com hash (scrypt), sessão via cookie HttpOnly `lumiine_session` (HMAC-SHA256). Admin seed: `admin@lumiine.com` / `admin123`.
- API routes em `app/api/`: auth (login/logout/me), resellers (login/me/crud), products (+[id]), orders (+[id]), loyalty, commissions, expenses (+[id]), stock.
- Favicon e título da aba customizados com a identidade da marca.
- Hero com animação 3D do produto (transparência nativa WebM VP9 no Chrome/Edge e fallback MP4 via Canvas nos demais).
- Build validado com TypeScript (23 rotas estáticas e dinâmicas compilando 100% sem erros).
- Último commit: `d09b753` em `origin/master`.

## Fontes de trabalho locais (NÃO versionadas)
- "hype drink - product animation 3d.mov" (sem alpha)
- "hype drink - product animation 3d_1.mov" (COM alpha, argb 720x1280)
- "CARDÁPIO SHAKE LUMIINE - ATUALIZADO.pdf"
- "cardapio-pagina-4.png"
- img01-06.jpg, sobre nós.jpg, logo.png, 3d product.png, screen-capture.mp4

## Instrução permanente do usuário
- Sempre que houver erros (operacional, segurança, visual), CORRIGIR automaticamente e avisar o que foi feito.
- Manter o padrão visual executivo e alto nível de acabamento em todas as telas.
