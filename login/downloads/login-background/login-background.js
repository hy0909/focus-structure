// 로그인 배경 움직임: 파랑·하늘 빛이 무작위 좌표로 계속 이동한다.
// 기기에서 움직임 줄이기를 켜면 멈추고, 탭이 숨겨지면 잠시 쉰다.
(() => {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lights = [...document.querySelectorAll(".login-background__light--blue, .login-background__light--sky")];
  const running = new Map();
  const positions = new Map();
  const random = (min, max) => min + Math.random() * (max - min);

  function move(light) {
    if (motionPreference.matches || document.hidden) return;
    const previous = positions.get(light) || { x: 0, y: 0, scale: 1 };
    let next;
    // 아주 가까운 좌표를 연달아 고르면 멈춘 듯 보여서 최소 거리를 둔다
    do {
      next = { x: random(-27, 27), y: random(-27, 27), scale: random(.88, 1.16) };
    } while (Math.hypot(next.x - previous.x, next.y - previous.y) < 18);
    const transform = (q) => `translate(${q.x}vw, ${q.y}vh) scale(${q.scale})`;
    const animation = light.animate(
      [{ transform: transform(previous) }, { transform: transform(next) }],
      { duration: random(3800, 6800), easing: "cubic-bezier(.45, 0, .55, 1)", fill: "forwards" }
    );
    running.set(light, animation);
    animation.onfinish = () => {
      light.style.transform = transform(next);
      positions.set(light, next);
      animation.cancel();
      running.delete(light);
      move(light);
    };
  }

  function syncMotion() {
    if (motionPreference.matches) {
      for (const animation of running.values()) animation.cancel();
      running.clear();
      return;
    }
    for (const light of lights) {
      const animation = running.get(light);
      if (document.hidden) animation?.pause();
      else if (animation) animation.play();
      else move(light);
    }
  }
  motionPreference.addEventListener("change", syncMotion);
  document.addEventListener("visibilitychange", syncMotion);
  syncMotion();
})();
