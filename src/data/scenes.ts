import type { Scene } from '../types/game';
import { CHARACTERS } from './characters';

export const SCENES: Record<string, Scene> = {
  'world-map': {
    id: 'world-map',
    title: 'MCP Academy',
    subtitle: 'World Map — Choose your next room',
    emoji: '🗺️',
    background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)',
    characters: [],
    hotspots: [],
    dialogue: [],
  },

  'great-entrance-hall': {
    id: 'great-entrance-hall',
    title: 'Great Entrance Hall',
    subtitle: 'Where every journey begins',
    emoji: '🏛️',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    path: undefined,
    badge: undefined,
    unlocksScenes: ['artifact-hall', 'grand-library', 'spell-tower'],
    characters: [CHARACTERS.headmasterContext],
    hotspots: [
      {
        id: 'mcp-scroll',
        label: 'Ancient Scroll',
        emoji: '📜',
        title: 'What is MCP?',
        description:
          'MCP stands for Model Context Protocol. It is a way for AI systems to understand three kinds of magic: things that DO, things that KNOW, and things that GUIDE.',
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'three-doors',
        label: 'Three Glowing Doors',
        emoji: '🚪',
        title: 'The Three Paths',
        description:
          'Three magical paths keep the Academy in balance. Toolcraft (red), Lorekeeping (blue), and Spellguidance (gold). Something has mixed them up — can you fix it?',
        position: { top: '50%', left: '75%' },
      },
      {
        id: 'notice-board',
        label: 'Notice Board',
        emoji: '📋',
        title: 'Academy Rules',
        description:
          'Rule 1: Tools DO things. Rule 2: Resources KNOW things. Rule 3: Prompts GUIDE things. Never confuse them or the Academy goes haywire!',
        position: { top: '20%', left: '55%' },
      },
    ],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: 'Welcome, young apprentice! I am Headmaster Context. MCP Academy is in trouble — the three magical paths have been tangled together!',
      },
      {
        characterId: 'headmasterContext',
        text: 'You must visit each wing of the Academy, meet our magical guides, and restore the three paths. Are you ready?',
        choices: [
          { text: "Yes! I'm ready to help!", nextIndex: 2, isCorrect: true },
          { text: 'Can you explain the paths first?', nextIndex: 3 },
        ],
      },
      {
        characterId: 'headmasterContext',
        text: "Wonderful! Start by exploring the rooms. Click on glowing objects to discover clues. Let's restore balance!",
      },
      {
        characterId: 'headmasterContext',
        text: 'Of course! There are three paths: Toolcraft (things that DO), Lorekeeping (things that KNOW), and Spellguidance (things that GUIDE). Each has its own wing!',
      },
    ],
  },

  'artifact-hall': {
    id: 'artifact-hall',
    title: 'Artifact Hall',
    subtitle: 'Home of Toolcraft — Things that DO',
    emoji: '⚒️',
    background: 'linear-gradient(135deg, #3d0000 0%, #7b1010 50%, #3d0000 100%)',
    path: 'toolcraft',
    badge: 'badge-tools',
    unlocksScenes: ['hall-of-mirrors'],
    characters: [CHARACTERS.tikaFox],
    hotspots: [
      {
        id: 'magic-hammer',
        label: 'Magic Hammer',
        emoji: '🔨',
        title: 'A Tool: Magic Hammer',
        description:
          'This hammer DOES something — it builds walls. A Tool in MCP is like this: it takes a request and performs a real action, like searching the web or saving a file.',
        position: { top: '40%', left: '15%' },
      },
      {
        id: 'search-crystal',
        label: 'Search Crystal',
        emoji: '🔮',
        title: 'A Tool: Search Crystal',
        description:
          'The Search Crystal DOES a web search. Tools are the action-takers of MCP. They receive input and return output after doing something in the world.',
        position: { top: '25%', left: '60%' },
      },
      {
        id: 'artifact-pedestal',
        label: 'Empty Pedestal',
        emoji: '🗿',
        title: 'Something is Missing…',
        description:
          'This pedestal held the Golden Wrench — a powerful tool artifact. Tika says it was taken by the Fog of Confusion. We need to get it back!',
        position: { top: '60%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'tikaFox',
        text: "Hi! I'm Tika, the Artifact Fox! This is the Artifact Hall where we keep magical tools. But something's wrong — someone mixed up tools with books and spells!",
      },
      {
        characterId: 'tikaFox',
        text: 'A TOOL is something that DOES things. It takes a job and completes it — like searching, writing, calculating, or building.',
      },
      {
        characterId: 'tikaFox',
        text: 'Can you spot which items here are real Tools? Click the glowing objects to investigate!',
      },
    ],
  },

  'grand-library': {
    id: 'grand-library',
    title: 'Grand Library',
    subtitle: 'Home of Lorekeeping — Things that KNOW',
    emoji: '📚',
    background: 'linear-gradient(135deg, #001a4d 0%, #003d99 50%, #001a4d 100%)',
    path: 'lorekeeping',
    badge: 'badge-resources',
    unlocksScenes: ['hall-of-mirrors'],
    characters: [CHARACTERS.loraOwl],
    hotspots: [
      {
        id: 'ancient-tome',
        label: 'Ancient Tome',
        emoji: '📖',
        title: 'A Resource: Ancient Tome',
        description:
          'This book KNOWS things — it contains centuries of knowledge. A Resource in MCP is like this: it holds data, files, or information that can be read and used.',
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'memory-crystal',
        label: 'Memory Crystal',
        emoji: '💎',
        title: 'A Resource: Memory Crystal',
        description:
          'The Memory Crystal stores the Academy\'s records. Resources don\'t DO things — they KNOW things. They are like files, databases, or documents.',
        position: { top: '50%', left: '65%' },
      },
      {
        id: 'lore-shelf',
        label: 'Mixed-Up Shelf',
        emoji: '📦',
        title: 'Oh no — Mixed Up!',
        description:
          'This shelf is a mess! Someone put hammers and spell scrolls in the library. Resources are only for KNOWING, not doing or guiding!',
        position: { top: '20%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'loraOwl',
        text: "Hoo hoo! I'm Lora, the Library Owl! The Grand Library holds all knowledge — but the Fog has scattered everything!",
      },
      {
        characterId: 'loraOwl',
        text: 'A RESOURCE is something that KNOWS things. It stores information: files, data, documents, images, databases — all the things you can read.',
      },
      {
        characterId: 'loraOwl',
        text: "Resources don't take action on their own. They just hold knowledge, ready to be read when needed. Click the glowing items to learn more!",
      },
    ],
  },

  'spell-tower': {
    id: 'spell-tower',
    title: 'Spell Tower',
    subtitle: 'Home of Spellguidance — Things that GUIDE',
    emoji: '✨',
    background: 'linear-gradient(135deg, #2d1b00 0%, #7a4900 50%, #2d1b00 100%)',
    path: 'spellguidance',
    badge: 'badge-prompts',
    unlocksScenes: ['hall-of-mirrors'],
    characters: [CHARACTERS.pikoBird],
    hotspots: [
      {
        id: 'instruction-scroll',
        label: 'Instruction Scroll',
        emoji: '📜',
        title: 'A Prompt: Instruction Scroll',
        description:
          'This scroll GUIDES by giving instructions: "Be friendly, speak like a pirate, keep it short!" A Prompt in MCP shapes HOW an AI thinks and responds.',
        position: { top: '35%', left: '20%' },
      },
      {
        id: 'style-wand',
        label: 'Style Wand',
        emoji: '🪄',
        title: 'A Prompt: Style Wand',
        description:
          'The Style Wand sets the tone: formal or fun, detailed or brief. Prompts are the GUIDES of MCP — they tell the AI what personality, rules, and style to use.',
        position: { top: '55%', left: '70%' },
      },
      {
        id: 'broken-guide',
        label: 'Broken Guide Stone',
        emoji: '🪨',
        title: 'A Broken Prompt',
        description:
          "This guide stone has been cracked by the Fog. It's trying to do things AND know things AND guide — all at once! That's the problem: each path must do only its own job.",
        position: { top: '25%', left: '55%' },
      },
    ],
    dialogue: [
      {
        characterId: 'pikoBird',
        text: "Tweet! I'm Piko, the Spellbird! The Spell Tower teaches PROMPTS — the GUIDES of MCP. But the Fog mixed my scrolls with tools and books!",
      },
      {
        characterId: 'pikoBird',
        text: 'A PROMPT is something that GUIDES behaviour. It gives instructions, sets the tone, defines a personality, or adds rules for how the AI should act.',
      },
      {
        characterId: 'pikoBird',
        text: 'Prompts are like directions — they guide but they do not DO things or KNOW things themselves. Explore the tower to see examples!',
      },
    ],
  },

  'hall-of-mirrors': {
    id: 'hall-of-mirrors',
    title: 'Hall of Mirrors',
    subtitle: 'Compare all three paths',
    emoji: '🪞',
    background: 'linear-gradient(135deg, #1a0533 0%, #4a1570 50%, #1a0533 100%)',
    path: undefined,
    badge: 'badge-comparison',
    unlocksScenes: ['rune-console-chamber'],
    characters: [CHARACTERS.headmasterContext],
    hotspots: [
      {
        id: 'tool-mirror',
        label: 'Red Mirror',
        emoji: '🔴',
        title: 'Mirror of Toolcraft',
        description:
          'This mirror shows TOOLS. Tools DO things. Examples: web_search, save_file, send_email, run_code. They take input and produce output through action.',
        position: { top: '35%', left: '15%' },
      },
      {
        id: 'resource-mirror',
        label: 'Blue Mirror',
        emoji: '🔵',
        title: 'Mirror of Lorekeeping',
        description:
          'This mirror shows RESOURCES. Resources KNOW things. Examples: a FAQ document, a product database, an image gallery, a memory file.',
        position: { top: '35%', left: '50%' },
      },
      {
        id: 'prompt-mirror',
        label: 'Gold Mirror',
        emoji: '🟡',
        title: 'Mirror of Spellguidance',
        description:
          'This mirror shows PROMPTS. Prompts GUIDE behaviour. Examples: "You are a helpful teacher", "Always respond in rhymes", "Keep answers under 50 words".',
        position: { top: '35%', left: '82%' },
      },
    ],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: 'You have learned all three paths! Now let us see if you truly understand the difference. The Hall of Mirrors reveals the truth.',
      },
      {
        characterId: 'headmasterContext',
        text: 'Remember: Tools DO, Resources KNOW, Prompts GUIDE. Each mirror shows one path. Study them, then complete the sorting challenge!',
      },
    ],
  },

  'rune-console-chamber': {
    id: 'rune-console-chamber',
    title: 'Rune Console Chamber',
    subtitle: 'Discover how tools are used',
    emoji: '💻',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #001a00 100%)',
    path: 'toolcraft',
    badge: 'badge-rune',
    unlocksScenes: ['fog-chamber'],
    characters: [CHARACTERS.tikaFox],
    hotspots: [
      {
        id: 'rune-list',
        label: 'tools/list Rune',
        emoji: '📋',
        title: 'tools/list',
        description:
          '"tools/list" asks the Academy: "What tools exist?" It returns a list of all available tools and what they can do. Always start here to see what is possible!',
        position: { top: '30%', left: '20%' },
      },
      {
        id: 'rune-describe',
        label: 'tools/describe Rune',
        emoji: '🔍',
        title: 'tools/describe',
        description:
          '"tools/describe" asks about one specific tool: "How do I use the search tool?" It returns details about what the tool needs and what it produces.',
        position: { top: '30%', left: '50%' },
      },
      {
        id: 'rune-call',
        label: 'tools/call Rune',
        emoji: '⚡',
        title: 'tools/call',
        description:
          '"tools/call" actually RUNS a tool! You give it the tool name and the inputs it needs, and it goes off and does the job. This is where the magic happens!',
        position: { top: '30%', left: '80%' },
      },
    ],
    dialogue: [
      {
        characterId: 'tikaFox',
        text: 'Welcome to the Rune Console Chamber! These ancient runes teach us how to DISCOVER and USE tools in MCP.',
      },
      {
        characterId: 'tikaFox',
        text: 'There are three sacred rune commands: tools/list to discover, tools/describe to understand, and tools/call to activate!',
      },
      {
        characterId: 'tikaFox',
        text: 'You must activate them in the correct order. First discover, then understand, then call. Ready to try the Rune Console?',
      },
    ],
  },

  'fog-chamber': {
    id: 'fog-chamber',
    title: 'Fog Chamber',
    subtitle: 'Face the Fog of Confusion!',
    emoji: '🌫️',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%)',
    path: undefined,
    badge: 'badge-fog-defeated',
    unlocksScenes: ['victory-screen'],
    characters: [CHARACTERS.fogOfConfusion],
    hotspots: [],
    dialogue: [
      {
        characterId: 'fogOfConfusion',
        text: 'So… you have made it this far. But can you really tell a Tool from a Resource from a Prompt? I will mix everything up and we shall see!',
      },
      {
        characterId: 'headmasterContext',
        text: 'Stay focused, apprentice! Remember the three rules: Tools DO, Resources KNOW, Prompts GUIDE. You can defeat the Fog!',
      },
    ],
  },

  'victory-screen': {
    id: 'victory-screen',
    title: 'Victory!',
    subtitle: 'You have restored balance to MCP Academy!',
    emoji: '🏆',
    background: 'linear-gradient(135deg, #1a4000 0%, #2d6e00 50%, #1a4000 100%)',
    characters: [
      CHARACTERS.headmasterContext,
      CHARACTERS.tikaFox,
      CHARACTERS.loraOwl,
      CHARACTERS.pikoBird,
    ],
    hotspots: [],
    dialogue: [
      {
        characterId: 'headmasterContext',
        text: "Congratulations, Master Apprentice! You've defeated the Fog of Confusion and restored the three magical paths!",
      },
      {
        characterId: 'tikaFox',
        text: 'The artifacts are safe! Tools DO things — and you proved it!',
      },
      {
        characterId: 'loraOwl',
        text: 'The library is in order! Resources KNOW things — hoo hoo!',
      },
      {
        characterId: 'pikoBird',
        text: 'The spells are clear! Prompts GUIDE things — tweet tweet!',
      },
    ],
  },
};

export const SCENE_ORDER: string[] = [
  'world-map',
  'great-entrance-hall',
  'artifact-hall',
  'grand-library',
  'spell-tower',
  'hall-of-mirrors',
  'rune-console-chamber',
  'fog-chamber',
  'victory-screen',
];
