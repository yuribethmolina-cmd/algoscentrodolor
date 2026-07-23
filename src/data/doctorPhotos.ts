// Fallback bundled photos per slug. Used only when the DB row has no photo_url.
import photoAtilio   from "@/assets/team/doctor-atilio.webp";
import photoAntulio  from "@/assets/team/doctor-antulio.webp";
import photoTomas    from "@/assets/team/doctor-tomas.webp";
import photoLeslie   from "@/assets/team/doctor-leslie.webp";
import photoCarolina from "@/assets/team/doctor-carolina.webp";
import photoGilda    from "@/assets/team/doctor-gilda.webp";
import photoDaniel   from "@/assets/team/doctor-daniel.webp";

export const PHOTO_FALLBACKS: Record<string, string> = {
  "dr-atilio-rodriguez": photoAtilio,
  "dr-antulio-parra": photoAntulio,
  "dr-tomas-iragorry": photoTomas,
  "dra-leslie-ramirez": photoLeslie,
  "dra-carolina-rodriguez": photoCarolina,
  "dra-gilda-gomez": photoGilda,
  "lcdo-daniel-rodriguez": photoDaniel,
};
