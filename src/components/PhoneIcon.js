import { PALETTE } from "../constants";
import { phoneAtom, isPhoneModalVisibleAtom, store } from "../store";
import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";

export default function makePhoneIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  phone
) {
  const [phoneIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const phoneSwitch = phoneIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  phoneSwitch.onCollide("player", () => {
    store.set(isPhoneModalVisibleAtom, true);
    store.set(phoneAtom, phone);
  });

  opacityTrickleDown(parent, [subtitleText, phoneSwitch]);

  return phoneIcon;
}
