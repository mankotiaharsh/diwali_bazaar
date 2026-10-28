import diyaMitti from "../assets/items/diya-mitti.svg";
import diyaGolden from "../assets/items/diya-golden.svg";
import diyaRangoli from "../assets/items/diya-rangoli.svg";
import laddoo from "../assets/items/mithai-laddoo.svg";
import jalebi from "../assets/items/mithai-jalebi.svg";
import kajuKatli from "../assets/items/mithai-kaju-katli.svg";
import gulabJamun from "../assets/items/mithai-gulab-jamun.svg";
import rasgulla from "../assets/items/mithai-rasgulla.svg";
import soanPapdi from "../assets/items/mithai-soan-papdi.svg";
import phuljhadi from "../assets/items/patakhe-phuljhadi.svg";
import anaar from "../assets/items/patakhe-anaar.svg";
import chakri from "../assets/items/patakhe-chakri.svg";
import rocket from "../assets/items/patakhe-rocket.svg";
import sutliBomb from "../assets/items/patakhe-sutli-bomb.svg";
import pencil from "../assets/items/patakhe-pencil.svg";
import genda from "../assets/items/phool-genda.svg";
import gulab from "../assets/items/phool-gulab.svg";
import kamal from "../assets/items/phool-kamal.svg";
import mogra from "../assets/items/phool-mogra.svg";
import mala from "../assets/items/phool-mala.svg";
import pankhudi from "../assets/items/phool-pankhudi.svg";
import milkChoco from "../assets/items/chocolate-milk.svg";
import darkChoco from "../assets/items/chocolate-dark.svg";
import chocoBox from "../assets/items/chocolate-box.svg";
import truffles from "../assets/items/chocolate-truffles.svg";
import chocoCoins from "../assets/items/chocolate-coins.svg";
import kandil from "../assets/items/sajavat-kandil.svg";
import rangoli from "../assets/items/sajavat-rangoli.svg";
import toran from "../assets/items/sajavat-toran.svg";
import lights from "../assets/items/sajavat-lights.svg";
import candles from "../assets/items/sajavat-candles.svg";
import charan from "../assets/items/sajavat-charan.svg";
import moli from "../assets/items/pooja-moli.svg";
import roli from "../assets/items/pooja-roli.svg";
import akshat from "../assets/items/pooja-akshat.svg";
import haldiKumkum from "../assets/items/pooja-haldi-kumkum.svg";
import agarbatti from "../assets/items/pooja-agarbatti.svg";
import kapoor from "../assets/items/pooja-kapoor.svg";
import kalash from "../assets/items/pooja-kalash.svg";
import ghanti from "../assets/items/pooja-ghanti.svg";
import dryFruits from "../assets/items/dry-fruits.svg";
import note from "../assets/items/note.svg";

export type ItemId =
  | "diya"
  | "mithai"
  | "patakhe"
  | "dry-fruits"
  | "chocolate"
  | "phool"
  | "sajavat"
  | "pooja";

export type ShelfKind = "free" | "soon" | "note";

export interface ShopItem {
  id: ItemId | "note";
  name: string;
  image: string;
  kind: ShelfKind;
  blurb: string;
}

/** One variant of an item that comes in several designs (diya, mithai, phool…). */
export interface ItemStyle {
  id: string;
  name: string;
  image: string;
  blurb: string;
}

const DIYA_STYLES: ItemStyle[] = [
  { id: "mitti", name: "Mitti Diya", image: diyaMitti, blurb: "A classic clay diya, just like home." },
  { id: "golden", name: "Golden Deepak", image: diyaGolden, blurb: "A brass deepak for the pooja room." },
  { id: "rangoli", name: "Rangoli Diya", image: diyaRangoli, blurb: "Hand-painted in festive colours." },
];

const MITHAI_STYLES: ItemStyle[] = [
  { id: "laddoo", name: "Besan Laddoo", image: laddoo, blurb: "A plate of classic golden besan laddoos." },
  { id: "jalebi", name: "Jalebi", image: jalebi, blurb: "Crisp, syrupy swirls, fresh off the kadhai." },
  { id: "kaju-katli", name: "Kaju Katli", image: kajuKatli, blurb: "Silver-leaf cashew diamonds — the Diwali favourite." },
  { id: "gulab-jamun", name: "Gulab Jamun", image: gulabJamun, blurb: "Soft, warm and soaked in rose syrup." },
  { id: "rasgulla", name: "Rasgulla", image: rasgulla, blurb: "Spongy chhena balls in light syrup." },
  { id: "soan-papdi", name: "Soan Papdi", image: soanPapdi, blurb: "The flaky box everyone gifts (and re-gifts)." },
];

const PATAKHE_STYLES: ItemStyle[] = [
  { id: "phuljhadi", name: "Phuljhadi", image: phuljhadi, blurb: "A sparkler to write your name in the air." },
  { id: "anaar", name: "Anaar", image: anaar, blurb: "A fountain of golden sparks." },
  { id: "chakri", name: "Chakri", image: chakri, blurb: "A ground spinner that whirls in circles of light." },
  { id: "rocket", name: "Rocket", image: rocket, blurb: "Up, up and away into the night sky." },
  { id: "sutli-bomb", name: "Sutli Bomb", image: sutliBomb, blurb: "The loud one — cover your ears!" },
  { id: "pencil", name: "Colour Pencil", image: pencil, blurb: "Bright coloured flames, safe for little hands." },
];

const PHOOL_STYLES: ItemStyle[] = [
  { id: "genda", name: "Genda", image: genda, blurb: "Bright marigolds, the heart of every pooja." },
  { id: "gulab", name: "Gulab", image: gulab, blurb: "A red rose, because some things never go out of style." },
  { id: "kamal", name: "Kamal", image: kamal, blurb: "The lotus — Goddess Lakshmi's own flower." },
  { id: "mogra", name: "Mogra", image: mogra, blurb: "Jasmine that fills the house with fragrance." },
  { id: "mala", name: "Genda Mala", image: mala, blurb: "A marigold garland for the mandir." },
  { id: "pankhudi", name: "Gulab Pankhudi", image: pankhudi, blurb: "A bowl of rose petals to shower blessings." },
];

const CHOCOLATE_STYLES: ItemStyle[] = [
  { id: "milk", name: "Milk Chocolate", image: milkChoco, blurb: "The classic creamy bar." },
  { id: "dark", name: "Dark Chocolate", image: darkChoco, blurb: "Rich and a little bitter, for grown-up tastes." },
  { id: "box", name: "Gift Box", image: chocoBox, blurb: "An assorted box tied with a golden ribbon." },
  { id: "truffles", name: "Truffles", image: truffles, blurb: "Melt-in-the-mouth truffles in gold cups." },
  { id: "coins", name: "Chocolate Coins", image: chocoCoins, blurb: "Golden coins for a prosperous year." },
];

const SAJAVAT_STYLES: ItemStyle[] = [
  { id: "kandil", name: "Akash Kandil", image: kandil, blurb: "A lantern to light the doorway." },
  { id: "rangoli", name: "Rangoli", image: rangoli, blurb: "Colours at the door to welcome Lakshmi." },
  { id: "toran", name: "Toran", image: toran, blurb: "Mango leaves and marigolds over the entrance." },
  { id: "lights", name: "Fairy Lights", image: lights, blurb: "Twinkling lights for every balcony." },
  { id: "candles", name: "Candles", image: candles, blurb: "Colourful candles to glow all night." },
  { id: "charan", name: "Lakshmi Charan", image: charan, blurb: "Little footprints to welcome Lakshmi home." },
];

const POOJA_STYLES: ItemStyle[] = [
  { id: "moli", name: "Moli", image: moli, blurb: "Sacred red-yellow kalava thread for the wrist." },
  { id: "roli", name: "Roli Tika", image: roli, blurb: "Red roli for the tilak on the forehead." },
  { id: "akshat", name: "Akshat", image: akshat, blurb: "Unbroken rice to go with the tilak." },
  { id: "haldi-kumkum", name: "Haldi Kumkum", image: haldiKumkum, blurb: "Turmeric and kumkum, for every auspicious start." },
  { id: "agarbatti", name: "Agarbatti", image: agarbatti, blurb: "Incense to fill the room with fragrance." },
  { id: "kapoor", name: "Kapoor", image: kapoor, blurb: "Camphor for the aarti flame." },
  { id: "kalash", name: "Kalash", image: kalash, blurb: "A copper kalash with mango leaves and coconut." },
  { id: "ghanti", name: "Ghanti", image: ghanti, blurb: "A brass bell to ring in the aarti." },
];

/** Items that open a picker instead of toggling straight onto the thali. */
export const STYLE_OPTIONS = {
  diya: DIYA_STYLES,
  mithai: MITHAI_STYLES,
  patakhe: PATAKHE_STYLES,
  phool: PHOOL_STYLES,
  chocolate: CHOCOLATE_STYLES,
  sajavat: SAJAVAT_STYLES,
  pooja: POOJA_STYLES,
} satisfies Partial<Record<ItemId, ItemStyle[]>>;

export type StyledItemId = keyof typeof STYLE_OPTIONS;
/** Chosen design ids per item. Single-pick items hold exactly one. */
export type StyleChoice = Record<StyledItemId, string[]>;

export const STYLED_ITEMS = Object.keys(STYLE_OPTIONS) as StyledItemId[];
export const DEFAULT_STYLES: StyleChoice = {
  diya: ["mitti"],
  mithai: ["laddoo"],
  patakhe: ["phuljhadi"],
  phool: ["genda"],
  chocolate: ["milk"],
  sajavat: ["kandil"],
  pooja: ["moli", "roli"],
};

/** Items where you can put several designs on the thali at once. The diya sits alone in the centre. */
export const MULTI_PICK: Record<StyledItemId, boolean> = {
  diya: false,
  mithai: true,
  patakhe: true,
  phool: true,
  chocolate: true,
  sajavat: true,
  pooja: true,
};

export const isStyled = (id: string): id is StyledItemId => id in STYLE_OPTIONS;

export const getStyle = (item: StyledItemId, id: string): ItemStyle =>
  STYLE_OPTIONS[item].find((s) => s.id === id) ?? STYLE_OPTIONS[item][0];

/** Shelf order on the shop counter. */
export const SHOP_ITEMS: ShopItem[] = [
  { id: "sajavat", name: "Sajavat", image: kandil, kind: "free", blurb: "Lanterns, rangoli, lights and more." },
  { id: "phool", name: "Phool", image: genda, kind: "free", blurb: "Choose flowers for the pooja." },
  { id: "mithai", name: "Mithai", image: laddoo, kind: "free", blurb: "Choose a sweet for the thali." },
  { id: "dry-fruits", name: "Dry Fruits", image: dryFruits, kind: "free", blurb: "Kaju, badam and pista." },
  { id: "patakhe", name: "Patakhe", image: anaar, kind: "free", blurb: "Choose a cracker for the celebration." },
  { id: "pooja", name: "Pooja Samagri", image: kalash, kind: "free", blurb: "Moli, roli tika, kalash and more." },
  { id: "diya", name: "Diya", image: diyaMitti, kind: "free", blurb: "Choose the diya for the centre." },
  { id: "chocolate", name: "Chocolate", image: milkChoco, kind: "free", blurb: "Choose chocolates, the modern Diwali gift." },
  { id: "note", name: "Write a note", image: note, kind: "note", blurb: "Say what's in your heart." },
];

export const ITEM_BY_ID = Object.fromEntries(
  SHOP_ITEMS.map((i) => [i.id, i]),
) as Record<ItemId | "note", ShopItem>;

export const isItemId = (id: unknown): id is ItemId =>
  typeof id === "string" && id !== "note" && id in ITEM_BY_ID;

/** Clean up styles from storage or a link: known ids only, no repeats, defaults where missing. Accepts old single-string values. */
export function normalizeStyles(raw: unknown): StyleChoice {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const out = { ...DEFAULT_STYLES };
  for (const item of STYLED_ITEMS) {
    const v = src[item];
    const ids = (Array.isArray(v) ? v : [v]).filter(
      (x, i, all): x is string => typeof x === "string" && all.indexOf(x) === i && STYLE_OPTIONS[item].some((s) => s.id === x),
    );
    if (ids.length) out[item] = MULTI_PICK[item] ? ids : ids.slice(0, 1);
  }
  return out;
}

export interface ItemLook {
  key: string;
  image: string;
  name: string;
}

/** Every design of an item that's on the thali (several for mithai/patakhe, one otherwise). */
export function itemLooks(id: ItemId, styles: StyleChoice): ItemLook[] {
  if (!isStyled(id)) return [{ key: id, image: ITEM_BY_ID[id].image, name: ITEM_BY_ID[id].name }];
  return styles[id].map((sid) => {
    const s = getStyle(id, sid);
    return { key: `${id}:${s.id}`, image: s.image, name: s.name };
  });
}

export const NOTE_MAX = 300;
export const NAME_MAX = 30;
