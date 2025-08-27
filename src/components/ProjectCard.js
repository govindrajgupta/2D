import { PALETTE } from "../constants";
import {
  isProjectModalVisibleAtom,
  chosenProjectDataAtom,
  store,
} from "../store";
import { opacityTrickleDown } from "../utils";

export default function makeProjectCard(k, parent, posVec2, data, thumbnail) {
  const card = parent.add([
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  // Add girly decorative background
  const decorativeBg = card.add([
    k.rect(660, 380, { radius: 20 }),
    k.anchor("center"),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.opacity(0.1),
    k.z(-2),
  ]);

  // Add subtle glow effect
  const glowEffect = card.add([
    k.rect(680, 400, { radius: 25 }),
    k.anchor("center"),
    k.color(k.Color.fromHex(PALETTE.color3)),
    k.opacity(0.05),
    k.z(-3),
  ]);

  const cardMask = card.add([
    k.rect(640, 360, { radius: 15 }),
    k.anchor("center"),
    k.mask("intersect"),
    k.opacity(0),
  ]);

  const image = cardMask.add([
    k.sprite(thumbnail, { width: 640, height: 360 }),
    k.anchor("center"),
    k.opacity(0),
  ]);

  // Add decorative sparkles around the card
  const sparkles = [];
  for (let i = 0; i < 6; i++) {
    const sparkle = card.add([
      k.circle(3 + Math.random() * 4),
      k.color(k.Color.fromHex(PALETTE.color2)),
      k.pos(
        (Math.random() - 0.5) * 700,
        (Math.random() - 0.5) * 400
      ),
      k.opacity(0),
      k.z(10),
    ]);
    sparkles.push(sparkle);
  }

  const cardTitle = card.add([
    k.text(data.title, {
      font: "ibm-bold",
      size: 32,
      width: 600,
      lineSpacing: 12,
    }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(-310, 200),
    k.opacity(0),
  ]);

  // Enhanced girly switch button with heart shape
  const cardSwitch = card.add([
    k.circle(35),
    k.area(),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.pos(400, 0),
    k.opacity(0),
  ]);

  // Add inner heart effect to switch
  const switchHeart = card.add([
    k.circle(20),
    k.color(k.Color.fromHex(PALETTE.color5)),
    k.pos(400, 0),
    k.opacity(0),
  ]);

  // Add floating animation to sparkles
  sparkles.forEach((sparkle, index) => {
    sparkle.onUpdate(() => {
      sparkle.opacity = Math.max(0, (card.opacity - 0.5) * 2) * (0.3 + Math.sin(k.time() * 2 + index) * 0.2);
      sparkle.pos.y += Math.sin(k.time() * 1.5 + index * 2) * 0.5;
    });
  });

  // Add hover effect to switch
  cardSwitch.onUpdate(() => {
    const scale = 1 + Math.sin(k.time() * 3) * 0.1;
    cardSwitch.scale = k.vec2(scale, scale);
    switchHeart.scale = k.vec2(scale * 0.8, scale * 0.8);
  });

  cardSwitch.onCollide("player", () => {
    store.set(isProjectModalVisibleAtom, true);
    store.set(chosenProjectDataAtom, data);
  });

  opacityTrickleDown(parent, [decorativeBg, glowEffect, cardMask, image, cardTitle, cardSwitch, switchHeart, ...sparkles]);

  return card;
}
