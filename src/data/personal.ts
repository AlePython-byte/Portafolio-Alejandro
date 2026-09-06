import type { StaticImageData } from "next/image";
import albumCover from "../../public/images/ferxxo-vol-x.jpg";
import feidPhoto from "../../public/images/feid.jpeg";
import mullisPhoto from "../../public/images/mullis.jpeg";
import residentEvilCover from "../../public/images/resident-evil-7.jpg";
import travelPhoto from "../../public/images/viaje.jpeg";
type PersonalPieceCopy = {
  title: string;
  selectorLabel: string;
  short: string;
  text: string;
  imageAlt: string;
};

type PersonalSectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  selectStory: string;
  collapseStory: string;
  backToCards: string;
  storySelectorLabel: string;
  mullis: PersonalPieceCopy & { plaque: string };
  music: PersonalPieceCopy & {
    album: string;
    albumLabel: string;
    albumAlt: string;
    pause: string;
    play: string;
  };
  game: PersonalPieceCopy & { favoriteLabel: string };
  travel: PersonalPieceCopy & { note: string };
};

export const personalImages: {
  mullis: StaticImageData;
  feid: StaticImageData;
  albumCover?: StaticImageData;
  residentEvil: StaticImageData;
  travel: StaticImageData;
} = {
  mullis: mullisPhoto,
  feid: feidPhoto,
  albumCover,
  residentEvil: residentEvilCover,
  travel: travelPhoto,
};

export const personalCopy: Record<"es" | "en", PersonalSectionCopy> = {
  es: {
    eyebrow: "02 · Mi lado personal",
    title: "Fuera del código",
    intro:
      "Un poco sobre mí y los pasatiempos que disfruto fuera del código: la compañía de mi gata, la música, los videojuegos y viajar para descubrir nuevas perspectivas.",
    selectStory: "Abrir historia",
    collapseStory: "Cerrar historia",
    backToCards: "Volver a las tarjetas",
    storySelectorLabel: "Selecciona una historia",
    mullis: {
      title: "Mullis, mi compañía favorita",
      selectorLabel: "Mullis",
      short: "Alegría, juegos y compañía todos los días.",
      text: "Mullis es mi gata: alegre, juguetona y siempre buscando estar conmigo. Le encanta acompañarme en lo que esté haciendo y, entre juegos y compañía, se ha ganado su lugar en cada uno de mis días.",
      imageAlt: "Mullis sentada con la cara y las orejas visibles",
      plaque: "Mullis",
    },
    music: {
      title: "Feid, en repeat",
      selectorLabel: "Feid",
      short: "Un álbum al que siempre termino volviendo.",
      album: "FERXXO VOL X: Sagrado",
      albumLabel: "Álbum favorito",
      text: "Escucho a Feid desde hace mucho y su música siempre encuentra un lugar en mis días. Mi favorito es FERXXO VOL X: Sagrado. Sé que no es el favorito de todo el mundo, pero a mí me gusta muchísimo: es de esos álbumes a los que siempre termino volviendo.",
      imageAlt: "Fotografía de Feid",
      albumAlt: "Portada del álbum FERXXO VOL X: Sagrado",
      pause: "Pausar disco",
      play: "Girar disco",
    },
    game: {
      title: "Un poco de acción. Mucho terror",
      selectorLabel: "Resident Evil 7",
      short: "Mi saga favorita y el terror que mejor funciona.",
      text: "Resident Evil es mi saga favorita y me he jugado todos, desde los clásicos. Si tengo que elegir uno, me quedo con Resident Evil 7: para mí es el que mejor mezcla el terror con ese toque de acción que hace que no quieras soltar el control.",
      imageAlt: "Carátula completa de Resident Evil 7",
      favoriteLabel: "Mi favorito · Resident Evil 7",
    },
    travel: {
      title: "Otra forma de cambiar de perspectiva",
      selectorLabel: "Viajes",
      short: "Paisajes que se entienden distinto desde arriba.",
      text: "Disfruto mucho viajar y conocer nuevos paisajes. Pero hay algo que me gusta especialmente: verlos desde lo más alto. Mirar por la ventana y encontrar montañas, nubes y caminos allá abajo es de mis partes favoritas del viaje.",
      imageAlt:
        "Paisaje de montañas y nubes visto junto al ala de un avión desde la ventana",
      note: "Si hay una buena vista, me quedo un rato más",
    },
  },
  en: {
    eyebrow: "02 · Personal side",
    title: "Beyond code",
    intro:
      "A little about me and the hobbies I enjoy beyond code: time with my cat, music, video games, and traveling to discover new perspectives.",
    selectStory: "Open story",
    collapseStory: "Close story",
    backToCards: "Back to cards",
    storySelectorLabel: "Choose a story",
    mullis: {
      title: "Mullis, my favorite companion",
      selectorLabel: "Mullis",
      short: "Joy, playtime, and companionship every day.",
      text: "Mullis is my cat: cheerful, playful, and always looking to be close to me. She loves joining me in whatever I am doing and, between playtime and companionship, she has earned a place in every one of my days.",
      imageAlt: "Mullis sitting with her face and ears visible",
      plaque: "Mullis",
    },
    music: {
      title: "Feid, on repeat",
      selectorLabel: "Feid",
      short: "An album I always find myself returning to.",
      album: "FERXXO VOL X: Sagrado",
      albumLabel: "Favorite album",
      text: "I have listened to Feid for a long time, and his music always finds a place in my days. My favorite is FERXXO VOL X: Sagrado. I know it is not everyone’s favorite, but I love it: it is one of those albums I always end up returning to.",
      imageAlt: "Photograph of Feid",
      albumAlt: "Cover of the album FERXXO VOL X: Sagrado",
      pause: "Pause record",
      play: "Spin record",
    },
    game: {
      title: "A little action. A lot of horror",
      selectorLabel: "Resident Evil 7",
      short: "My favorite series and horror at its best.",
      text: "Resident Evil is my favorite series, and I have played every game since the classics. If I have to choose one, I pick Resident Evil 7: to me, it has the best mix of horror and that touch of action that makes it impossible to put the controller down.",
      imageAlt: "Full Resident Evil 7 cover art",
      favoriteLabel: "My favorite · Resident Evil 7",
    },
    travel: {
      title: "Another way to change perspective",
      selectorLabel: "Travel",
      short: "Landscapes feel different when seen from above.",
      text: "I really enjoy traveling and discovering new landscapes. But there is something I especially love: seeing them from above. Looking out the window and finding mountains, clouds, and roads below is one of my favorite parts of a trip.",
      imageAlt:
        "Mountains and clouds beside an airplane wing, seen through the window",
      note: "If there is a good view, I will stay a little longer",
    },
  },
};

export type PersonalLanguage = keyof typeof personalCopy;
