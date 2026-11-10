# 결 헤어 — 글꼴 라이선스

| 글꼴 | 용도 | 출처 | 라이선스 | RFN |
|---|---|---|---|---|
| Hahmlet ExtraBold / Medium | 워드마크, 제목, 가격, 사진 속 글자 | github.com/hyper-type/hahmlet · Google Fonts 배포본(가변 글꼴 Hahmlet[wght]에서 fontTools instancer로 800·500 고정 인스턴스 생성) | SIL OFL 1.1 | 없음 |
| Wanted Sans Medium | 본문, 버튼, 입력창 | github.com/wanteddev/wanted-sans (fonts/heavy/에 보관된 공식 배포본) | SIL OFL 1.1 | 없음 |

- 웹폰트: pyftsubset으로 이 페이지(index.html + site.js)에 쓰인 글자 306자만 남겨 woff2로 만들었습니다(fonts/*.subset.woff2). name 테이블은 그대로 두었고 OFL 원문은 fonts/OFL_Hahmlet.txt, OFL_WantedSans.txt로 같이 둡니다.
- 두 OFL 파일 모두 'Reserved Font Name' 지정이 없어 원래 이름을 써도 됩니다.
- 글자를 바꾸면 `python3 subset.py`를 다시 실행해야 합니다.
