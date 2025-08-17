document.querySelectorAll('.tooltip-container').forEach(container => {
  const tooltip = container.querySelector('.tooltip-descripcion');

  container.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.pointerEvents = 'auto';

    const rect = tooltip.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
      tooltip.style.left = 'auto';
      tooltip.style.right = '0';
      tooltip.style.transform = 'none';
    }

    else if (rect.left < 0) {
      tooltip.style.left = '0';
      tooltip.style.right = 'auto';
      tooltip.style.transform = 'none';
    }
    else {
      tooltip.style.left = '50%';
      tooltip.style.right = 'auto';
      tooltip.style.transform = 'translateX(-50%)';
    }
  });

  container.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.pointerEvents = 'none';
  });
});