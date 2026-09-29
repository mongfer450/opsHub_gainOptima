import { Calculator, ClipboardList, Folder, Link2, TrendingUp, Wallet } from "lucide-react";
import { GYMMO_LOGO } from "../assets/logos";
import { GOLD_DARK } from "../config/constants";

const ICONS = {
  calculator: Calculator,
  folder: Folder,
  link: Link2,
  list: ClipboardList,
  trending: TrendingUp,
  wallet: Wallet,
};

export function ShortcutIcon({ name, size = 17 }) {
  if (name === "gymmo") {
    return <img src={GYMMO_LOGO} alt="" style={{ width: size + 3, height: size + 3, objectFit: "contain" }} />;
  }
  const Icon = ICONS[name] || Link2;
  return <Icon size={size} color={GOLD_DARK} aria-hidden="true" />;
}
