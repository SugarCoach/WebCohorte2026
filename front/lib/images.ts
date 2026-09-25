/**
 * Imágenes centralizadas.
 *
 * IMPORTANTE: las URLs bajo `lh3.googleusercontent.com/aida/...` (sin
 * "-public") son previsualizaciones de sesión del generador y devuelven
 * 403 Forbidden fuera de esa sesión — por eso "faltaban las imágenes".
 * Las URLs `aida-public/...` sí son públicas y estables (verificado), y son
 * las que usa `index.html`. Todas las imágenes de esta app deben usar
 * `aida-public` o el logo local en `public/images/logo/`.
 */

// Logo real provisto por el usuario (incluye el mascota-pájaro + wordmark).
export const LOGO_SRC = "/images/logo/sugar-logo.png";
export const MASCOT_SRC = "/images/logo/sugar-logo.png";

export const PHONES = {
  // Hero: teléfono principal ("Pantalla real SugarCoach Home: Nivel 1, 1100 pts")
  home: "https://lh3.googleusercontent.com/aida-public/AB6AXuAex2vzhfou00QMX_UHpJkArnuepiuiC7zoTm8UrX5jY4Olv5EfE-EQwvQ3YconGOz8mDUnvnQ5U6ImGinNwMkC4CH5zYvaz1bMdO6-2K67zYz75QITOoIh4IFOXkdXTM8DcRr09gk_03lu6duLPkdeWGSMD5Dwhnnm5tWY8kRqXzcrrORS8x795JD9hONYGzlrXv6HImhrdLr98iw-CcsfvwuNrLpI1djgvbAU6AXBL1WvcFPP8LiX0D9fnI9okr2pKA",
  // Hero: teléfono inclinado de apoyo ("Pantalla real SugarCoach Daily Log")
  heroDailyLog:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7QGWmPhs6LVP9QiaVBTX7fZv-pmWeiEPHhR_zPPO9OhY2vdfoPYEaIP2gKJ9c8txBEpJL8ECxdrg44CUr-lPy6C8DM9gzIuh7yfd2DHKY4NhseZUvs84aUXY2_rDth5ayxrUtaIG_hpy0jdGmDtQ-3NjlPlMyff8M4U9ydq56ua-1V7ex7O7rlV0XlgM1uHS3ETNed1TTDpSAUPUuhxcyNOaazxOgYp0cjdTNFRIGOcTLl0SEFl7V6K58TxSIJJVedg",
  // "Cómo funciona" paso 1: registro de alimentos y carbohidratos
  registro:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCexdqpO1nW-_rc-YcI6jfp6ETSWQmPc7Pokml6fFYN10fD6a2Htt7pvny-NH_RK1ESfqv1nxHnqNlUJ1WKhd8hEVWLSkQylW4B0jaHsCknjnJhbB0rMwtDHIxNI7TGN_ilwjI0CeP8vl0PuKXLu2jqnFplts1DywkPhlhwtQn3EfFKTsTPHIttArKJg-NdrxpMLzWG9Qo1TdCPhC-T15wmJsh1221Mg6LxsiSsDZwgF7DJEDlgzw3UPsCLNt-AR5_w7g",
  // "Cómo funciona" paso 2: Daily Log diario
  dailyLog:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxbxgnOUN9JkBjTOtqfvSjDMibVwkfxjPU783r0-mfX1hRfKf0ekAw3XqcqmtcQgUhS_16i5hhzDEWvUsjbvjkkUk-RazLxVCZkwatNeFNWC51UHcj2fO4V-MuKQ9LjZzmoEhqQtxIzjUEVLWMMvGvXqz1aKZvXLgIE5GMFFcmsyCfkjEF60Mr8hHYthNN-wivg__PTN_0Xw53xPyXY813N7DbtLoLM0QvEZJLJNfv4QgulA29ppRO076fzJ6oOIwdYQ",
  // "Cómo funciona" paso 3: rangos objetivo (Hipo/Target/Hyper)
  treatmentSteps:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCHDz723sKM5bQoQ5GGuOKzCGjZ4vJOAvJBMPkw1tyVPWP2cbLWkQ1H6qQWLqRz6oSYcEJnReEPt_CXEj6vV9B3VWpog_je-9L1ZeQWJZznjczPoqV5eGZ6le7_PdEVzvGZrv04ajnHrOWlonKYOhM-kEsqTYWY32Y2g7UAp9gDTsjUKtNDvuTNvkvm5RoR-Zqf0IFqxtpyBlnlhe0EMVL9M5MLaqIH37Ec6p45sZiqMok4C6WVff7Y49c6gZlTO0Xv-w",
  // Sección Gamificación: pantalla de logros
  gamification:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHWsdvemnMofeQsiVPWVhCP2IhL0TqmEyRJnhzeR-cOUtf0AlglAKpv9tbrMO59QfZtFLWnYaDHi3yG3-KoEwPZbknB7kYz4uRmpKngVlMXjixjAw87HXs9mIuObMyT6h61r4yu1SrxOn74uK-suADZ3oqL-7rMci2Uf3q5_IWjYhEyM3wspwaVX8FBNEQTFTd3fWOKarJ4eZtnSunqkay4v5eldvJq5W1wbhd66-5Du_StXAKuLyjYv2aUxJX2zYT8Q",
  // "Un día con SugarCoach": actividad con planeta 3D
  activity:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuARIikUJ0usGTC40TatKdme_Pn18uQeAuoNetqc48cN1_RAww8nqXYvl4K-tMABr68f-yYkyhHCgq-w6lXHqb2ztm99dclh0xLQgqtbT158mlFICbrfjVo4E8AlH9gZxn0oLdn0LetZe_VxVi03iF4nonCz7mAtzPnwCPVCYIk4yoFgGATP-UqptsxnN9aA5p5fjPTgle5sWItPr2hZX9ETBYM-I7G0L7G6ZQplDpdfG86EzyUQs8lH2NVrqt8Ec5C29g",
  // Sección Estadísticas: Glucose vs Insulin
  stats:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBV5yOs9xtXD5p_0nyDgrmCUCQL77HdzGdWhwkOaNOfyvKEU_XmD1oBRWLOJfBQXclF35ieOI_WnAQtQ3kQXTpcpDNr62TIVhj_4ZNmVnpALOJ-7IrXngV1EBkGZXbUOWwmWlGfhQdsLsxiD3PG-y-oZWdN8PiVYESJ4zwjm6CeZxnjdC28a8FOY1EcPYHY3T3-DLmRn5nqEJ6o6KTdd9n-RA986INlrfWu0lONqd2ACTLJamDgtD1aXoc1kVkQ90LKZg",
  // Sección Tratamiento: configuración de insulina
  treatment:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBdnL9hueeM7B6w2_vgqGKhKBXQpsz_itiH2gNZZv8WEWJqmWNQiSUwIV-6Oz-3n8pRglXEV9hXPtqVPgpseL3rXsBAQtDkqpLgY9E_LQ-MWvJAWV0lNjd8VXeaWvHzIwkgvF7xlNgc3Jnf71dksv8YC1V7l7QypaIiInR5BP4CFtaNxYFmBM3yNdCKcNgPJ9_471EZaevIaFZF_o7tLq86M_ksxEQBGwHNq-JiZsPezTTM0t0maLKTh-MgG0byB_XjJQ",
} as const;

export const TEAM_PHOTOS: Record<string, string> = {
  "isabel-berizzo":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAemLGwLzSkpSFnx-Lge-pyS1uubrTmvS_tbzitiAaF2kp5_vZdf_9NYtBcM7Qd9PwnhEwlFitSZwShtVTDLxvbQ0YD7QWDwbCpntEDGjw5Ms9PZHAwH01gBF196Eq6bMjlVjRfc7OVezPp2Tvu0lLSwrmFUPqsvHmUclVGFBFSfMs4ewAdfUYHx4HbeC4-Amq32bqccS_ZfWvS9JbtFNB0GRwopzAKXGnLhGLiSd--SXav89CZCjdByOBKsv1UEkacCA",
  "veronica-avendano":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD-DVXJupTE0skdbOAaVDQe2fHP_sjNT6zrWHKC5gK3whYcIQZaXJyklpdl5pUKPtybw9WQjWdZ2e4LFjPHfowtI_vY1FsJIS34_mt4HvFQTXdszxZico0U9qzvzQvQbw3_oEnqXfGamKaH3lWvTzxF7rSWdfHI0PHcroUpn9e7tZd5vw9OmGegKZDEiAG0xGs3Bohf-wOZr6Sr3ukEDmjwcH9kiXnJ4zcWlzY53REkDF2_byRy858XiPDoI1pxtuF9lA",
  "debora-biain":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC2JoDVm1r5gAdJkgggp9yUU0osl3Pfd9RxEfQDyg-a4qYbIpIiQw4v2SJQV-NmUcVT15XNXKZWv61-NivTrMPXpAmOVfUg4dN5Fv6p3V6z2d6nx0JFMo_Y0cOwnl4AKBXA9SXrggde2GvjGAxPZCgPKzEzhAfiZohuSL-EqisHi2b9WG1TvFmlBkii5PbvynzRJobqm-K48T1tI-YZJs8DMO7bEGi2Pl2WklCETamQYfeuATGcS6SQx0xSaWLuf2ffmQ",
  "agustina-olivo":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBd6Fbx8Oy9Ld6SYrg8XULR8k4ZY4CKon1mBiEgTBEmxL9MkIIsRfOA5HqIkM0Ro76TsXtG2kN_HW56CA60q7GpU4ncPM2pcRRPn3lJ9ZDVjpwXidCq7WqHv5Ei5F3JfoSouQIkUi5IO0-2xtuLQMcHAOInwYQ-rqoJgl2dj1Qd84rOpE8AKT4tmjfofA8Zsb8fqehIeCp6dI44-Yde2Js3_b1rCJ4OE5TyVGBsV3-yAehr5c44MtwdD0ycaYjNRtsANw",
  "karin-chmiel":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcDRb0o4-k3Jt6zeIh6E75KmW7HIVsp8USMqCLjutNQ39_qqKa80g7NzrwzLuyVyQpM8WXuCUxS3ygDiGyOPehjrh-rB8E2d1HWDKd5B8l6UBXzm0URwIFbUouYlb33ikROIeGTME0firlhT1N7oGcOJ1gcrOET5zpb6mWG3SBuXXX5iU_2CXTVl1jetjd8GX1UgVn52i0KuG__RBFsGXeObjozi5ROPRL3cF-Ayu9b_T829zuMuiR7krg1FEK83tO3w",
};

// "Nuestra Historia": foto de equipo fundador/directivo
export const OUR_STORY_PHOTO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ4JchESmFNHzQGmGz2qXZiBA3PzjhRAeJj2oI94MKyhcz5sgSln6mZ4dOoZjE8qoKwLwkRjTurpVppo9VdNteDhy_2f4yYzO4TSjwrNQIwPkK-tuAKImRd95EMuJGc0EPJ4t_SiuU2iB-O4UZ-ZnKbZsn8RvBHiKCy78Ts4X983q1stMFViy8hlMl57mALCznyZZbf-eL_dghug3oE-dju0xOir1skkJFPvMINlGea2t8oJzQW47_pj_8LGp3Mk6jfg";

// CTA final: logo grande dentro del panel de vidrio
export const CTA_LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCR9N-z6VZiIC6v1JczWYnPJidEFwtREYNsDm6kFnvFOo3Igk6I44lCHPLpvzP-jEDCEu1gXlnrAus1axlxghjdo1dJI3DVxR9aPjPSJLEfgDOKyU8dPvEjwe41GoFDTo41hTtqqr-9iIRxJvm5dDR7SSJy6EDWp1ODRArIOKbf5uATtrPF_xUZ_CsqCNVgyug0WPSpr3i8FrDRQ5dcGFaZQC-xWsfopnUSKgvCo-E4mVrA6KxvN8tvaRWmy1v4YuH_iQ";
