# CHECKPOINT - Retomar após reiniciar

Data: 2026-09-04
Objetivo: Site Shakelumiinezn ativo na Vercel + repositório GitHub

## Estado atual
- Deploy de produção ativo: https://shakelumiinezn.vercel.app
- Repositório GitHub: https://github.com/jassonmouragt-prog/shakelumiinezn (branch master)
- Vercel conectado ao GitHub (deploy automático em push na master via `vercel git connect`).
- Persistência: 100% client-side via localStorage (SEM banco). Migração para Neon (Postgres) é etapa futura.
- Hero usa vídeo com transparência:
  - Chrome/Firefox/Edge: components/LazyHeroVideo.tsx -> <video> nativo com public/images/produto-3d.webm (VP9 + alpha nativo, loop via onEnded).
  - Safari: components/CanvasVideoKey.tsx -> processa public/images/produto-3d-fallback.mp4 por frame (removendo fundo cinza por saturação) num canvas, dando transparência real.
- Arq. gerados: produto-3d.webm (2160x3840, 3x, ~1.8MB) e produto-3d-fallback.mp4 (2160x3840, ~4.3MB).
- Layout hero: box do produto desktop 520x560 / xl 600x640 (subido via translateY -3rem), mobile 320/384.
- Correção hydration: RoleSwitcher.tsx usa usePathname (substituiu window.location que causava mismatch SSR/cliente).
- Correção flash: removidos posters/fallback de imagem no hero (área fica transparente até vídeo carregar).
- .vercelignore e .gitignore excluem fontes de mídia de origem (.mov, screen-capture.mp4, etc.) do deploy e do repo.

## Fontes de trabalho (NÃO versionadas, apenas locais)
- "hype drink - product animation 3d.mov" (sem alpha)
- "hype drink - product animation 3d_1.mov" (COM alpha, argb 720x1280)
- img01-06.jpg, sobre nós.jpg, logo.png, 3d product.png, screen-capture.mp4

## Pendente (retomar aqui)
1. Confirmar deploy automático do GitHub (push na master -> Vercel).
2. (Futuro) Migrar dados de localStorage para Neon Postgres + API routes.

## Instrução permanente do usuário
- Sempre que houver erros (operacional, segurança, visual), CORRIGIR automaticamente e avisar o que foi feito.
