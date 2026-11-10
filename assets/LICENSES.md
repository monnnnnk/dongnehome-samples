# 동네홈 메인 페이지에 쓴 외부 자료와 라이선스

모두 무료이며, 가입이나 결제 없이 받았습니다. 파일은 이 저장소 안에 들어 있고 외부 CDN을 부르지 않습니다.

| 자료 | 파일 | 출처 | 라이선스 |
|---|---|---|---|
| 음악 Sleepy Bossa (DURU-AI), 30초 발췌, -24 LUFS | assets/sound/music.mp3 | https://github.com/uncle-sheepsky/duru-ai-cc0-bgm (mp3/duru-zoneout-06-sleepy-bossa.mp3) | CC0 1.0 (assets/sound/DURU_CC0_LICENSE.txt). 상업 이용 가능, 표기 의무 없음 |
| 클릭음 click_001 (Kenney Interface Sounds) | assets/sound/click.mp3 | https://github.com/Calinou/kenney-interface-sounds | CC0 1.0 (assets/sound/KENNEY_LICENSE.txt) |
| Lenis 1.3.27 (부드러운 스크롤, 마우스 환경에서만) | assets/vendor/lenis.min.js | https://github.com/darkroomengineering/lenis | MIT (assets/vendor/LENIS_LICENSE.txt) |
| Pretendard (Regular, Medium, SemiBold 서브셋) | assets/fonts/Pretendard-*.subset.woff2 | https://github.com/orioncactus/pretendard | SIL Open Font License 1.1 (assets/fonts/PRETENDARD_LICENSE.txt) |

- 소리는 기본으로 꺼져 있습니다. 머리글의 '소리 꺼짐' 버튼을 눌렀을 때만 음악(음량 0.18)과 클릭음(0.25)이 납니다.
- GSAP은 쓰지 않았습니다. 스크롤 모션은 직접 쓴 assets/home.js(transform, opacity만 사용)입니다.
- 영상 assets/media/samples_reel.mp4는 이 저장소의 cafe/, salon/, ramen/ 샘플 화면을 캡처해 위에서 아래로 훑은 18초 무음 영상입니다.
- 로고: '동네홈' 글자는 Pretendard Bold(OFL 1.1)의 글리프 윤곽을 SVG로 옮긴 뒤 자간을 좁히고(글자 간격 -100/2048em), '홈'의 ㅎ 꼭지를 지붕 모양 삼각형으로 고쳐 그린 것입니다. 집·창 모양 마크는 직접 그린 선(글자 가로획과 같은 굵기 192/2048em)입니다. 만드는 스크립트는 저장소 밖 작업 폴더(_build/r5/wordmark.py, lockup_final.py)에 있습니다. OFL에 따라 글꼴 자체를 따로 팔거나 'Pretendard'라는 이름으로 다시 배포하지 않습니다.
- 첫 화면 기기 띠와 샘플 섹션의 화면 assets/img/scr_*.jpg(12장), 마우스를 올렸을 때 흐르는 긴 화면 assets/img/long_*.jpg(6장)는 동네홈이 만든 세 샘플 페이지(카페, 미용실, 라멘집)를 그대로 캡처한 것입니다. 노트북과 휴대폰 테두리는 특정 제품을 본뜨지 않고 CSS로 그렸습니다. 화면 속 사진의 출처는 각 샘플의 PHOTO_CREDITS.md를 따릅니다.
- 전환 때 잠깐 보이는 assets/img/{cafe,salon,ramen}_{d,m}.jpg는 각 샘플 첫 화면의 캡처입니다.
- 샘플 속 가게, 메뉴, 가격, 연락처는 모두 가상입니다. 샘플 사진은 무료 스톡 이미지와 일부 AI 생성 이미지입니다. cafe/와 salon/의 사진 출처는 각 폴더의 PHOTO_CREDITS.md에 있습니다.
