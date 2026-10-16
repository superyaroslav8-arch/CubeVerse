// Simple interactions for CubeVerse
document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'rgba(0, 242, 254, 0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
});

console.log('CubeVerse loaded successfully!');
