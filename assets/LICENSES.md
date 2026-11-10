# 동네홈 메인 페이지에 쓴 외부 자료와 라이선스

모두 무료이며, 가입이나 결제 없이 받았습니다. 파일은 이 저장소 안에 들어 있고 외부 CDN을 부르지 않습니다.

| 자료 | 파일 | 출처 | 라이선스 |
|---|---|---|---|
| 음악 Sleepy Bossa (DURU-AI), 30초 발췌, -24 LUFS | assets/sound/music.mp3 | https://github.com/uncle-sheepsky/duru-ai-cc0-bgm (mp3/duru-zoneout-06-sleepy-bossa.mp3) | CC0 1.0 (assets/sound/DURU_CC0_LICENSE.txt). 상업 이용 가능, 표기 의무 없음 |
| 클릭음 click_001 (Kenney Interface Sounds) | assets/sound/click.mp3 | https://github.com/Calinou/kenney-interface-sounds | CC0 1.0 (assets/sound/KENNEY_LICENSE.txt) |
| 사진 '좁은 주택가 골목' (Narrow Concrete Alleyway Between Houses) — 근형 김 | assets/img/r8/alley_d.jpg, alley_m.jpg (원본: assets/img/r8/src/pexels-6672769_original.jpg) | https://www.pexels.com/photo/narrow-concrete-alleyway-between-houses-6672769/ | Pexels License (무료, 상업 이용 가능, 표기 의무 없음). 아래쪽만 잘라 쓰고(집 번호판·벽 숫자 제외) _brief/film.py로 색을 낮추고 선명도를 줄이고 필름 입자를 더함 |
| 사진 '커피잔과 빈 의자' (Coffee Cups on Table Near Empty Chair) — Sare | assets/img/r8/window_d.jpg, window_m.jpg (원본: assets/img/r8/src/pexels-18457617_original.jpg) | https://www.pexels.com/photo/18457617/ | Pexels License. _brief/film.py로 같은 필름 처리 |
| Noto Serif KR (Light 300 고정, 제목 글자만 서브셋) | assets/fonts/NotoSerifKR-300.r8.woff2 | https://github.com/notofonts/noto-cjk | SIL Open Font License 1.1 (assets/fonts/NOTOSERIFKR_OFL.txt) |
| Pretendard (Regular, Medium, SemiBold 서브셋) | assets/fonts/Pretendard-{400,500,600}.r7.woff2 | https://github.com/orioncactus/pretendard | SIL Open Font License 1.1 (assets/fonts/PRETENDARD_LICENSE.txt) |

- 소리는 기본으로 꺼져 있습니다. 바닥글의 '소리 켜기' 버튼을 눌렀을 때만 음악(음량 0.18)과 클릭음(0.25)이 납니다.
- GSAP은 쓰지 않았습니다. 스크롤 모션은 직접 쓴 assets/home.js(transform, opacity만 사용)입니다.
- 영상 assets/media/samples_reel_r7.mp4(포스터 samples_reel_r7_poster.jpg)는 이 저장소의 cafe/, salon/, ramen/ 샘플 화면을 캡처해 위에서 아래로 훑은 17초 무음 영상입니다. 첫 화면과 샘플 목록의 화면 캡처(assets/img/r7/)도 같은 샘플에서 찍었습니다.
- 스크롤 라이브러리(Lenis)는 2차에서 뺐습니다.
- 로고: '동네홈' 글자는 Pretendard Bold(OFL 1.1)의 글리프 윤곽을 SVG로 옮긴 뒤 자간을 좁히고(글자 간격 -100/2048em), '홈'의 ㅎ 꼭지를 지붕 모양 삼각형으로 고쳐 그린 것입니다. 집·창 모양 마크는 직접 그린 선(글자 가로획과 같은 굵기 192/2048em)입니다. 만드는 스크립트는 저장소 밖 작업 폴더(_build/r5/wordmark.py, lockup_final.py)에 있습니다. OFL에 따라 글꼴 자체를 따로 팔거나 'Pretendard'라는 이름으로 다시 배포하지 않습니다.
- 첫 화면 기기 띠와 샘플 섹션의 화면 assets/img/scr_*.jpg(12장), 마우스를 올렸을 때 흐르는 긴 화면 assets/img/long_*.jpg(6장)는 동네홈이 만든 세 샘플 페이지(카페, 미용실, 라멘집)를 그대로 캡처한 것입니다. 노트북과 휴대폰 테두리는 특정 제품을 본뜨지 않고 CSS로 그렸습니다. 화면 속 사진의 출처는 각 샘플의 PHOTO_CREDITS.md를 따릅니다.
- 전환 때 잠깐 보이는 assets/img/{cafe,salon,ramen}_{d,m}.jpg는 각 샘플 첫 화면의 캡처입니다.
- 샘플 속 가게, 메뉴, 가격, 연락처는 모두 가상입니다. 샘플 사진은 무료 스톡 이미지와 일부 AI 생성 이미지입니다. cafe/와 salon/의 사진 출처는 각 폴더의 PHOTO_CREDITS.md에 있습니다.

- 첫 화면의 휴대폰 화면(assets/img/r8/ramen_phone_dark.jpg)은 이 저장소의 ramen/ 샘플을 어두운 모드로 찍은 캡처입니다.
- 첫 화면의 손그림 화살표는 동네홈이 직접 만든 것입니다(_brief/hand_arrow.py, 파이썬으로 펜 굵기와 손떨림을 넣어 그림).

## r9 (2026-11-10) 메인에서 내린 파일
메인을 판매 페이지로 줄이면서 아래 파일은 화면에서 빠졌어요. 파일은 남겨 두지만 배포 목록에서는 뺍니다:
골목 사진(alley_d/m.jpg), 창가 사진(window_d/m.jpg), 라멘 휴대폰 다크 캡처(ramen_phone_dark.jpg), 디테일 크롭(detail_*.jpg), 손그림 화살표, 샘플 영상(samples_reel_r7.mp4·poster).

## r10 (2026-11-10)
메인 레이아웃은 apple.com/kr 의 간격·글자 크기 비율을 재서 우리 CSS로 다시 썼어요 (Apple 로고·사진·문구·코드·글꼴은 쓰지 않음). 글꼴은 Pretendard 400/600만 써요.
메인에서 내린 파일 (남겨 두지만 배포 목록에서 뺌): tokens.css(메인은 안 씀), NotoSerifKR-300.r8.woff2, Pretendard-500.r7.woff2, sound/music.mp3·click.mp3, img/r7/*_s.jpg·*_sm.jpg.
r10 보강: assets/img/r10/*.jpg 는 우리 샘플(cafe·salon·ramen)과 메인 문의 부분을 390px 화면에서 직접 캡처한 것 (_compare/r10/cap_r10_assets.py). 사진 출처는 각 샘플의 PHOTO_CREDITS.md 를 따릅니다.
r10.1: assets/img/r10/main_end_m.jpg = 메인 페이지(390px)에서 문의 위 섹션을 캡처할 때만 숨기고 머리말·문의·푸터를 한 번에 찍은 것 (이어 붙이기·내용 추가 없음).
