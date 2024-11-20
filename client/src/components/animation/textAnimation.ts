import confetti from 'canvas-confetti';

export function showPointIncreaseEffect() {
  const pointText = document.createElement('div');
  pointText.innerText = '등급이 올랐어요';
  pointText.style.position = 'fixed';
  pointText.style.top = '13%';
  pointText.style.left = '80%';
  pointText.style.transform = 'translate(-50%, -50%)';
  pointText.style.color = 'gold';
  pointText.style.fontSize = '30px';
  pointText.style.fontWeight = 'bold';
  pointText.style.zIndex = '9999';
  pointText.style.opacity = '1';

  document.body.appendChild(pointText);

  // 텍스트가 서서히 사라지도록 애니메이션 설정
  let opacity = 1;
  const fadeOut = setInterval(() => {
    opacity -= 0.05;
    pointText.style.opacity = String(opacity);
    if (opacity <= 0) {
      clearInterval(fadeOut);
      document.body.removeChild(pointText);
    }
  }, 150);
}
