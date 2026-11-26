# 로그인 배경

Focus AI 로그인 화면 배경 파일이에요. 브라우저로 `index.html`을 열면 바로 볼 수 있어요.

## 파일

| 파일 | 내용 |
|---|---|
| `login-background.css` | 바탕색, 빛 5개, 그레인 질감, 가장자리 어둡게 |
| `login-background.js` | 파랑·하늘 빛을 무작위로 움직이는 코드 |
| `index.html` | 두 파일을 붙인 미리보기 |

## 붙이는 법

1. CSS와 JS를 페이지에 넣어요.
2. 아래 마크업을 `body` 맨 앞에 넣어요. 배경은 `position: fixed`, `z-index: 0`이라 화면 내용은 `position: relative; z-index: 1` 이상으로 올려야 보여요.

```html
<div class="login-background" aria-hidden="true">
  <div class="login-background__stage">
    <span class="login-background__light login-background__light--blue"></span>
    <span class="login-background__light login-background__light--sky"></span>
    <span class="login-background__light login-background__light--teal"></span>
    <span class="login-background__light login-background__light--bottom-right"></span>
    <span class="login-background__light login-background__light--bottom-left"></span>
  </div>
</div>
```

## 알아 둘 점

- 크기·위치·흐림은 화면 비율(vmax, vw, vh)로 잡아서 화면이 커지면 같이 커져요.
- 색은 `.login-background`의 `--blue`, `--sky`, `--teal`, 빛 진하기는 `--glow-opacity`로 바꿔요.
- 그레인 질감은 `.login-background::before`의 `opacity`(지금 0.32)로 진하기를 조절해요.
- 기기에서 움직임 줄이기를 켜면 배경이 멈춰요.
- JS를 넣지 않으면 청록·오른쪽 아래 빛만 CSS 애니메이션으로 움직이고 파랑·하늘 빛은 멈춰 있어요.
