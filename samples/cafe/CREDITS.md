# 소담별 커피 (샘플 재제작 r1, 2026-11-10) — 출처 기록

- 가게 이름·주소·전화번호·메뉴·가격·영업시간: 동네홈 샘플용으로 지어낸 매장 정보입니다. 주소(서울 ○○구 ○○길 00)와 번호(02-000-0000)는 예시 형식입니다. 원두·메뉴·가격·영업시간은 mission001/v7/cafe 원본 문안을 참고했고(원본 수정 없음), '콜롬비아 우일라'의 맛 설명과 원두 봉투 가격(블렌드 14,000원)은 이번에 새로 정했습니다.
- 사진: 모두 GenerateImage로 만든 AI 이미지입니다(사람·얼굴·다른 가게 글자 없음). 원본은 img/gen_*.jpg에 있습니다.
  - img/front_desktop.jpg, front_mobile.jpg ← gen_facade_16x9 / 9x16 (크림 간판 '소담별 / SODAMBYEOL COFFEE', 유리창 시트 '소담별 커피 / HAND DRIP · ROASTERY' 합성)
  - img/cups.jpg ← gen_cups_4x3 (컵 슬리브에 원통 왜곡으로 '소담별' 합성)
  - img/bag.jpg ← gen_bag_3x4 (쇼핑백 로고, 원두 봉투 라벨, 초록 메뉴 보드 글자 합성)
  - 합성 스크립트: comp.py (공용 ../_lib/comp_lib.py: 글꼴 렌더링 → 표면 밝기 기울기로 변위, 음영·결 반영, 비네팅·그레인)
- 약도: index.html 안의 SVG로 직접 그린 그림입니다(실제 지도 데이터 아님). 지도 버튼은 네이버 지도·카카오맵에서 '소담별 커피'를 장소명으로 검색합니다.
- 픽업 예약 폼: 브라우저 안에서만 확인하고 아무 데도 보내지 않습니다.
- 글꼴: LICENSES.md를 보세요.
- 비교 레퍼런스: Tim Wendelboe 공식 사이트 https://timwendelboe.no/ 를 2026-11-10 15:26(한국 시간)쯤 직접 열어 1440·390 첫 화면을 캡처했습니다(refs/). 비교용으로만 썼고 로고·사진·문구·코드는 가져오지 않았습니다. Stumptown, Verve, Onyx도 열어 봤습니다. bluebottlecoffee.com은 Cloudflare 403, arabica.coffee는 418, fritz.co.kr은 ERR_CONNECTION_CLOSED라 우회하지 않았습니다(refs/log.txt).
