# AI workspace copy

This folder holds a **mirror of the Zaanvi React storefront** for tooling, reviews, or sharing—**without `node_modules`**.

| Path | Contents |
|------|----------|
| **`storefront/`** | Full project snapshot (run `npm install` there to work on it). |
| **`read.txt`** | Scratch / notes. |

The live app you edit day-to-day stays at the **repo root** (`../`). To refresh this copy from the root:

```bash
# from repo root (parent of ai/)
rsync -a --delete \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.cursor' \
  --exclude='ai' \
  --exclude='.git' \
  ./ ai/storefront/
```

`node_modules` and `dist` are omitted on purpose; run `npm install` and `npm run build` inside `storefront/` when needed.
