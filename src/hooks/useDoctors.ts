import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DOCTORS as STATIC_DOCTORS, type Doctor } from "@/data/doctors";
import { PHOTO_FALLBACKS } from "@/data/doctorPhotos";

export type DoctorRow = {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  specialty_slug: string;
  schedule: string;
  note: string | null;
  is_director: boolean;
  photo_url: string | null;
  photo_position: string | null;
  bio: string | null;
  credentials: string[];
  languages: string[];
  display_order: number;
  active: boolean;
};

export function rowToDoctor(row: DoctorRow): Doctor {
  return {
    slug: row.slug,
    name: row.name,
    specialty: row.specialty,
    specialtySlug: row.specialty_slug as Doctor["specialtySlug"],
    schedule: row.schedule,
    note: row.note || undefined,
    isDirector: row.is_director,
    photoSrc: row.photo_url || PHOTO_FALLBACKS[row.slug],
    photoPosition: row.photo_position || undefined,
    bio: row.bio || undefined,
    credentials: row.credentials || [],
    languages: row.languages || [],
  };
}

async function fetchDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw error;
  return (data as unknown as DoctorRow[]).map(rowToDoctor);
}

export function useDoctors() {
  const query = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
    staleTime: 60_000,
  });
  return {
    doctors: query.data ?? STATIC_DOCTORS,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useDoctor(slug: string | undefined) {
  const { doctors, isLoading } = useDoctors();
  return {
    doctor: slug ? doctors.find((d) => d.slug === slug) : undefined,
    isLoading,
  };
}

export function useDoctorsBySpecialty(specialtySlug: Doctor["specialtySlug"]) {
  const { doctors } = useDoctors();
  return doctors.filter((d) => d.specialtySlug === specialtySlug);
}
