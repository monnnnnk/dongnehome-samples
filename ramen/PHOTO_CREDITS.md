# 라멘 소라 사진 출처 (r7 프리미엄, 2026-11-10 KST)

가상 매장 샘플입니다. 페이지에 쓰는 사진은 모두 실제 사진이고 무료 스톡 이미지입니다. AI 생성 이미지는 쓰지 않습니다.
- r7에서 다른 가게 글자가 보이던 사진 세 장(히어로 그릇 테두리의 붓글씨, 메뉴 띠 그릇의 빨간 글자, 오시는 길 노렌의 메뉴 글자)을 페이지에서 뺐습니다.
- 새로 쓴 사진은 이미 사진 페이지를 열어 라이선스를 확인해 둔 원본(`_stock/orig/`, 확인 기록 `_stock/verified.json`)에서 다시 잘랐습니다. 새로 내려받은 사진은 없습니다.
- 가공: 자르기와 웹용 크기 줄이기만 했습니다(`_premium/` 작업 기록).

| 파일 (img/) | 쓰인 곳 | 원본 | 사진가 | 페이지 | 라이선스 |
|---|---|---|---|---|---|
| p_hero.jpg | 첫 화면 | Tonkotsu Ramen with Extra Pork at Aka no Ren (파란 테두리 그릇, 글자 없음) | Frank from 5 AM Ramen | https://unsplash.com/photos/a-bowl-of-soup-with-meat-and-vegetables-vPMQl71yFDI | Unsplash License |
| p_shoyu.jpg | 메뉴 사진: 쇼유 라멘 | Soy sauce dumpling ramen at Shimomae Shouten | Frank from 5 AM Ramen | https://unsplash.com/photos/a-bowl-of-soup-with-a-spoon-in-it-fHSTIBefNXQ | Unsplash License |
| p_tsukemen.jpg | 메뉴 사진: 츠케멘 | Authentic Tsukemen Ramen with Rich Broth | Airam Dato-on | https://www.pexels.com/photo/authentic-tsukemen-ramen-with-rich-broth-30682736/ | Pexels License (Free) |
| p_gyoza.jpg | 메뉴 사진: 교자 | Gyoza | Mikey Frost | https://unsplash.com/photos/a-black-plate-topped-with-dumplings-on-top-of-a-wooden-table-klTf2RN37Ts | Unsplash License |
| p_kitchen.jpg | 가게 섹션 | A man working in a kitchen with pots and pans (원본 2400×1600에서 x 0–1000, y 830–1393만 잘라 씀: 요리사·병 라벨이 보이지 않는 왼쪽 창 안 냄비 부분. 이전 자른 판은 _premium_backup/kitchen_pre_crop/) | Perry Merrity II | https://unsplash.com/photos/a-man-working-in-a-kitchen-with-pots-and-pans-e8VIeZ8kqew | Unsplash License |

주의할 점
- 주방 사진의 요리사는 김 서린 유리 너머로 흐리게 보이고, 얼굴 윗부분은 냄비에 가려 있습니다.
- 메뉴 사진은 실제 라멘집 사진이라 우리 가상 메뉴와 토핑이 완전히 같지 않습니다. 페이지에 '사진은 메뉴 예시입니다'라고 적었습니다.

## 글꼴 (r7)
- 제목: Hahmlet(함렛) 가변 글꼴을 굵기 600으로 고정하고 쓰는 글자만 남긴 `fonts/Hahmlet-600.r7.woff2`, SIL OFL 1.1, 원문 `fonts/Hahmlet_OFL.txt` (https://github.com/hyper-type/hahmlet)
- 본문: Pretendard 400/500/600 하위 집합 `fonts/Pretendard-*.r7.woff2`, SIL OFL 1.1, 원문 `fonts/PRETENDARD_LICENSE.txt`

---
## 이전 기록 (r6까지, 페이지에서 더는 쓰지 않는 사진 포함)

# 라멘 소라 사진 출처 (2026-11-10 KST)

가상 매장 샘플입니다. 아래 사진은 모두 실제 사진이고 무료 스톡 이미지입니다. AI 생성 이미지는 페이지에 남아 있지 않습니다.
- 각 사진의 개별 페이지를 직접 열어 라멘(또는 라멘집)인지, 사진가 이름과 라이선스를 확인했습니다.
- Unsplash 사진은 모두 'Free to use under the Unsplash License'로 표시되어 있었습니다(Unsplash+ 아님).
- Pexels 사진은 'Free'(Pexels License)로 표시되어 있었습니다.
- 다운로드는 공개 이미지 URL(images.unsplash.com / images.pexels.com)에서만 했습니다. 가입이나 결제는 하지 않았습니다.
- 가공: 자르기, 웹용 크기 줄이기, 화이트밸런스·노출·채도 소폭 맞춤(`_stock/grade.py`, `_stock/build.py`). 히어로는 그릇을 원형으로 오려 #9C191B 빨강 바탕에 옮기고 그림자를 줬습니다.

| 파일 (img/) | 쓰인 곳 | 내용 (페이지 설명) | 사진가 | 페이지 | 라이선스 |
|---|---|---|---|---|---|
| s_hero_bowl_red.jpg | 히어로 그릇 | Ginza high quality ramen (Ginza Hachigo, 도쿄) | Frank from 5 AM Ramen | https://unsplash.com/photos/a-bowl-of-soup-with-meat-vegetables-and-an-egg-1PrmJze9d7E | Unsplash License |
| s_band_menu.jpg | 메뉴 띠 | Delicious ramen in Tokyo | Susann Schuster | https://unsplash.com/photos/egg-and-vegetable-dish-on-black-ceramic-bowl-5x8dUGe-7Fo | Unsplash License |
| s_card_paitan.jpg | 메뉴 카드: 토리 파이탄 | Tonkotsu Ramen with Extra Pork at Aka no Ren (후쿠오카) | Frank from 5 AM Ramen | https://unsplash.com/photos/a-bowl-of-soup-with-meat-and-vegetables-vPMQl71yFDI | Unsplash License |
| s_card_shoyu.jpg | 메뉴 카드: 쇼유 라멘 | Soy sauce dumpling ramen at Shimomae Shouten | Frank from 5 AM Ramen | https://unsplash.com/photos/a-bowl-of-soup-with-a-spoon-in-it-fHSTIBefNXQ | Unsplash License |
| s_card_tsukemen.jpg | 메뉴 카드: 츠케멘 | Authentic Tsukemen Ramen with Rich Broth | Airam Dato-on | https://www.pexels.com/photo/authentic-tsukemen-ramen-with-rich-broth-30682736/ | Pexels License (Free) |
| s_card_gyoza.jpg | 메뉴 카드: 차슈동·교자 | Gyoza | Mikey Frost | https://unsplash.com/photos/a-black-plate-topped-with-dumplings-on-top-of-a-wooden-table-klTf2RN37Ts | Unsplash License |
| s_band_kitchen.jpg | 주방 띠 (어둡게 깔림) | 도쿄의 주방, 냄비와 국자 (라멘 전용 사진 아님, 관련 주방 사진) | Perry Merrity II | https://unsplash.com/photos/a-man-working-in-a-kitchen-with-pots-and-pans-e8VIeZ8kqew | Unsplash License |
| s_band_shop.jpg | 가게 띠 (어둡게 깔림) | Ramen shop counter with stacked bowls (도쿄) | Agata Malankiewicz | https://unsplash.com/photos/ramen-shop-counter-with-stacked-bowls-nv3T3tv2KrM | Unsplash License |
| s_band_access.jpg | 오시는 길 띠 | People ordering food at a japanese restaurant counter (시부야) | Pratiksha Singh | https://unsplash.com/photos/people-ordering-food-at-a-japanese-restaurant-counter-_jJqK1xGI6w | Unsplash License |

주의할 점
- 히어로 그릇 테두리에 원래 가게의 작은 붓글씨 표시가 있습니다.
- 메뉴 띠 그릇 가장자리에 빨간 글자 일부가 보입니다.
- 오시는 길 띠 노렌에는 실제 가게 메뉴 글자(背脂味噌, チャーハン, タンメン)가 일부 보입니다. 사람은 뒷모습이고 주방 직원은 작게 보입니다.
- 주방 띠의 요리사는 수증기에 가려 흐리게 보입니다.
- 츠케멘 카드와 메뉴 띠는 라멘집 실제 사진이지만 우리 가상 메뉴와 토핑이 완전히 같지는 않습니다.

이전 AI 이미지(00_*, 01~07_*, r2_band_*)는 img/에 남아 있지만 페이지에서는 쓰지 않습니다. 백업은 `_r2_backup/`에 있습니다.

## 글꼴 (r6)

- 제목: Hahmlet(함렛) SemiBold 서브셋, SIL OFL 1.1, 원문 `fonts/Hahmlet_OFL.txt` (https://github.com/hyper-type/hahmlet)
- 본문: Pretendard 서브셋, SIL OFL 1.1, 원문 `fonts/PRETENDARD_LICENSE.txt` (https://github.com/orioncactus/pretendard)
- 모두 `fonts/`에 직접 넣었고 외부 CDN을 부르지 않습니다. r5까지 쓰던 Noto Sans KR·Montserrat Google Fonts 링크는 뺐습니다.
