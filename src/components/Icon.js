import { PALETTE } from "../constants";

export default function makeIcon(k, parent, posVec2, imageData, subtitle) {
  // Create container for all icon elements
  const iconContainer = parent.add([
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  // Add decorative background with girly styling
  const decorativeBg = iconContainer.add([
    k.circle(imageData.width / 2 + 20),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.opacity(0.1),
    k.z(-2),
  ]);

  // Add outer glow effect
  const outerGlow = iconContainer.add([
    k.circle(imageData.width / 2 + 30),
    k.color(k.Color.fromHex(PALETTE.color3)),
    k.opacity(0.05),
    k.z(-3),
  ]);

  const icon = iconContainer.add([
    k.sprite(imageData.name, {
      width: imageData.width,
      height: imageData.height,
    }),
    k.anchor("center"),
    k.z(1),
  ]);

  // Add sparkle effects around the icon
  const sparkles = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const radius = imageData.width / 2 + 35;
    const sparkle = iconContainer.add([
      k.circle(2 + Math.random() * 3),
      k.color(k.Color.fromHex(PALETTE.color2)),
      k.pos(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ),
      k.opacity(0.6),
      k.z(5),
    ]);
    sparkles.push({ sparkle, angle, radius });
  }

  // Add floating hearts
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    const heart = iconContainer.add([
      k.circle(4 + Math.random() * 3),
      k.color(k.Color.fromHex(PALETTE.color2)),
      k.pos(
        (Math.random() - 0.5) * (imageData.width + 60),
        (Math.random() - 0.5) * (imageData.height + 60)
      ),
      k.opacity(0.3 + Math.random() * 0.2),
      k.z(10),
    ]);
    hearts.push(heart);
  }

  const subtitleText = iconContainer.add([
    k.text(subtitle, { font: "ibm-bold", size: 32 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, 100),
    k.z(2),
  ]);

  // Add subtitle background for better readability
  const subtitleBg = iconContainer.add([
    k.rect(subtitle.length * 20 + 20, 45, { radius: 15 }),
    k.color(k.Color.fromHex(PALETTE.color5)),
    k.opacity(0.1),
    k.anchor("center"),
    k.pos(0, 100),
    k.z(1),
  ]);

  // Animate decorative elements
  iconContainer.onUpdate(() => {
    // Rotate sparkles around the icon
    sparkles.forEach((sparkleData, index) => {
      sparkleData.angle += 0.01;
      sparkleData.sparkle.pos.x = Math.cos(sparkleData.angle) * sparkleData.radius;
      sparkleData.sparkle.pos.y = Math.sin(sparkleData.angle) * sparkleData.radius;
      sparkleData.sparkle.opacity = 0.6 + Math.sin(k.time() * 3 + index) * 0.3;
    });

    // Animate hearts with gentle floating
    hearts.forEach((heart, index) => {
      heart.pos.y += Math.sin(k.time() * 1.5 + index * 2) * 0.2;
      heart.opacity = 0.3 + Math.sin(k.time() * 2 + index * 1.5) * 0.15;
      
      // Gentle scale pulsing
      const scale = 1 + Math.sin(k.time() * 2.5 + index) * 0.15;
      heart.scale = k.vec2(scale, scale);
    });

    // Add gentle pulsing to background elements
    const pulseScale = 1 + Math.sin(k.time() * 2) * 0.05;
    decorativeBg.scale = k.vec2(pulseScale, pulseScale);
    outerGlow.scale = k.vec2(pulseScale * 1.1, pulseScale * 1.1);
  });

  // Make iconContainer behave like the original icon for external usage
  iconContainer.width = imageData.width;
  iconContainer.height = imageData.height;

  return [iconContainer, subtitleText];
}
