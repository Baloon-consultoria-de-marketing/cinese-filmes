interface Movie {
  id: number;
  title: string;
  brand: string;
  videoUrl: string;
  hasIcon?: boolean;
  fullscreen?: boolean;
}

export const mockMoviesNormal: Movie[] = [
  { id: 1, title: "CINESE", brand: "", videoUrl: "hbxq2_7chtg", hasIcon: false, fullscreen: false },
  { id: 3, title: "Além do Guarda Roupa", brand: "HBO", videoUrl: "QBH1CXvDmcg", hasIcon: true, fullscreen: false },
  { id: 4, title: "Além do Guarda Roupa", brand: "HBO", videoUrl: "UnQgzYXY4c0", hasIcon: true, fullscreen: false },
  { id: 5, title: "MKF Além do Guarda Roupa", brand: "HBO", videoUrl: "BLGgV_Z7HCs", hasIcon: true, fullscreen: false },
  { id: 10, title: "Jogue Com Elas", brand: "VIVO", videoUrl: "RUpfQRCt3Go", hasIcon: true, fullscreen: false },
  { id: 17, title: "Telas Pretas", brand: "VIVO", videoUrl: "fb9ao-ww15Q", hasIcon: true, fullscreen: false },
  { id: 18, title: "Tato ", brand: "Bistrot De Paris", videoUrl: "3VPLprjRsIs", hasIcon: true, fullscreen: false },
  { id: 19, title: "Olfato", brand: "Bistrot De Paris", videoUrl: "dUZN9-y1liI", hasIcon: true, fullscreen: false },
  { id: 20, title: "Editorial", brand: "Trimix", videoUrl: "5bcEly7c5CI", hasIcon: true, fullscreen: false },
];

export const mockMoviesFullScreen: Movie[] = [
  { id: 2, title: "Mundo Sem Acidentes", brand: "BUNZL EPI", videoUrl: "CktpWcoAbXU", hasIcon: true, fullscreen: true },
  { id: 6, title: "Clipe Amém", brand: "Gabo Maré", videoUrl: "kKI0kLN2f9U", hasIcon: true, fullscreen: true },
  { id: 7, title: "Histórias de Ouro", brand: "VIVO", videoUrl: "ekA-DeSSjZo", hasIcon: true, fullscreen: true },
  { id: 8, title: "Histórias de Ouro", brand: "VIVO", videoUrl: "MBII8-yMi0c", hasIcon: true, fullscreen: true },
  { id: 9, title: "Histórias de Ouro", brand: "VIVO", videoUrl: "NvVthYm09ro", hasIcon: true, fullscreen: true },
  { id: 11, title: "Convocados", brand: "NETSHOES", videoUrl: "-ir8jxehvwU", hasIcon: true, fullscreen: true },
  { id: 12, title: "Convocados", brand: "NETSHOES", videoUrl: "dLkmT8M6rrY", hasIcon: true, fullscreen: true },
  { id: 13, title: "Convocados", brand: "NETSHOES", videoUrl: "XFvYLvigci0", hasIcon: true, fullscreen: true },
  { id: 14, title: "Convocados", brand: "NETSHOES", videoUrl: "S_vlMhNeVOI", hasIcon: true, fullscreen: true },
  { id: 15, title: "A Revolução da Segurança", brand: "Mob Inspeção", videoUrl: "p4ECZ7ra1RU", hasIcon: true, fullscreen: true },
  { id: 16, title: "A Revolução da Segurança", brand: "Bepi Service", videoUrl: "WvlCthMu2fw", hasIcon: true, fullscreen: true },
];

// Mescla os arrays e ordena por ID
export const mockMovies = [...mockMoviesNormal, ...mockMoviesFullScreen].sort((a, b) => a.id - b.id);
