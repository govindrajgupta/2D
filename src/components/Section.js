import { PALETTE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide = null) {
  // Create main section container
  const sectionContainer = k.add([
    k.anchor("center"),
    k.pos(posVec2),
  ]);

  // Add decorative background layers
  const outerGlow = sectionContainer.add([
    k.rect(240, 240, { radius: 25 }),
    k.anchor("center"),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.opacity(0.1),
    k.z(-3),
  ]);

  const middleLayer = sectionContainer.add([
    k.rect(220, 220, { radius: 20 }),
    k.anchor("center"),
    k.color(k.Color.fromHex(PALETTE.color3)),
    k.opacity(0.15),
    k.z(-2),
  ]);

  const section = sectionContainer.add([
    k.rect(200, 200, { radius: 15 }),
    k.anchor("center"),
    k.area(),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.opacity(0.8),
    sectionName,
  ]);

  // Add floating decorative elements around the section
  const decorativeElements = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 150 + Math.random() * 50;
    const element = sectionContainer.add([
      k.circle(4 + Math.random() * 6),
      k.color(k.Color.fromHex(i % 2 === 0 ? PALETTE.color2 : PALETTE.color3)),
      k.pos(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ),
      k.opacity(0.4 + Math.random() * 0.3),
      k.z(5),
    ]);
    decorativeElements.push({ element, angle, radius, speed: 0.5 + Math.random() * 0.5 });
  }

  // Add enhanced title with shadow effect
  const titleShadow = sectionContainer.add([
    k.text(sectionName, { font: "ibm-bold", size: 64 }),
    k.color(k.Color.fromHex(PALETTE.color4)),
    k.anchor("center"),
    k.pos(2, -148),
    k.opacity(0.3),
    k.z(1),
  ]);

  const title = sectionContainer.add([
    k.text(sectionName, { font: "ibm-bold", size: 64 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, -150),
    k.z(2),
  ]);

  // Add floating hearts around the section
  const hearts = [];
  for (let i = 0; i < 4; i++) {
    const heart = sectionContainer.add([
      k.circle(6 + Math.random() * 4),
      k.color(k.Color.fromHex(PALETTE.color2)),
      k.pos(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      ),
      k.opacity(0.3 + Math.random() * 0.2),
      k.z(10),
    ]);
    hearts.push(heart);
  }

  // Animate decorative elements
  sectionContainer.onUpdate(() => {
    // Rotate decorative elements around the section
    decorativeElements.forEach((elem, index) => {
      elem.angle += elem.speed * 0.01;
      elem.element.pos.x = Math.cos(elem.angle) * elem.radius;
      elem.element.pos.y = Math.sin(elem.angle) * elem.radius;
      elem.element.opacity = 0.4 + Math.sin(k.time() * 2 + index) * 0.2;
    });

    // Animate hearts with gentle floating
    hearts.forEach((heart, index) => {
      heart.pos.y += Math.sin(k.time() * 1.5 + index * 2) * 0.3;
      heart.opacity = 0.3 + Math.sin(k.time() * 2 + index * 1.5) * 0.15;
      
      // Gentle pulsing effect
      const scale = 1 + Math.sin(k.time() * 3 + index) * 0.1;
      heart.scale = k.vec2(scale, scale);
    });

    // Add gentle pulsing to section layers
    const pulseScale = 1 + Math.sin(k.time() * 1.5) * 0.02;
    outerGlow.scale = k.vec2(pulseScale, pulseScale);
    middleLayer.scale = k.vec2(pulseScale * 0.98, pulseScale * 0.98);
  });

  if (onCollide) {
    const onCollideHandler = section.onCollide("player", () => {
      onCollide(sectionContainer);
      onCollideHandler.cancel();
    });
  }

  return sectionContainer;
}
