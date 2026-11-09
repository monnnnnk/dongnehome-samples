# Deploy status (Asia/Seoul)

- Package ready: /workspace/dongnehome-samples
- Contents: cafe/, salon/, restaurant/, ramen/.gitkeep, index.html, README.md, .nojekyll
- Target repo: monnnnnk/dongnehome-samples (public)
- Target Pages: https://monnnnnk.github.io/dongnehome-samples/
- Blocker: gh auth device flow in progress (shell 301968). Code expires ~15m.
- After auth: `gh repo create dongnehome-samples --public --source=/workspace/dongnehome-samples --remote=origin --push` then enable Pages from main root (or Actions workflow).
- Do not redesign HTML; restaurant temporary until ramen/ replaces it.
