import imgLumbar from "@/assets/tx-01-lumbar.jpg";
import imgCervical from "@/assets/tx-02-cervical.jpg";
import imgFacetario from "@/assets/about-procedure.jpg";
import imgNeuropatia from "@/assets/tx-03-perif.jpg";
import imgArticular from "@/assets/tx-04-eco.jpg";
import imgHernia from "@/assets/tx-hernia-discal.jpg";
import imgCirugia from "@/assets/tx-cirugia-fallida.jpg";
import imgRadicular from "@/assets/tx-radicular.jpg";
import imgSacro from "@/assets/tx-sacroiliaco.jpg";
import imgEstenosis from "@/assets/tx-estenosis.jpg";
import imgMiofascial from "@/assets/tx-miofascial.jpg";
import imgPostherpetica from "@/assets/tx-postherpetica.jpg";
import imgTunel from "@/assets/tx-tunel-carpiano.jpg";
import imgCefaleas from "@/assets/tx-cefaleas.jpg";

export const CONDITION_IMAGES: Record<string, string> = {
  "dolor-lumbar-ciatica": imgLumbar,
  "dolor-cervical": imgCervical,
  "dolor-facetario": imgFacetario,
  "neuropatia": imgNeuropatia,
  "dolor-articular": imgArticular,
  "hernia-discal": imgHernia,
  "cirugia-fallida-espalda": imgCirugia,
  "dolor-radicular": imgRadicular,
  "dolor-sacroiliaco": imgSacro,
  "estenosis-canal-lumbar": imgEstenosis,
  "dolor-miofascial": imgMiofascial,
  "neuralgia-posherpetica": imgPostherpetica,
  "tunel-carpiano": imgTunel,
  "cefaleas": imgCefaleas,
};

export function getConditionImage(slug: string): string {
  return CONDITION_IMAGES[slug] ?? imgLumbar;
}
