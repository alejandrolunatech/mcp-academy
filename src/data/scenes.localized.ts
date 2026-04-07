// ─────────────────────────────────────────────
// Localized scene content for MCP Academy
// Each scene's text fields are keyed by Language.
// The helper getLocalizedScene() merges a base
// Scene from scenes.ts with the correct locale.
// ─────────────────────────────────────────────

import type { Language, Scene, DialogueLine, Hotspot } from '../types/game';
import { SCENES } from './scenes';

// ─── Per-locale overrides ────────────────────────────────

type LocaleText = Record<Language, string>;

interface LocalizedDialogueLine {
  characterId: string;
  text: LocaleText;
  choices?: { text: LocaleText; nextIndex: number | null; isCorrect?: boolean }[];
}

interface LocalizedHotspot {
  id: string;
  label: LocaleText;
  emoji: string;
  title: LocaleText;
  description: LocaleText;
  position: { top: string; left: string };
}

interface LocalizedSceneContent {
  title: LocaleText;
  subtitle: LocaleText;
  dialogue: LocalizedDialogueLine[];
  hotspots: LocalizedHotspot[];
}

// ─────────────────────────────────────────────────────────
// SCENE LOCALIZATIONS
// ─────────────────────────────────────────────────────────

const LOCALIZED_SCENES: Record<string, LocalizedSceneContent> = {
  'world-map': {
    title: { en: 'MCP Academy', es: 'Academia MCP', nl: 'MCP Academie' },
    subtitle: {
      en: 'World Map — Choose your next room',
      es: 'Mapa del Mundo — Elige tu próxima sala',
      nl: 'Wereldkaart — Kies je volgende kamer',
    },
    dialogue: [],
    hotspots: [],
  },

  'great-entrance-hall': {
    title: {
      en: 'Great Entrance Hall',
      es: 'Gran Sala de Entrada',
      nl: 'Grote Ingangshal',
    },
    subtitle: {
      en: 'Where every journey begins',
      es: 'Donde comienza todo viaje',
      nl: 'Waar elke reis begint',
    },
    hotspots: [
      {
        id: 'mcp-scroll',
        emoji: '📜',
        label: { en: 'Ancient Scroll', es: 'Pergamino Antiguo', nl: 'Oud Perkament' },
        title: { en: 'What is MCP?', es: '¿Qué es MCP?', nl: 'Wat is MCP?' },
        description: {
          en: 'MCP stands for Model Context Protocol. It is a way for AI systems to understand three kinds of magic: things that DO, things that KNOW, and things that GUIDE.',
          es: 'MCP son las siglas de Model Context Protocol. Es una forma de que los sistemas de IA entiendan tres tipos de magia: cosas que HACEN, cosas que SABEN, y cosas que GUÍAN.',
          nl: 'MCP staat voor Model Context Protocol. Het is een manier voor AI-systemen om drie soorten magie te begrijpen: dingen die DOEN, dingen die WETEN, en dingen die LEIDEN.',
        },
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'three-doors',
        emoji: '🚪',
        label: { en: 'Three Glowing Doors', es: 'Tres Puertas Brillantes', nl: 'Drie Gloeiende Deuren' },
        title: { en: 'The Three Paths', es: 'Los Tres Caminos', nl: 'De Drie Paden' },
        description: {
          en: 'Three magical paths keep the Academy in balance. Toolcraft (red), Lorekeeping (blue), and Spellguidance (gold). Something has mixed them up — can you fix it?',
          es: 'Tres caminos mágicos mantienen el equilibrio en la Academia. Artesanía (rojo), Custodio del Saber (azul) y Magia de Guía (dorado). Algo los ha mezclado — ¿puedes arreglarlo?',
          nl: 'Drie magische paden houden de Academie in balans. Gereedschapskunde (rood), Kennisbewaarder (blauw) en Toverleiding (goud). Iets heeft ze door elkaar gehaald — kun jij het oplossen?',
        },
        position: { top: '50%', left: '75%' },
      },
      {
        id: 'notice-board',
        emoji: '📋',
        label: { en: 'Notice Board', es: 'Tablón de Anuncios', nl: 'Mededelingenbord' },
        title: { en: 'Academy Rules', es: 'Reglas de la Academia', nl: 'Academieregels' },
        description: {
          en: 'Rule 1: Tools DO things. Rule 2: Resources KNOW things. Rule 3: Prompts GUIDE things. Never confuse them or the Academy goes haywire!',
          es: 'Regla 1: Las Herramientas HACEN cosas. Regla 2: Los Recursos SABEN cosas. Regla 3: Los Prompts GUÍAN cosas. ¡Nunca los confundas o la Academia se volverá loca!',
          nl: 'Regel 1: Gereedschappen DOEN dingen. Regel 2: Bronnen WETEN dingen. Regel 3: Prompts LEIDEN dingen. Verwar ze nooit of de Academie draait door!',
        },
        position: { top: '20%', left: '55%' },
      },
    ],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: {
          en: 'Welcome, young apprentice! I am Headmaster Context. MCP Academy is in trouble — the three magical paths have been tangled together!',
          es: '¡Bienvenido, joven aprendiz! Soy el Director Context. ¡La Academia MCP está en problemas: los tres caminos mágicos se han enredado!',
          nl: 'Welkom, jonge leerling! Ik ben Rector Context. De MCP Academie is in gevaar — de drie magische paden zijn door elkaar geraakt!',
        },
      },
      {
        characterId: 'headmasterContext',
        text: {
          en: 'You must visit each wing of the Academy, meet our magical guides, and restore the three paths. Are you ready?',
          es: 'Debes visitar cada ala de la Academia, conocer a nuestros guías mágicos y restaurar los tres caminos. ¿Estás listo?',
          nl: 'Je moet elke vleugel van de Academie bezoeken, onze magische gidsen ontmoeten en de drie paden herstellen. Ben je klaar?',
        },
        choices: [
          {
            text: { en: "Yes! I'm ready to help!", es: '¡Sí! ¡Estoy listo para ayudar!', nl: 'Ja! Ik ben klaar om te helpen!' },
            nextIndex: 2,
            isCorrect: true,
          },
          {
            text: { en: 'Can you explain the paths first?', es: '¿Puedes explicar los caminos primero?', nl: 'Kun je de paden eerst uitleggen?' },
            nextIndex: 3,
          },
        ],
      },
      {
        characterId: 'headmasterContext',
        text: {
          en: "Wonderful! Start by exploring the rooms. Click on glowing objects to discover clues. Let's restore balance!",
          es: '¡Maravilloso! Empieza explorando las salas. Haz clic en los objetos brillantes para descubrir pistas. ¡Restauremos el equilibrio!',
          nl: 'Fantastisch! Begin met het verkennen van de kamers. Klik op gloeiende voorwerpen om aanwijzingen te ontdekken. Laten we het evenwicht herstellen!',
        },
      },
      {
        characterId: 'headmasterContext',
        text: {
          en: 'Of course! There are three paths: Toolcraft (things that DO), Lorekeeping (things that KNOW), and Spellguidance (things that GUIDE). Each has its own wing!',
          es: '¡Claro que sí! Hay tres caminos: Artesanía (cosas que HACEN), Custodio del Saber (cosas que SABEN) y Magia de Guía (cosas que GUÍAN). ¡Cada uno tiene su propio ala!',
          nl: 'Natuurlijk! Er zijn drie paden: Gereedschapskunde (dingen die DOEN), Kennisbewaarder (dingen die WETEN) en Toverleiding (dingen die LEIDEN). Elk heeft zijn eigen vleugel!',
        },
      },
    ],
  },

  'artifact-hall': {
    title: { en: 'Artifact Hall', es: 'Sala de Artefactos', nl: 'Artefactenhal' },
    subtitle: {
      en: 'Home of Toolcraft — Things that DO',
      es: 'Hogar de la Artesanía — Cosas que HACEN',
      nl: 'Thuis van Gereedschapskunde — Dingen die DOEN',
    },
    hotspots: [
      {
        id: 'magic-hammer',
        emoji: '🔨',
        label: { en: 'Magic Hammer', es: 'Martillo Mágico', nl: 'Magische Hamer' },
        title: { en: 'A Tool: Magic Hammer', es: 'Una Herramienta: Martillo Mágico', nl: 'Een Gereedschap: Magische Hamer' },
        description: {
          en: 'This hammer DOES something — it builds walls. A Tool in MCP is like this: it takes a request and performs a real action, like searching the web or saving a file.',
          es: 'Este martillo HACE algo: construye paredes. Una Herramienta en MCP es así: toma una petición y realiza una acción real, como buscar en la web o guardar un archivo.',
          nl: 'Deze hamer DOET iets — hij bouwt muren. Een Gereedschap in MCP is zo: het neemt een verzoek en voert een echte actie uit, zoals het web doorzoeken of een bestand opslaan.',
        },
        position: { top: '40%', left: '15%' },
      },
      {
        id: 'search-crystal',
        emoji: '🔮',
        label: { en: 'Search Crystal', es: 'Cristal de Búsqueda', nl: 'Zoekkristal' },
        title: { en: 'A Tool: Search Crystal', es: 'Una Herramienta: Cristal de Búsqueda', nl: 'Een Gereedschap: Zoekkristal' },
        description: {
          en: 'The Search Crystal DOES a web search. Tools are the action-takers of MCP. They receive input and return output after doing something in the world.',
          es: 'El Cristal de Búsqueda HACE una búsqueda web. Las Herramientas son las que toman acción en MCP. Reciben entrada y devuelven salida tras hacer algo en el mundo.',
          nl: 'Het Zoekkristal DOET een webzoekopdracht. Gereedschappen zijn de uitvoerders van MCP. Ze ontvangen invoer en geven uitvoer terug na iets in de wereld te doen.',
        },
        position: { top: '25%', left: '60%' },
      },
      {
        id: 'artifact-pedestal',
        emoji: '🗿',
        label: { en: 'Empty Pedestal', es: 'Pedestal Vacío', nl: 'Leeg Voetstuk' },
        title: { en: 'Something is Missing…', es: 'Algo Falta…', nl: 'Er Ontbreekt Iets…' },
        description: {
          en: 'This pedestal held the Golden Wrench — a powerful tool artifact. Tika says it was taken by the Fog of Confusion. We need to get it back!',
          es: 'Este pedestal sostenía la Llave Inglesa Dorada — un poderoso artefacto herramienta. Tika dice que fue tomada por la Niebla de la Confusión. ¡Tenemos que recuperarla!',
          nl: 'Op dit voetstuk stond de Gouden Moersleutel — een krachtig gereedschapsartefact. Tika zegt dat het is meegenomen door de Mist van Verwarring. We moeten het terugkrijgen!',
        },
        position: { top: '60%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'tikaFox',
        text: {
          en: "Hi! I'm Tika, the Artifact Fox! This is the Artifact Hall where we keep magical tools. But something's wrong — someone mixed up tools with books and spells!",
          es: '¡Hola! ¡Soy Tika, la Zorra Artesana! Esta es la Sala de Artefactos donde guardamos herramientas mágicas. ¡Pero algo está mal: alguien mezcló herramientas con libros y hechizos!',
          nl: 'Hoi! Ik ben Tika, de Artefactenvos! Dit is de Artefactenhal waar we magische gereedschappen bewaren. Maar er is iets mis — iemand heeft gereedschappen met boeken en spreuken gemengd!',
        },
      },
      {
        characterId: 'tikaFox',
        text: {
          en: 'A TOOL is something that DOES things. It takes a job and completes it — like searching, writing, calculating, or building.',
          es: 'Una HERRAMIENTA es algo que HACE cosas. Toma una tarea y la completa: como buscar, escribir, calcular o construir.',
          nl: 'Een GEREEDSCHAP is iets dat dingen DOET. Het neemt een taak en voltooit die — zoals zoeken, schrijven, berekenen of bouwen.',
        },
      },
      {
        characterId: 'tikaFox',
        text: {
          en: 'Can you spot which items here are real Tools? Click the glowing objects to investigate!',
          es: '¿Puedes identificar qué objetos aquí son Herramientas reales? ¡Haz clic en los objetos brillantes para investigar!',
          nl: 'Kun jij zien welke voorwerpen hier echte Gereedschappen zijn? Klik op de gloeiende voorwerpen om te onderzoeken!',
        },
      },
    ],
  },

  'grand-library': {
    title: { en: 'Grand Library', es: 'Gran Biblioteca', nl: 'Grote Bibliotheek' },
    subtitle: {
      en: 'Home of Lorekeeping — Things that KNOW',
      es: 'Hogar del Custodio del Saber — Cosas que SABEN',
      nl: 'Thuis van de Kennisbewaarder — Dingen die WETEN',
    },
    hotspots: [
      {
        id: 'ancient-tome',
        emoji: '📖',
        label: { en: 'Ancient Tome', es: 'Tomo Antiguo', nl: 'Oud Boekdeel' },
        title: { en: 'A Resource: Ancient Tome', es: 'Un Recurso: Tomo Antiguo', nl: 'Een Bron: Oud Boekdeel' },
        description: {
          en: 'This book KNOWS things — it contains centuries of knowledge. A Resource in MCP is like this: it holds data, files, or information that can be read and used.',
          es: 'Este libro SABE cosas: contiene siglos de conocimiento. Un Recurso en MCP es así: contiene datos, archivos o información que puede leerse y usarse.',
          nl: 'Dit boek WEET dingen — het bevat eeuwen van kennis. Een Bron in MCP is zo: het bevat gegevens, bestanden of informatie die gelezen en gebruikt kan worden.',
        },
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'memory-crystal',
        emoji: '💎',
        label: { en: 'Memory Crystal', es: 'Cristal de Memoria', nl: 'Geheugenkristal' },
        title: { en: 'A Resource: Memory Crystal', es: 'Un Recurso: Cristal de Memoria', nl: 'Een Bron: Geheugenkristal' },
        description: {
          en: "The Memory Crystal stores the Academy's records. Resources don't DO things — they KNOW things. They are like files, databases, or documents.",
          es: "El Cristal de Memoria almacena los registros de la Academia. Los Recursos no HACEN cosas: SABEN cosas. Son como archivos, bases de datos o documentos.",
          nl: "Het Geheugenkristal slaat de records van de Academie op. Bronnen DOEN geen dingen — ze WETEN dingen. Ze zijn als bestanden, databases of documenten.",
        },
        position: { top: '50%', left: '65%' },
      },
      {
        id: 'lore-shelf',
        emoji: '📦',
        label: { en: 'Mixed-Up Shelf', es: 'Estante Revuelto', nl: 'Door Elkaar Plank' },
        title: { en: 'Oh no — Mixed Up!', es: '¡Oh no, todo revuelto!', nl: 'Oh nee — Door Elkaar!' },
        description: {
          en: 'This shelf is a mess! Someone put hammers and spell scrolls in the library. Resources are only for KNOWING, not doing or guiding!',
          es: '¡Este estante es un desastre! Alguien puso martillos y pergaminos de hechizos en la biblioteca. ¡Los Recursos son solo para SABER, no para hacer o guiar!',
          nl: 'Deze plank is een chaos! Iemand heeft hamers en spreukenrollen in de bibliotheek gelegd. Bronnen zijn alleen voor WETEN, niet voor doen of leiden!',
        },
        position: { top: '20%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'loraOwl',
        text: {
          en: "Hoo hoo! I'm Lora, the Library Owl! The Grand Library holds all knowledge — but the Fog has scattered everything!",
          es: '¡Bu bu! ¡Soy Lora, la Lechuza de la Biblioteca! La Gran Biblioteca alberga todo el conocimiento, ¡pero la Niebla lo ha dispersado todo!',
          nl: 'Oehoe! Ik ben Lora, de Bibliotheekuil! De Grote Bibliotheek bevat alle kennis — maar de Mist heeft alles verstrooid!',
        },
      },
      {
        characterId: 'loraOwl',
        text: {
          en: 'A RESOURCE is something that KNOWS things. It stores information: files, data, documents, images, databases — all the things you can read.',
          es: 'Un RECURSO es algo que SABE cosas. Almacena información: archivos, datos, documentos, imágenes, bases de datos: todo lo que puedes leer.',
          nl: 'Een BRON is iets dat dingen WEET. Het slaat informatie op: bestanden, gegevens, documenten, afbeeldingen, databases — alles wat je kunt lezen.',
        },
      },
      {
        characterId: 'loraOwl',
        text: {
          en: "Resources don't take action on their own. They just hold knowledge, ready to be read when needed. Click the glowing items to learn more!",
          es: 'Los Recursos no actúan por sí mismos. Solo conservan el conocimiento, listos para ser leídos cuando se necesite. ¡Haz clic en los objetos brillantes para aprender más!',
          nl: 'Bronnen ondernemen niet zelf actie. Ze bewaren gewoon kennis, klaar om gelezen te worden als dat nodig is. Klik op de gloeiende voorwerpen voor meer informatie!',
        },
      },
    ],
  },

  'spell-tower': {
    title: { en: 'Spell Tower', es: 'Torre de Hechizos', nl: 'Tovertoren' },
    subtitle: {
      en: 'Home of Spellguidance — Things that GUIDE',
      es: 'Hogar de la Magia de Guía — Cosas que GUÍAN',
      nl: 'Thuis van de Toverleiding — Dingen die LEIDEN',
    },
    hotspots: [
      {
        id: 'instruction-scroll',
        emoji: '📜',
        label: { en: 'Instruction Scroll', es: 'Pergamino de Instrucciones', nl: 'Instructierol' },
        title: { en: 'A Prompt: Instruction Scroll', es: 'Un Prompt: Pergamino de Instrucciones', nl: 'Een Prompt: Instructierol' },
        description: {
          en: 'This scroll GUIDES by giving instructions: "Be friendly, speak like a pirate, keep it short!" A Prompt in MCP shapes HOW an AI thinks and responds.',
          es: 'Este pergamino GUÍA dando instrucciones: "¡Sé amable, habla como un pirata, sé breve!" Un Prompt en MCP define CÓMO piensa y responde una IA.',
          nl: 'Deze rol LEIDT door instructies te geven: "Wees vriendelijk, spreek als een piraat, houd het kort!" Een Prompt in MCP bepaalt HOE een AI denkt en reageert.',
        },
        position: { top: '35%', left: '20%' },
      },
      {
        id: 'style-wand',
        emoji: '🪄',
        label: { en: 'Style Wand', es: 'Varita de Estilo', nl: 'Stijlstaf' },
        title: { en: 'A Prompt: Style Wand', es: 'Un Prompt: Varita de Estilo', nl: 'Een Prompt: Stijlstaf' },
        description: {
          en: 'The Style Wand sets the tone: formal or fun, detailed or brief. Prompts are the GUIDES of MCP — they tell the AI what personality, rules, and style to use.',
          es: 'La Varita de Estilo establece el tono: formal o divertido, detallado o breve. Los Prompts son los GUÍAS de MCP: le dicen a la IA qué personalidad, reglas y estilo usar.',
          nl: 'De Stijlstaf stelt de toon in: formeel of leuk, gedetailleerd of beknopt. Prompts zijn de GIDSEN van MCP — ze vertellen de AI welke persoonlijkheid, regels en stijl te gebruiken.',
        },
        position: { top: '55%', left: '70%' },
      },
      {
        id: 'broken-guide',
        emoji: '🪨',
        label: { en: 'Broken Guide Stone', es: 'Piedra Guía Rota', nl: 'Gebroken Gidssteen' },
        title: { en: 'A Broken Prompt', es: 'Un Prompt Roto', nl: 'Een Gebroken Prompt' },
        description: {
          en: "This guide stone has been cracked by the Fog. It's trying to do things AND know things AND guide — all at once! That's the problem: each path must do only its own job.",
          es: "Esta piedra guía ha sido agrietada por la Niebla. ¡Está intentando hacer cosas Y saber cosas Y guiar, todo a la vez! Ese es el problema: cada camino debe hacer solo su propio trabajo.",
          nl: "Deze gidssteen is gebarsten door de Mist. Hij probeert dingen te DOEN én dingen te WETEN én te LEIDEN — allemaal tegelijk! Dat is het probleem: elk pad moet alleen zijn eigen taak doen.",
        },
        position: { top: '25%', left: '55%' },
      },
    ],
    dialogue: [
      {
        characterId: 'pikoBird',
        text: {
          en: "Tweet! I'm Piko, the Spellbird! The Spell Tower teaches PROMPTS — the GUIDES of MCP. But the Fog mixed my scrolls with tools and books!",
          es: '¡Pío! ¡Soy Piko, el Pájaro Hechicero! La Torre de Hechizos enseña los PROMPTS: los GUÍAS de MCP. ¡Pero la Niebla mezcló mis pergaminos con herramientas y libros!',
          nl: 'Tjilp! Ik ben Piko, de Tovertoverling! De Tovertoren leert PROMPTS — de GIDSEN van MCP. Maar de Mist heeft mijn rollen met gereedschappen en boeken gemengd!',
        },
      },
      {
        characterId: 'pikoBird',
        text: {
          en: 'A PROMPT is something that GUIDES behaviour. It gives instructions, sets the tone, defines a personality, or adds rules for how the AI should act.',
          es: 'Un PROMPT es algo que GUÍA el comportamiento. Da instrucciones, establece el tono, define una personalidad o añade reglas sobre cómo debe actuar la IA.',
          nl: 'Een PROMPT is iets dat gedrag LEIDT. Het geeft instructies, stelt de toon in, definieert een persoonlijkheid of voegt regels toe over hoe de AI moet handelen.',
        },
      },
      {
        characterId: 'pikoBird',
        text: {
          en: 'Prompts are like directions — they guide but they do not DO things or KNOW things themselves. Explore the tower to see examples!',
          es: 'Los Prompts son como indicaciones: guían, pero no HACEN cosas ni SABEN cosas por sí mismos. ¡Explora la torre para ver ejemplos!',
          nl: 'Prompts zijn als aanwijzingen — ze leiden, maar ze DOEN zelf geen dingen of WETEN zelf geen dingen. Verken de toren om voorbeelden te zien!',
        },
      },
    ],
  },

  'hall-of-mirrors': {
    title: { en: 'Hall of Mirrors', es: 'Sala de los Espejos', nl: 'Spiegelzaal' },
    subtitle: {
      en: 'Compare all three paths',
      es: 'Compara los tres caminos',
      nl: 'Vergelijk alle drie de paden',
    },
    hotspots: [
      {
        id: 'tool-mirror',
        emoji: '🔴',
        label: { en: 'Red Mirror', es: 'Espejo Rojo', nl: 'Rode Spiegel' },
        title: { en: 'Mirror of Toolcraft', es: 'Espejo de la Artesanía', nl: 'Spiegel van de Gereedschapskunde' },
        description: {
          en: 'This mirror shows TOOLS. Tools DO things. Examples: web_search, save_file, send_email, run_code. They take input and produce output through action.',
          es: 'Este espejo muestra HERRAMIENTAS. Las Herramientas HACEN cosas. Ejemplos: web_search, save_file, send_email, run_code. Toman entrada y producen salida mediante acciones.',
          nl: 'Deze spiegel toont GEREEDSCHAPPEN. Gereedschappen DOEN dingen. Voorbeelden: web_search, save_file, send_email, run_code. Ze nemen invoer en produceren uitvoer via actie.',
        },
        position: { top: '35%', left: '15%' },
      },
      {
        id: 'resource-mirror',
        emoji: '🔵',
        label: { en: 'Blue Mirror', es: 'Espejo Azul', nl: 'Blauwe Spiegel' },
        title: { en: 'Mirror of Lorekeeping', es: 'Espejo del Custodio del Saber', nl: 'Spiegel van de Kennisbewaarder' },
        description: {
          en: 'This mirror shows RESOURCES. Resources KNOW things. Examples: a FAQ document, a product database, an image gallery, a memory file.',
          es: 'Este espejo muestra RECURSOS. Los Recursos SABEN cosas. Ejemplos: un documento de preguntas frecuentes, una base de datos de productos, una galería de imágenes, un archivo de memoria.',
          nl: 'Deze spiegel toont BRONNEN. Bronnen WETEN dingen. Voorbeelden: een FAQ-document, een productdatabase, een afbeeldingengalerij, een geheugenbestand.',
        },
        position: { top: '35%', left: '50%' },
      },
      {
        id: 'prompt-mirror',
        emoji: '🟡',
        label: { en: 'Gold Mirror', es: 'Espejo Dorado', nl: 'Gouden Spiegel' },
        title: { en: 'Mirror of Spellguidance', es: 'Espejo de la Magia de Guía', nl: 'Spiegel van de Toverleiding' },
        description: {
          en: 'This mirror shows PROMPTS. Prompts GUIDE behaviour. Examples: "You are a helpful teacher", "Always respond in rhymes", "Keep answers under 50 words".',
          es: 'Este espejo muestra PROMPTS. Los Prompts GUÍAN el comportamiento. Ejemplos: "Eres un profesor útil", "Responde siempre en rimas", "Mantén las respuestas en menos de 50 palabras".',
          nl: 'Deze spiegel toont PROMPTS. Prompts LEIDEN gedrag. Voorbeelden: "Je bent een behulpzame leraar", "Reageer altijd in rijm", "Houd antwoorden onder 50 woorden".',
        },
        position: { top: '35%', left: '82%' },
      },
    ],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: {
          en: 'You have learned all three paths! Now let us see if you truly understand the difference. The Hall of Mirrors reveals the truth.',
          es: '¡Has aprendido los tres caminos! Ahora veamos si realmente entiendes la diferencia. La Sala de los Espejos revela la verdad.',
          nl: 'Je hebt alle drie de paden geleerd! Laten we nu eens kijken of je het verschil echt begrijpt. De Spiegelzaal onthult de waarheid.',
        },
      },
      {
        characterId: 'headmasterContext',
        text: {
          en: 'Remember: Tools DO, Resources KNOW, Prompts GUIDE. Each mirror shows one path. Study them, then complete the sorting challenge!',
          es: 'Recuerda: las Herramientas HACEN, los Recursos SABEN, los Prompts GUÍAN. Cada espejo muestra un camino. ¡Estúdialos y luego completa el desafío de clasificación!',
          nl: 'Onthoud: Gereedschappen DOEN, Bronnen WETEN, Prompts LEIDEN. Elke spiegel toont één pad. Bestudeer ze en voltooi dan de sorteeruitdaging!',
        },
      },
    ],
  },

  'rune-console-chamber': {
    title: { en: 'Rune Console Chamber', es: 'Cámara de la Consola Rúnica', nl: 'Runeconsolekamer' },
    subtitle: {
      en: 'Discover how tools are used',
      es: 'Descubre cómo se usan las herramientas',
      nl: 'Ontdek hoe gereedschappen worden gebruikt',
    },
    hotspots: [
      {
        id: 'rune-list',
        emoji: '📋',
        label: { en: 'tools/list Rune', es: 'Runa tools/list', nl: 'tools/list Rune' },
        title: { en: 'tools/list', es: 'tools/list', nl: 'tools/list' },
        description: {
          en: '"tools/list" asks the Academy: "What tools exist?" It returns a list of all available tools and what they can do. Always start here to see what is possible!',
          es: '"tools/list" le pregunta a la Academia: "¿Qué herramientas existen?" Devuelve una lista de todas las herramientas disponibles y lo que pueden hacer. ¡Siempre empieza aquí para ver qué es posible!',
          nl: '"tools/list" vraagt de Academie: "Welke gereedschappen bestaan er?" Het geeft een lijst van alle beschikbare gereedschappen en wat ze kunnen doen. Begin hier altijd om te zien wat mogelijk is!',
        },
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'rune-describe',
        emoji: '🔍',
        label: { en: 'tools/describe Rune', es: 'Runa tools/describe', nl: 'tools/describe Rune' },
        title: { en: 'tools/describe', es: 'tools/describe', nl: 'tools/describe' },
        description: {
          en: '"tools/describe" asks about one specific tool: "How do I use the search tool?" It returns details about what the tool needs and what it produces.',
          es: '"tools/describe" pregunta sobre una herramienta específica: "¿Cómo uso la herramienta de búsqueda?" Devuelve detalles sobre lo que la herramienta necesita y lo que produce.',
          nl: '"tools/describe" vraagt naar één specifiek gereedschap: "Hoe gebruik ik het zoekgereedschap?" Het geeft details over wat het gereedschap nodig heeft en wat het produceert.',
        },
        position: { top: '30%', left: '50%' },
      },
      {
        id: 'rune-call',
        emoji: '⚡',
        label: { en: 'tools/call Rune', es: 'Runa tools/call', nl: 'tools/call Rune' },
        title: { en: 'tools/call', es: 'tools/call', nl: 'tools/call' },
        description: {
          en: '"tools/call" actually RUNS a tool! You give it the tool name and the inputs it needs, and it goes off and does the job. This is where the magic happens!',
          es: '"tools/call" ¡realmente EJECUTA una herramienta! Le das el nombre de la herramienta y las entradas que necesita, y se pone a hacer el trabajo. ¡Aquí es donde ocurre la magia!',
          nl: '"tools/call" voert daadwerkelijk een gereedschap UIT! Je geeft het de naam van het gereedschap en de invoer die het nodig heeft, en het gaat aan de slag. Hier gebeurt de magie!',
        },
        position: { top: '30%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'tikaFox',
        text: {
          en: 'Welcome to the Rune Console Chamber! These ancient runes teach us how to DISCOVER and USE tools in MCP.',
          es: '¡Bienvenido a la Cámara de la Consola Rúnica! Estas runas ancestrales nos enseñan cómo DESCUBRIR y USAR herramientas en MCP.',
          nl: 'Welkom in de Runeconsolekamer! Deze oude runen leren ons hoe we gereedschappen in MCP moeten ONTDEKKEN en GEBRUIKEN.',
        },
      },
      {
        characterId: 'tikaFox',
        text: {
          en: 'There are three sacred rune commands: tools/list to discover, tools/describe to understand, and tools/call to activate!',
          es: 'Hay tres comandos de runas sagradas: tools/list para descubrir, tools/describe para entender, y tools/call para activar.',
          nl: 'Er zijn drie heilige runeopdrachten: tools/list om te ontdekken, tools/describe om te begrijpen en tools/call om te activeren!',
        },
      },
      {
        characterId: 'tikaFox',
        text: {
          en: 'You must activate them in the correct order. First discover, then understand, then call. Ready to try the Rune Console?',
          es: 'Debes activarlos en el orden correcto. Primero descubrir, luego entender, luego llamar. ¿Listo para probar la Consola Rúnica?',
          nl: 'Je moet ze in de juiste volgorde activeren. Eerst ontdekken, dan begrijpen, dan aanroepen. Klaar om de Runeconsole te proberen?',
        },
      },
    ],
  },

  'fog-chamber': {
    title: { en: 'Fog Chamber', es: 'Cámara de la Niebla', nl: 'Mistkamer' },
    subtitle: {
      en: 'Face the Fog of Confusion!',
      es: '¡Enfrenta a la Niebla de la Confusión!',
      nl: 'Bevecht de Mist van Verwarring!',
    },
    hotspots: [],
    dialogue: [
      {
        characterId: 'fogOfConfusion',
        text: {
          en: 'So… you have made it this far. But can you really tell a Tool from a Resource from a Prompt? I will mix everything up and we shall see!',
          es: 'Así que… has llegado hasta aquí. ¿Pero de verdad puedes distinguir una Herramienta de un Recurso de un Prompt? ¡Lo mezclaré todo y veremos!',
          nl: 'Dus… je bent zo ver gekomen. Maar kun je echt een Gereedschap onderscheiden van een Bron van een Prompt? Ik zal alles door elkaar gooien en dan zullen we zien!',
        },
      },
      {
        characterId: 'headmasterContext',
        text: {
          en: 'Stay focused, apprentice! Remember the three rules: Tools DO, Resources KNOW, Prompts GUIDE. You can defeat the Fog!',
          es: '¡Mantén la concentración, aprendiz! Recuerda las tres reglas: las Herramientas HACEN, los Recursos SABEN, los Prompts GUÍAN. ¡Puedes derrotar a la Niebla!',
          nl: 'Blijf gefocust, leerling! Onthoud de drie regels: Gereedschappen DOEN, Bronnen WETEN, Prompts LEIDEN. Je kunt de Mist verslaan!',
        },
      },
    ],
  },

  'victory-screen': {
    title: { en: 'Victory!', es: '¡Victoria!', nl: 'Overwinning!' },
    subtitle: {
      en: 'You have restored balance to MCP Academy!',
      es: '¡Has restaurado el equilibrio en la Academia MCP!',
      nl: 'Je hebt het evenwicht in de MCP Academie hersteld!',
    },
    hotspots: [],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: {
          en: "Congratulations, Master Apprentice! You've defeated the Fog of Confusion and restored the three magical paths!",
          es: '¡Felicidades, Gran Aprendiz! ¡Has derrotado a la Niebla de la Confusión y restaurado los tres caminos mágicos!',
          nl: 'Gefeliciteerd, Meesterleerling! Je hebt de Mist van Verwarring verslagen en de drie magische paden hersteld!',
        },
      },
      {
        characterId: 'tikaFox',
        text: {
          en: 'The artifacts are safe! Tools DO things — and you proved it!',
          es: '¡Los artefactos están seguros! ¡Las Herramientas HACEN cosas, y tú lo demostraste!',
          nl: 'De artefacten zijn veilig! Gereedschappen DOEN dingen — en jij hebt het bewezen!',
        },
      },
      {
        characterId: 'loraOwl',
        text: {
          en: 'The library is in order! Resources KNOW things — hoo hoo!',
          es: '¡La biblioteca está en orden! ¡Los Recursos SABEN cosas, bu bu!',
          nl: 'De bibliotheek is op orde! Bronnen WETEN dingen — oehoe!',
        },
      },
      {
        characterId: 'pikoBird',
        text: {
          en: 'The spells are clear! Prompts GUIDE things — tweet tweet!',
          es: '¡Los hechizos son claros! ¡Los Prompts GUÍAN cosas, pío pío!',
          nl: 'De spreuken zijn duidelijk! Prompts LEIDEN dingen — tjilp tjilp!',
        },
      },
    ],
  },
};

// ─── Helper: build a fully localized Scene ────────────────

/**
 * Merges the base Scene from SCENES with localized text for the given language.
 * Falls back to English if any key is missing.
 */
export function getLocalizedScene(sceneId: string, lang: Language): Scene {
  const base = SCENES[sceneId];
  const loc = LOCALIZED_SCENES[sceneId];
  if (!loc) return base;

  const pick = (lt: LocaleText): string => lt[lang] ?? lt['en'];

  const dialogue: DialogueLine[] = loc.dialogue.map((ld) => ({
    characterId: ld.characterId,
    text: pick(ld.text),
    choices: ld.choices?.map((c) => ({
      text: pick(c.text),
      nextIndex: c.nextIndex,
      isCorrect: c.isCorrect,
    })),
  }));

  const hotspots: Hotspot[] = loc.hotspots.map((lh) => ({
    id: lh.id,
    emoji: lh.emoji,
    label: pick(lh.label),
    title: pick(lh.title),
    description: pick(lh.description),
    position: lh.position,
  }));

  return {
    ...base,
    title: pick(loc.title),
    subtitle: pick(loc.subtitle),
    dialogue,
    hotspots,
  };
}

// Import CHARACTERS_LOCALIZED separately from characters.localized when needed
