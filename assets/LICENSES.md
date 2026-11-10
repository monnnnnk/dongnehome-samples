# 동네홈(가칭) 메인 페이지에 쓴 외부 자료와 라이선스

모두 무료이며, 가입이나 결제 없이 받았습니다. 파일은 이 저장소 안에 들어 있고 외부 CDN을 부르지 않습니다.

| 자료 | 파일 | 출처 | 라이선스 |
|---|---|---|---|
| 음악 Sleepy Bossa (DURU-AI), 30초 발췌, -24 LUFS | assets/sound/music.mp3 | https://github.com/uncle-sheepsky/duru-ai-cc0-bgm (mp3/duru-zoneout-06-sleepy-bossa.mp3) | CC0 1.0 (assets/sound/DURU_CC0_LICENSE.txt). 상업 이용 가능, 표기 의무 없음 |
| 클릭음 click_001 (Kenney Interface Sounds) | assets/sound/click.mp3 | https://github.com/Calinou/kenney-interface-sounds | CC0 1.0 (assets/sound/KENNEY_LICENSE.txt) |
| Lenis 1.3.27 (부드러운 스크롤, 마우스 환경에서만) | assets/vendor/lenis.min.js | https://github.com/darkroomengineering/lenis | MIT (assets/vendor/LENIS_LICENSE.txt) |
| Pretendard (Regular, Medium, SemiBold 서브셋) | assets/fonts/Pretendard-*.subset.woff2 | https://github.com/orioncactus/pretendard | SIL Open Font License 1.1 (assets/fonts/PRETENDARD_LICENSE.txt) |
| 고운바탕 Gowun Batang Regular (이 페이지 글자만 남긴 서브셋) | assets/fonts/GowunBatang-Regular.sub.woff | Google Fonts, https://github.com/yangheeryu/Gowun-Batang | SIL Open Font License 1.1 |

- 소리는 기본으로 꺼져 있습니다. 머리글의 '소리 꺼짐' 버튼을 눌렀을 때만 음악(음량 0.18)과 클릭음(0.25)이 납니다.
- GSAP은 쓰지 않았습니다. 스크롤 모션은 직접 쓴 assets/home.js(transform, opacity만 사용)입니다.
- 영상 assets/media/samples_reel.mp4는 이 저장소의 cafe/, salon/, ramen/ 샘플 화면을 캡처해 위에서 아래로 훑은 18초 무음 영상입니다.
- 첫 화면 카드 assets/img/card_*.jpg(12장)와 샘플 섹션 assets/img/wide_*.jpg(3장)는 각 샘플에 쓰인 무료 스톡 사진을 잘라 한 가지 보정(화이트밸런스, 밝기, 채도, 대비·검정점)을 똑같이 적용한 것입니다(_build/grade_cards.py). AI 생성 이미지는 쓰지 않았습니다.
  - 카페: stock_pour(Nadia Valko), stock_serve(Drew Beamer), stock_beans(Sergey Kotenev), stock_door(Johnny Ho) — Unsplash License, 출처 cafe/PHOTO_CREDITS.md
  - 미용실: stock_designer(Tá Focando), stock_wave(Blaire Harmon), stock_room(Giorgio Trovato), stock_bob(Mecit Tarık Arıöz), stock_consult(Priscilla Du Preez) — Unsplash License, 출처 salon/PHOTO_CREDITS.md
  - 라멘집: s_card_tsukemen(Airam Dato-on, Pexels License), s_band_menu(Susann Schuster), s_card_paitan(Frank from 5 AM Ramen), s_band_kitchen(Perry Merrity II), s_band_shop(Agata Malankiewicz) — Unsplash License 외 표기, 출처 라멘 샘플의 PHOTO_CREDITS.md
- 전환 때 잠깐 보이는 assets/img/{cafe,salon,ramen}_{d,m}.jpg는 각 샘플 첫 화면의 캡처입니다.
- 샘플 속 가게, 메뉴, 가격, 연락처는 모두 가상입니다. 샘플 사진은 무료 스톡 이미지와 일부 AI 생성 이미지입니다. cafe/와 salon/의 사진 출처는 각 폴더의 PHOTO_CREDITS.md에 있습니다.
