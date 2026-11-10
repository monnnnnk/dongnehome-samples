# 라멘 소라 (샘플 재제작 r2, 2026-11-10) — 출처 기록

- 가게 이름·주소·전화번호·메뉴·가격·영업시간: 동네홈 샘플용으로 지어낸 가상 매장 정보입니다. 주소(서울 ○○구 ○○로 00)와 번호(02-000-0000)는 예시 형식입니다. 메뉴 구성은 mission001/v7/ramen 원본 문안을 참고했습니다(원본 수정 없음).
- 사진: 모두 GenerateImage로 만든 AI 이미지입니다(사람·얼굴·다른 가게 글자 없음). 원본은 img/gen_*.jpg에 있습니다.
  - img/front_desktop.jpg ← gen_facade_day_16x9 (r2: gen_facade_16x9를 참조 이미지로 넣어 구도는 두고 낮 밝기로 다시 생성), front_mobile.jpg ← gen_facade_9x16 (노렌과 벽등에 '소라' 합성)
  - img/bowl.jpg ← gen_bowl_4x3 (젓가락 봉투에 '소라 / SORA' 합성, r2에서 글자를 봉투 폭의 86%로 키움)
  - img/bowl_crop.jpg ← gen_bowl_close_3x4 (r2: 흐릿했던 확대본 대신 새로 생성한 근접 사진)
  - img/bag.jpg ← gen_bag_3x4 (포장 봉투 글자, 메뉴 카드 글자 합성)
  - img/apron.jpg ← gen_apron_3x4 (앞치마에 오렌지 잉크 글자 합성)
  - 합성 스크립트: comp.py (글꼴 렌더링 → 주름 밝기 기울기로 변위, 표면 음영·결 반영, 비네팅·그레인)
- 주소: 화면 주소는 '서울 ○○구 ○○로 00, 1층' 예시 형식이고, 실제 찾기는 지도 앱의 장소명 검색으로 안내합니다.
- 약도: index.html 안의 SVG로 직접 그린 그림입니다(실제 지도 데이터 아님). 지도 버튼은 네이버 지도·카카오맵에서 '라멘 소라'를 검색합니다.
- 글꼴: Gasoek One(© 2022 The Gasoek Project Authors), Gowun Batang(© 2021 The Gowun Batang Project Authors). 둘 다 SIL OFL 1.1이고, 자세한 내용은 LICENSES.md를 보세요.
- 비교 레퍼런스: AFURI 공식 사이트 https://afuri.com/ 를 2026-11-10 15:1x(한국 시간)에 직접 열어 1440·390 첫 화면을 캡처했습니다(refs/). 이 캡처는 비교용으로만 썼고, 로고·사진·문구·코드는 가져오지 않았습니다. 이치란·잇푸도도 열어 봤고, menya-musashi.co.jp는 연결이 끊겨(ERR_CONNECTION_CLOSED) 우회하지 않았습니다.
