import confetti from 'canvas-confetti';

export function firework() {
  // 최상단 canvas 생성
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none'; // 클릭 이벤트 방지
  canvas.style.zIndex = '9999'; // 가장 위로 설정
  document.body.appendChild(canvas);

  const confettiInstance = confetti.create(canvas, { resize: true });

  const duration = 15 * 100;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 50, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      // 애니메이션 종료 후 canvas 제거
      document.body.removeChild(canvas);
      return;
    }

    const particleCount = 100 * (timeLeft / duration);
    confettiInstance(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confettiInstance(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}
