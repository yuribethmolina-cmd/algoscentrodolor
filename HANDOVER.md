# ALGOS — Handover técnico

## Repo y deploy
- **Branch de trabajo:** `home-redesign` → Lovable auto-despliega en cada push
- **Merge a main:** pendiente (cuando Atilio y Luis Alberto aprueben el diseño)
- **Flujo de push:** siempre `git pull --rebase origin home-redesign` antes de `git push` — Lovable hace commits propios al branch

## Config central
Toda la data de negocio vive en **`src/config/algos.config.ts`**.
Importar con: `import { ALGOS } from "@/config/algos.config";`

| Campo | Valor |
|---|---|
| `ALGOS.contact.whatsappNumber` | `584146807886` |
| `ALGOS.contact.whatsappHref` | `https://wa.me/584146807886` |
| `ALGOS.contact.whatsappDisplay` | `0414-680 7886` |
| `ALGOS.contact.email` | `info@algoscentrodolor.com` |
| `ALGOS.location.full` | Av. 20 con Calle 65 · C.C. América, Local 4 |

**Regla:** ningún archivo fuera de `algos.config.ts` debe tener URLs de WhatsApp hardcodeadas.  
**Excepción legítima:** `AllianceSection.tsx` línea 353 — número de UDUZ (`584126404124`), diferente al de ALGOS.

## Fuentes e imágenes
- Fuentes: Google Fonts vía `index.html` (Inter + Sora + Manrope). Bloquean render — intencional para evitar CLS.
- Imágenes: procesadas con `vite-imagetools` → `.asset.json` (avif/webp/jpg multi-resolución)
- Video hero: `src/assets/hero-bg.mp4` + `hero-bg.webm`

## Performance (Lighthouse mobile, localhost)
| Métrica | Valor |
|---|---|
| Performance | 79 |
| Accessibility | 91 |
| Best Practices | 100 |
| SEO | 100 |

**LCP:** video hero (`video.hero-bg-video`) — el poster resuelve solo en producción vía CDN de Lovable.  
**Chunk splitting activo:** `vendor-react`, `vendor-motion`, `vendor-router` → main app chunk: 506 KB (134 KB gzip).  
**No usar lazy loading con Suspense:** probado y revertido — empeora Speed Index (2.7 s → 5.4 s) por conflicto con AnimatePresence.  
**No hacer fonts non-blocking:** causa CLS 0 → 0.156 por FOUT.

## Archivo auto-generado — nunca commitear
`supabase/functions/mcp/index.ts` — generado por el plugin `@lovable.dev/mcp-js`.  
Si aparece sucio: `git checkout -- supabase/functions/mcp/index.ts`

## Alianza UDUZ
`src/components/AllianceSection.tsx` — sección dedicada en home.  
Enlace producción UDUZ: `https://uduz.vercel.app`  
Precios en la sección: $25TC / $15Eco / $8RX (actualizar si cambian).

## Pendiente antes del merge a main
- [ ] Aprobación visual de Atilio + Luis Alberto + esposo
- [ ] Google Analytics: reemplazar `G-XXXXXXXXXX` en `index.html` con el Measurement ID real
