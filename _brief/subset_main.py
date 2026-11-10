# 메인 페이지 글자로 Pretendard 400/500/600 서브셋을 다시 만든다. 문구를 바꾸면 다시 실행.
import re,html,subprocess,os
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
raw=open('index.html',encoding='utf-8').read()
s=re.sub(r'<script.*?</script>|<style.*?</style>','',raw,flags=re.S)
t=html.unescape(re.sub(r'<[^>]+>',' ',s))+' '.join(re.findall(r'(?:aria-label|alt|title|content)="([^"]*)"',raw))
t+=' '.join(re.findall(r"'([^']*[가-힣][^']*)'",open('assets/home.js',encoding='utf-8').read()))
t+=''.join(chr(c) for c in range(32,127))+'→·—…“”‘’©'
open('/tmp/chars_main','w').write(''.join(sorted(set(t))))
PRET='/usr/share/fonts/truetype/sand-box/custom/Pretendard/Pretendard-{}.otf'
for w,n in [(400,'Regular'),(500,'Medium'),(600,'SemiBold')]:
  subprocess.run(['pyftsubset',PRET.format(n),'--text-file=/tmp/chars_main','--flavor=woff2','--layout-features=kern,liga,tnum','--output-file=assets/fonts/Pretendard-%d.r7.woff2'%w],check=True)
