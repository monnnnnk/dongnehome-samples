# 소담별 커피 — 글꼴 라이선스

| 글꼴 | 용도 | 출처 | 라이선스 | RFN |
|---|---|---|---|---|
| Bagel Fat One Regular | 워드마크, 제목, 가격, 사진 속 글자 | github.com/JAMO-TYPEFACE/BagelFat · Google Fonts 배포본 (google/fonts ofl/bagelfatone) | SIL OFL 1.1 | 없음 |
| Gowun Dodum Regular | 본문, 버튼, 입력창 | github.com/yangheeryu/Gowun-Dodum · Google Fonts 배포본 (google/fonts ofl/gowundodum) | SIL OFL 1.1 | 없음 |
| Gowun Batang Bold | 사진 속 영문 보조 글자(SODAMBYEOL COFFEE 등)만, 웹폰트로는 안 씀 | google/fonts ofl/gowunbatang | SIL OFL 1.1 | 없음 |

- 웹폰트: pyftsubset으로 이 페이지(index.html + site.js)에 쓰인 글자 310자만 남겨 woff2로 만들었습니다(fonts/*.subset.woff2). name 테이블은 그대로 두었고 OFL 원문은 fonts/OFL_BagelFatOne.txt, OFL_GowunDodum.txt로 같이 둡니다.
- 두 OFL 파일 모두 'Reserved Font Name' 지정이 없어 서브셋에 원래 이름을 써도 됩니다.
- 글자를 바꾸면 `python3 subset.py`를 다시 실행해야 합니다.
