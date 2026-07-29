UPDATE public.doctors
SET photo_url = '/__l5e/assets-v1/b0495f31-372b-48ee-9ad6-beca3d7d7c13/tomas-iragorry.png'
WHERE slug = 'dr-tomas-iragorry';

UPDATE public.doctors
SET credentials = ARRAY[
  'Médico Especialista en Anestesiología, subespecialidad en Dolor y Cuidados Paliativos',
  'Fundadora de la Unidad de Terapia del Dolor (1999), Hospital Central "Dr. Urquinaona"',
  'Jefa Unidad de Dolor, dependiente del Departamento de Anestesiología, Hospital Central Maracaibo',
  'Directora Médica Hospice de Venezuela (Dolor Oncológico y Cuidados Paliativos) 2009–2013',
  'Coordinadora del Entrenamiento Avanzado en Dolor para Anestesiólogos · Universidad del Zulia'
]
WHERE slug = 'dra-gilda-gomez';