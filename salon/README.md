# GYEOL 결 헤어 v7 — 첫 화면만 (데모 프로젝트)
- 폰트(r6): 제목·워드마크 Noto Serif KR Light/Regular 서브셋(SIL OFL 1.1) + 본문 Pretendard 서브셋(SIL OFL 1.1). 영문 이탤릭(Bodoni Moda)은 뺐습니다. 모두 `fonts/`에 직접 넣었고 외부 CDN을 부르지 않습니다. 라이선스 원문: `fonts/NotoSerifKR_OFL.txt`, `fonts/PRETENDARD_LICENSE.txt`.
- 그리드: 가운데 축 대칭 3단(카피 | 세로 인물 660px | 문장·디테일 사진), 가운데 워드마크 헤더 바. 카페는 비대칭 12열·풀블리드.
- 색: 트래버틴 #E5E3DE, 머리카락 흑 #1A1B1C(13.4:1), 가위 스틸 #3E4446(7.7:1). 카페의 따뜻한 아이보리·월넛과 달리 차가운 중성.
- 버튼: 각진 1px 테두리 '예약 문의' 하나(sms:, 데모 번호).
- 사진 6장 img/01–06 (raw/ 원본, tools/grade_salon.py: 2배 LANCZOS, 채도 0.72, 쿨 톤, 미세 그레인). 폐기: 사무용 가위처럼 보인 1차 가위 컷, 모션 블러로 AI 티 난 머리결 매크로.
- 첫 화면 사진 비율 1440 51%, 390 64%. QA 375/390/1440: 가로 스크롤 0, 콘솔 0, 404 0, 44px 미만 0.

## 2차 (L/D)
- 백업 _r1_backup/. L=index.html, D=index_dark.html(샷 shots_dark/). D 사진: 같은 인물·니트를 어두운 방 측광으로 다시 생성한 01_back_dark(16:9, 화면 전체).
- 활자 크기: 본문 16 / 제목 데스크톱 42(2.6배, 300, 행간 1.28, 4줄) · 모바일 36(2.25배, 3~4줄) / 라벨 13 / 보조 14. 실제 배경 픽셀 기준 최저 대비 L 7.72, D 8.52.
- 예약: 히어로 안 각진 채움 버튼 '예약 문의하기' 52px 하나(데스크톱 왼쪽 열 아래, 모바일은 사진 왼쪽 아래), 헤더는 밑줄 텍스트 '예약'으로 낮춤.
- QA 375/390/1440: 가로 스크롤 0, 콘솔 0, 404 0, 44px 미만 0.

## Round 3 (D main)
- index.html = dark full page (hero + I Designer[charcoal] / II Services[travertine] / III Work[black] / IV Booking[charcoal] / V Visit[black] / footer). index_light.html = light r2. Backup: _r2_backup/.
- New photos (graded): 02_shears_dark, 07_designer (top 17% cropped, no face), 08_bob, 09_wave, 10_consult (v2: hands not touching), 11_curl.
- Hero h1 2 lines: desktop clamp(28px,2.65vw,40px) = 38.2px @1440 (2.39x body 16); mobile min(36px,9.2vw) = 34.5/35.9px. Mobile photo height max(280px,100svh-400px); CTA under title.
- QA r3: scrollWidth = viewport at 1440/390/375, console 0, 4xx 0, links <44px 0, full-page contrast worst 7.68 (tools/contrast_full.py), open-now JS Asia/Seoul, reveal only with prefers-reduced-motion:no-preference.

## Round 4
- Backup: _r3_backup/ (index, img, shots incl. full_*). Hero + services band untouched (hero pixels identical; services same layout).
- Work → light style-example set: 12_bob_side (4:3, 768px = 53% @1440), 13_wave_light, 14_color (rosewood). Captions "스타일 예시", note: not real clients.
- Rhythm: booking section → travertine (A). Sequence D·C·L·D·L·D. Compared with B (work on #2C2D2E): B still read as 3 dark blocks in a row.
- Designer/visit desktop: padding 128→88, head margin 64→40, designer photo 440→360 centred. Heights 926→733, 641→537.
