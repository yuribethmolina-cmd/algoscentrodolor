import imgFacetario from "@/assets/about-procedure.jpg";
import imgArticular from "@/assets/tx-04-eco.jpg";
import imgRadicular from "@/assets/tx-radicular.jpg";
import imgSacro from "@/assets/tx-sacroiliaco.jpg";
import imgEstenosis from "@/assets/tx-estenosis.jpg";
import imgMiofascial from "@/assets/tx-miofascial.jpg";
import imgPostherpetica from "@/assets/tx-postherpetica.jpg";
import imgTunel from "@/assets/tx-tunel-carpiano.jpg";
import imgCefaleas from "@/assets/tx-cefaleas.jpg";

import lumbarAsset from "@/assets/cond-lumbar.jpg.asset.json";
import cervicalAsset from "@/assets/cond-cervical.jpg.asset.json";
import neuropatiaAsset from "@/assets/cond-neuropatia.jpg.asset.json";
import herniaAsset from "@/assets/cond-hernia-discal.jpg.asset.json";
import cirugiaAsset from "@/assets/cond-cirugia-fallida.jpg.asset.json";
import caderaAsset from "@/assets/cond-articular-cadera.jpg.asset.json";

export const CONDITION_IMAGES: Record<string, string> = {
  "dolor-lumbar-ciatica": lumbarAsset.url,
  "dolor-cervical": cervicalAsset.url,
  "dolor-facetario": imgFacetario,
  "neuropatia": neuropatiaAsset.url,
  "dolor-articular": imgArticular,
  "hernia-discal": herniaAsset.url,
  "cirugia-fallida-espalda": cirugiaAsset.url,
  "dolor-radicular": imgRadicular,
  "dolor-sacroiliaco": imgSacro,
  "estenosis-canal-lumbar": imgEstenosis,
  "dolor-miofascial": imgMiofascial,
  "neuralgia-posherpetica": imgPostherpetica,
  "tunel-carpiano": imgTunel,
  "cefaleas": imgCefaleas,
  // extra alias
  "dolor-cadera": caderaAsset.url,
};

export function getConditionImage(slug: string): string {
  return CONDITION_IMAGES[slug] ?? lumbarAsset.url;
}
