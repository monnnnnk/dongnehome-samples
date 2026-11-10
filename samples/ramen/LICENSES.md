# 라멘 소라 — 글꼴 라이선스

| 글꼴 | 용도 | 출처 | 라이선스 | RFN |
|---|---|---|---|---|
| Gasoek One Regular | 워드마크, 제목, 사진 속 글자 | github.com/JAMO-TYPEFACE/Gasoek (fonts/heavy/에 보관된 공식 배포본) | SIL OFL 1.1 | 없음 |
| Gowun Batang Regular/Bold | 본문, 영문 라벨 | github.com/yangheeryu/Gowun-Batang · Google Fonts 배포본 (OFL 원문은 google/fonts 저장소 ofl/gowunbatang/OFL.txt) | SIL OFL 1.1 | 없음 |

- 웹폰트: pyftsubset으로 이 페이지(index.html + site.js)에 쓰인 글자 332자만 남겨 woff2로 만들었습니다(fonts/*.subset.woff2). name 테이블(저작권·라이선스 문구)은 그대로 두었고, OFL 원문은 fonts/OFL_GasoekOne.txt, OFL_GowunBatang.txt로 같이 둡니다.
- 예약 글꼴 이름(RFN): 두 OFL 파일 모두 저작권 줄 뒤에 'Reserved Font Name' 지정이 없어서, 서브셋에 원래 이름을 써도 됩니다. 파일명에 '.subset'을 붙여 줄인 파일임을 표시했습니다.
- 글자를 바꾸면 `python3 subset.py`를 다시 실행해야 합니다.
