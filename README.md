# dongnehome-samples

동네홈(가칭) 가상 매장 홈페이지 샘플. 사진은 AI 생성.

## Live

- Root: `https://monnnnnk.github.io/dongnehome-samples/`
- Cafe: `.../cafe/`
- Salon: `.../salon/`
- Restaurant: `.../restaurant/` (temporary; will be replaced by ramen)

## Add ramen later

Same repo, same branch (`main`). Do not redesign cafe/salon.

1. Put the finished site at `ramen/index.html` (+ `ramen/img/` assets only).
2. Update root `index.html` to link `ramen/` (and retire or keep `restaurant/` as decided).
3. Commit and push to `main`. GitHub Pages updates automatically.

```bash
# from a local clone of this repo
git add ramen/ index.html
git commit -m "Add ramen sample"
git push origin main
```

Or via Cursor cloud agent on `monnnnnk/dongnehome-samples`: copy `v7/ramen/` needed files into `ramen/` and push.

## Structure

```
/
  index.html
  cafe/
  salon/
  restaurant/
  ramen/   # reserved; add when ready
```
