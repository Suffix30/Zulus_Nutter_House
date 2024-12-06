export const calculateSpinSpeed = (): number => {
  return 50 + Math.random() * 30;
};

export const calculateDeceleration = (currentSpeed: number): number => {
  return currentSpeed * 0.98;
};

export const selectRandomPlayers = (names: string[], count: number): string[] => {
  const selectedPlayers: string[] = [];
  const availableNames = [...names];

  while (selectedPlayers.length < count && availableNames.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames.splice(randomIndex, 1)[0];
    selectedPlayers.push(selectedName);
  }

  return selectedPlayers;
};

export const drawWheel = (
  ctx: CanvasRenderingContext2D,
  names: string[],
  rotation: number,
  centerX: number,
  centerY: number,
  radius: number
): void => {
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.shadowColor = 'rgba(0, 242, 255, 0.5)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const outerGradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
  outerGradient.addColorStop(0, '#00f2ff');
  outerGradient.addColorStop(0.5, '#006f75');
  outerGradient.addColorStop(1, '#00f2ff');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
  ctx.strokeStyle = '#00f2ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.shadowColor = 'transparent';

  const allNames = [...names, '?'];
  const sectionAngle = (2 * Math.PI) / allNames.length;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);

  allNames.forEach((name, index) => {
    const angle = (index / allNames.length) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, angle, angle + sectionAngle);
    ctx.lineTo(0, 0);
    ctx.closePath();

    const isMystery = name === '?';
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    
    if (isMystery) {
      gradient.addColorStop(0, '#4a0072');
      gradient.addColorStop(1, '#2a0042');
    } else {
      gradient.addColorStop(0, '#0c1b2a');
      gradient.addColorStop(1, '#060d14');
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = isMystery ? '#ff00ff' : '#00f2ff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.rotate(angle + sectionAngle / 2);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isMystery ? '#ff00ff' : '#00f2ff';
    ctx.font = isMystery ? 'bold 24px Poppins' : 'bold 16px Poppins';
    ctx.shadowColor = isMystery ? '#ff00ff' : '#00f2ff';
    ctx.shadowBlur = 10;
    ctx.fillText(name, radius - 20, 0);
    ctx.restore();
  });

  ctx.restore();

  const centerGradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, 20
  );
  centerGradient.addColorStop(0, '#00f2ff');
  centerGradient.addColorStop(1, '#006f75');

  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = centerGradient;
  ctx.fill();
  ctx.strokeStyle = '#00f2ff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.shadowColor = '#00f2ff';
  ctx.shadowBlur = 15;
  ctx.stroke();

  ctx.restore();
};