# CHECKPOINT - Retomar após reiniciar

Data: 2026-09-03
Objetivo: Vídeo hero sem fundo com loop instantâneo

## Estado atual
- app/page.tsx: TextTickerSection inserido entre FeaturedProducts e InstitutionalSection (posição 4). InstitutionalSection mantida após carrossel (posição 5). ResellerSection posição 6.
- components/InstitutionalSection.tsx: imagem /images/sobre-nos.jpg (copiada de "sobre nós.jpg" raiz -> public/images/sobre-nos.jpg), aspect-[2/3], object-contain, tag "Padrão Farmacopeico..." removida, import Sparkles limpo.
- components/Navbar.tsx: logo apenas /images/logo.png (h-11, w-auto), textos LUMIINE/WELLNESS SHAKES removidos.
- components/Footer.tsx: logo apenas /images/logo.png (h-14, w-auto), texto removido.
- public/images/: logo.png e sobre-nos.jpg já copiados.
- components/Hero.tsx: desktop e mobile trocados de <Image shake-hero.jpg> para <LazyHeroVideo src="/images/produto-3d.mp4" poster="/images/shake-hero.jpg"> com parallax mantido.
- components/LazyHeroVideo.tsx: criado com IntersectionObserver (rootMargin 200px), preload metadata, loop/muted/playsInline.
- Arquivo origem vídeo: "hype drink - product animation 3d.mov" na raiz do projeto.

## Pendente (retomar aqui)
1. Testar hero em desktop/mobile, verificar peso e autoplay.

## Concluído
- ffmpeg verificado (9.0.1).
- MP4 convertido: public/images/produto-3d.mp4 (yuv420p, faststart, sem áudio, crf 26, ~532KiB).
- WebM convertido: public/images/produto-3d.webm (vp9, 1M, opus, ~893KiB).
- LazyHeroVideo.tsx: adicionado suporte <source> mp4 + webm (fallback webm via replace .mp4->.webm) e loop instantâneo via onEnded (currentTime=0 + play).

## Instrução permanente do usuário
- Sempre que houver erros (operacional, segurança, visual), CORRIGIR automaticamente e avisar o que foi feito.
