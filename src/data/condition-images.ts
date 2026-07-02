import imgLumbar from "@/assets/tx-01-lumbar.jpg";
import imgCervical from "@/assets/tx-02-cervical.jpg";
import imgPerif from "@/assets/tx-03-perif.jpg";
import imgEco from "@/assets/tx-04-eco.jpg";
import imgProcedimiento from "@/assets/about-procedure.jpg";
import imgSala from "@/assets/sala-procedimientos.jpg";
import imgTech from "@/assets/experience-tech.jpg";

export const CONDITION_IMAGES: Record<string, string> = {
  "dolor-lumbar-ciatica":    imgLumbar,
  "dolor-cervical":          imgCervical,
  "dolor-facetario":         imgProcedimiento,
  "neuropatia":              imgPerif,
  "dolor-articular":         imgEco,
  "hernia-discal":           imgLumbar,
  "cirugia-fallida-espalda": imgSala,
  "dolor-radicular":         imgCervical,
  "dolor-sacroiliaco":       imgLumbar,
  "estenosis-canal-lumbar":  imgLumbar,
  "dolor-miofascial":        imgTech,
  "neuralgia-posherpetica":  imgPerif,
  "tunel-carpiano":          imgPerif,
  "cefaleas":                imgTech,
};
