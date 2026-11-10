# dongnehome-samples

동네홈 가상 매장 홈페이지 샘플. 가게 이름, 메뉴, 가격, 연락처는 모두 가상입니다.

사진 출처 (각 폴더 기준)
- `cafe/`: 무료 스톡 이미지(Unsplash)와 일부 AI 생성(히어로 창가·컵 사진). 출처는 `cafe/PHOTO_CREDITS.md`.
- `salon/`: 무료 스톡 이미지(Unsplash)와 일부 AI 생성(히어로 뒷모습 사진). 출처는 `salon/PHOTO_CREDITS.md`.
- `ramen/`: 모두 무료 스톡 이미지(Unsplash·Pexels). AI 생성 사진 없음. 출처 표는 원본 작업 폴더(v7/ramen/PHOTO_CREDITS.md)에 있고, 이 저장소의 `ramen/`에는 아직 복사되지 않았습니다.
- `restaurant/`: 이전 국수집 샘플. 사진은 AI 생성.
- 루트 메인(`index.html`): 위 샘플 화면의 캡처만 씁니다. 음악·글꼴·라이브러리 라이선스는 `assets/LICENSES.md`.

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
