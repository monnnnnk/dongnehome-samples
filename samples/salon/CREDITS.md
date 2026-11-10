# 결 헤어 (샘플 재제작 r2, 2026-11-10) — 출처 기록

- 가게 이름·주소·전화번호·시술·가격·영업시간: 동네홈 샘플용으로 지어낸 매장 정보입니다. 주소(서울 ○○구 ○○로 00)와 번호(02-000-0000)는 예시 형식입니다. 시술·가격·소요 시간·영업시간은 mission001/v7/salon 원본 문안을 참고했고(원본 수정 없음), '앞머리·기장 정리'의 소요 시간(약 20분)은 이번에 새로 정했습니다.
- 사진: 모두 GenerateImage로 만든 AI 이미지입니다(사람·얼굴·다른 가게 글자 없음). 원본은 img/gen_*.jpg에 있습니다.
  - img/front_desktop.jpg ← gen_facade_16x9_big (r2: bigplate.py로 빈 명판만 1.3배 키우고 벽은 원본 유지), front_mobile.jpg ← gen_facade_9x16 (버건디 명판 '결 / GYEOL HAIR', 유리창 시트 합성)
  - img/products.jpg ← gen_products_3x4 (쇼핑백 로고, SHAMPOO·HAIR OIL 병 라벨 합성)
  - img/towels.jpg ← gen_towels_4x3 (수건 자수 로고, RESERVATION 예약 카드 합성)
  - img/mirror.jpg ← gen_mirror_3x4 (거울 금박 글자 '결 / GYEOL HAIR' 합성)
  - 합성 스크립트: comp.py (공용 ../_lib/comp_lib.py)
- 예약 폼: 브라우저 안에서만 확인하고 아무 데도 보내지 않습니다. 시작 시간은 시술 시간을 더해 19:00 전에 끝나는 칸만 보여 줍니다(r2). 이미 찬 시간은 서버 없이 날짜마다 정해진 규칙으로 두 칸을 막아 보여 줍니다.
- 지도 버튼은 네이버 지도·카카오맵에서 '결 헤어'를 장소명으로 검색합니다.
- 글꼴: LICENSES.md를 보세요.
- 비교 레퍼런스: TONI&GUY 공식 사이트 https://www.toniandguy.com/ 를 2026-11-10 15:24(한국 시간)쯤 직접 열어 1440·390 첫 화면을 캡처했습니다(refs/). 비교용으로만 썼고 로고·사진·문구·코드는 가져오지 않았습니다. sassoonsalon.co.uk도 열어 봤지만 다른 업체 페이지가 떠서 쓰지 않았습니다. junohair.com은 ERR_CONNECTION_CLOSED라 우회하지 않았습니다(refs/log.txt).
