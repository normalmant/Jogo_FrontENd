// ===================== DADOS =====================
const MAX_ROOMS = 1000;

const SKINS = [
    { id: 'batman', name: 'Batman', emoji: '🦇', color: '#1a1a2e' },
    { id: 'superman', name: 'Superman', emoji: '🦸', color: '#0066cc' },
    { id: 'mago', name: 'Mago', emoji: '🧙', color: '#6b3fa0' },
    { id: 'barbie', name: 'Barbie', emoji: '👸', color: '#ff69b4' },
    { id: 'mulher-maravilha', name: 'Mulher Maravilha', emoji: '🦸‍♀️', color: '#cc0000' },
    { id: 'supergirl', name: 'Super-Girl', emoji: '👩‍🦸', color: '#3388ff' },
    { id: 'mulher-aranha', name: 'Mulher Aranha', emoji: '🕷️', color: '#990000' },
    { id: 'viuva-negra', name: 'Viúva Negra', emoji: '👩‍🦰', color: '#222' },
    { id: 'gamora', name: 'Gamora', emoji: '👽', color: '#228b22' },
    { id: 'homem-aranha', name: 'Homem Aranha', emoji: '🕸️', color: '#cc0000' },
    { id: 'pantera-negra', name: 'Pantera Negra', emoji: '🐆', color: '#111' },
    { id: 'goku', name: 'Goku', emoji: '👊', color: '#ff6600' }
];

const ARMOR_NAMES = {
    helmet: ["Couro","Malha","Madeira","Ouro","Prata","Panela","Ferro","Aço","Mithril","Diamante","Rubi","Esmeralda","Obsidiana","Netherite","Coroa Divina"],
    chest:  ["Couro","Malha","Madeira","Ouro","Prata","Ferro","Aço","Mithril","Diamante","Rubi","Esmeralda","Obsidiana","Netherite","Armadura de Dragão","Peitoral Celestial"],
    pants:  ["Couro","Malha","Madeira","Ouro","Prata","Ferro","Aço","Mithril","Diamante","Rubi","Esmeralda","Obsidiana","Netherite","Calça de Dragão","Calça Celestial"],
    boots:  ["Couro","Malha","Madeira","Ouro","Prata","Ferro","Aço","Mithril","Diamante","Rubi","Esmeralda","Obsidiana","Netherite","Botas de Dragão","Botas Celestiais"]
};

const SWORD_NAMES = [
    "Graveto","Galho Maior","Espada Rachada de Madeira","Espada Novinha de Madeira",
    "Espeto de Churrasco","Espeto Duplo com Picanhas","Espada de Ferro Enferrujada",
    "Espada de Ferro Polida","Katana de Aço","Espada de Diamante","Espada de Esmeralda Reluzente",
    "Lâmina de Rubi","Espada de Obsidiana","Lâmina do Destino","Excalibur"
];

const SHIELD_NAMES = [
    "Teclado 60% Velho","Teclado 100% Novo","Tampa de Panela","Escudo de Madeira Novo",
    "Calota de Pneu","Escudo Medieval de Madeira","Escudo Medieval de Ferro",
    "Escudo de Aço","Escudo de Diamante","Escudo de Esmeralda","Escudo de Rubi",
    "Escudo de Obsidiana","Escudo de Dragão","Escudo Celestial","Escudo do Capitão América"
];

const EQUIP_EMOJIS = {
    helmet: ["🧢","⛑️","🪵","👑","🥈","🍳","⛑️","🛡️","✨","💎","🔴","💚","🖤","🔥","👑"],
    chest:  ["🦺","🥋","🪵","🟡","⚪","🛡️","🛡️","✨","💎","🔴","💚","🖤","🔥","🐉","👼"],
    pants:  ["👖","🩳","🪵","🟡","⚪","👖","👖","✨","💎","🔴","💚","🖤","🔥","🐉","👼"],
    boots:  ["👢","👟","🪵","🟡","⚪","🥾","🥾","✨","💎","🔴","💚","🖤","🔥","🐉","👼"],
    sword:  ["🪵","🌳","🗡️","⚔️","🍢","🍖","🗡️","⚔️","🗡️","💎","💚","🔴","🖤","⚔️","✨"],
    shield: ["⌨️","💻","🍳","🛡️","🛞","🛡️","🛡️","🛡️","💎","💚","🔴","🖤","🐉","👼","🔵"]
};

const BUFFS = [
    { name: "Força do Titã", desc: "+18 ATK permanente", effect: p => { p.bonusAtk += 18; } },
    { name: "Pele de Pedra", desc: "+14 DEF permanente", effect: p => { p.bonusDef += 14; } },
    { name: "Vitalidade Ancestral", desc: "+50 HP máx e cura total", effect: p => { p.maxHp += 50; p.hp = p.maxHp; } },
    { name: "Sorte do Aventureiro", desc: "Próxima sala: +1 porta segura", effect: p => { p.lucky = true; } },
    { name: "Fúria Berserker", desc: "+30 ATK / -10 DEF", effect: p => { p.bonusAtk += 30; p.bonusDef -= 10; } },
    { name: "Regeneração", desc: "Cura 40 HP + 8 HP por sala", effect: p => { p.hp = Math.min(p.maxHp, p.hp + 40); p.regen = 8; } },
    { name: "Escudo Espiritual", desc: "+20 DEF e imunidade a 1 debuff", effect: p => { p.bonusDef += 20; p.immuneDebuff = true; } }
];

const DEBUFFS = [
    { name: "Veneno Persistente", desc: "-25 HP e -6 ATK", effect: p => { p.hp = Math.max(1, p.hp - 25); p.bonusAtk -= 6; } },
    { name: "Armadura Enfraquecida", desc: "-12 DEF", effect: p => { p.bonusDef -= 12; } },
    { name: "Maldição do Cansaço", desc: "-20 HP máximo", effect: p => { p.maxHp = Math.max(40, p.maxHp - 20); p.hp = Math.min(p.hp, p.maxHp); } },
    { name: "Azar", desc: "Próxima sala mais perigosa", effect: p => { p.unlucky = true; } },
    { name: "Sangramento", desc: "-15 HP agora e -5 HP por sala (3 salas)", effect: p => { p.hp = Math.max(1, p.hp - 15); p.bleed = 3; } }
];

const ITEMS = [
    { id: 'potion_heal', name: 'Poção de Cura', emoji: '❤️‍🔥', desc: 'Cura 40 HP', type: 'heal', value: 40 },
    { id: 'potion_heal_big', name: 'Poção de Cura Grande', emoji: '💖', desc: 'Cura 80 HP', type: 'heal', value: 80 },
    { id: 'potion_dmg', name: 'Poção de Dano', emoji: '💥', desc: 'Causa 35 dano no boss', type: 'damage', value: 35 },
    { id: 'potion_stun', name: 'Poção de Atordoamento', emoji: '💫', desc: 'Boss perde o próximo turno', type: 'stun', value: 1 },
    { id: 'potion_str', name: 'Elixir de Força', emoji: '💪', desc: '+15 ATK nesta batalha', type: 'buff_atk', value: 15 },
    { id: 'potion_def', name: 'Elixir de Proteção', emoji: '🧱', desc: '+12 DEF nesta batalha', type: 'buff_def', value: 12 },
    { id: 'bomb', name: 'Bomba Caseira', emoji: '💣', desc: 'Causa 50 dano no boss', type: 'damage', value: 50 },
    { id: 'smoke', name: 'Bomba de Fumaça', emoji: '💨', desc: 'Foge da batalha (cura 20 HP)', type: 'escape', value: 20 }
];

const BOSSES = [
    { name: "Cobra Gigante", emoji: "🐍", hp: 45, atk: 9, def: 2 },
    { name: "Lâmina Viva", emoji: "⚔️", hp: 55, atk: 13, def: 4 },
    { name: "Leão Faminto", emoji: "🦁", hp: 65, atk: 15, def: 5 },
    { name: "Golem de Pedra", emoji: "🗿", hp: 90, atk: 11, def: 14 },
    { name: "Fantasma Maldito", emoji: "👻", hp: 50, atk: 18, def: 3 },
    { name: "Dragão Bebê", emoji: "🐉", hp: 110, atk: 20, def: 9 },
    { name: "Cavaleiro Negro", emoji: "🌑", hp: 100, atk: 22, def: 12 },
    { name: "Titã de Ferro", emoji: "🤖", hp: 140, atk: 24, def: 16 },
    { name: "Hidra de 3 Cabeças", emoji: "🐲", hp: 160, atk: 26, def: 10 },
    { name: "Lich Ancião", emoji: "💀", hp: 130, atk: 30, def: 8 },
    { name: "Fênix Flamejante", emoji: "🔥", hp: 150, atk: 28, def: 11 },
    { name: "Kraken das Profundezas", emoji: "🦑", hp: 180, atk: 25, def: 15 },
    { name: "Anjo Caído", emoji: "😈", hp: 200, atk: 32, def: 14 },
    { name: "Guardião do Portal", emoji: "🗿", hp: 220, atk: 30, def: 20 },
    { name: "Senhor das Sombras", emoji: "🌑", hp: 250, atk: 35, def: 18 }
];

// ===================== ESTADO =====================
const player = {
    name: '',
    skinIndex: 0,
    hp: 100, maxHp: 100,
    bonusAtk: 0, bonusDef: 0,
    regen: 0, bleed: 0,
    lucky: false, unlucky: false, immuneDebuff: false,
    levels: { helmet: 1, chest: 1, pants: 1, boots: 1, sword: 1, shield: 1 },
    unlockedGear: { helmet: [1], chest: [1], pants: [1], boots: [1], sword: [1], shield: [1] },
    items: {}, // id -> qty
    discoveredItems: {},
    room: 1,
    position: 50,
    battleAtkBonus: 0,
    battleDefBonus: 0
};

let doors = [];
let selectedUpgrades = [];
let currentBoss = null;
let defending = false;
let bossStunned = false;
let skinIndex = 0;

// ===================== FIREBASE CONFIG (RANKING GLOBAL) =====================
// 1) Crie um projeto em https://console.firebase.google.com
// 2) Ative o Firestore Database (modo teste)
// 3) Em Configurações do projeto > Seus apps > Web, copie a config
// 4) Cole os valores abaixo
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAzY_9mXDlEfk4dAD4XX_dgrza4yl7wlKE",
    authDomain: "portas-do-destino.firebaseapp.com",
    projectId: "portas-do-destino",
    storageBucket: "portas-do-destino.firebasestorage.app",
    messagingSenderId: "21404745926",
    appId: "1:21404745926:web:65790f10ac1410728017c7"
};

let db = null;
let firebaseReady = false;

function initFirebase() {
    try {
        const missing = Object.values(FIREBASE_CONFIG).some(v => !v || String(v).includes('COLE_'));
        if (missing) {
            console.warn('Firebase: configure FIREBASE_CONFIG em game.js para ativar o ranking global.');
            firebaseReady = false;
            return;
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        firebaseReady = true;
        console.log('Firebase conectado — ranking global ativo.');
    } catch (e) {
        console.error('Erro ao iniciar Firebase:', e);
        firebaseReady = false;
    }
}
initFirebase();

// ===================== RANKING GLOBAL (Firestore) =====================
// Fallback local se Firebase não estiver configurado
function getLocalRanking() {
    try { return JSON.parse(localStorage.getItem('portas_ranking') || '[]'); }
    catch { return []; }
}
function saveLocalRanking(list) {
    localStorage.setItem('portas_ranking', JSON.stringify(list));
}

async function getRanking() {
    if (!firebaseReady || !db) return getLocalRanking();
    try {
        const snap = await db.collection('ranking')
            .orderBy('rooms', 'desc')
            .limit(50)
            .get();
        return snap.docs.map(d => d.data());
    } catch (e) {
        console.error('Erro ao ler ranking:', e);
        return getLocalRanking();
    }
}

async function isNameTaken(name) {
    const n = name.toLowerCase();
    if (firebaseReady && db) {
        try {
            const snap = await db.collection('ranking')
                .where('nameLower', '==', n)
                .limit(1)
                .get();
            return !snap.empty;
        } catch (e) {
            console.error('Erro ao checar nome:', e);
        }
    }
    return getLocalRanking().some(r => r.name.toLowerCase() === n);
}

// trava para não salvar 2x se gameOver/victory rodar mais de uma vez
let rankingSaveLock = false;

async function addToRanking(name, rooms, skinId) {
    if (rankingSaveLock) return;
    rankingSaveLock = true;

    const safeId = name.toLowerCase().trim().replace(/[\/.#$\[\]]/g, '_');
    const entry = {
        name: name.trim(),
        nameLower: name.toLowerCase().trim(),
        rooms,
        skin: skinId,
        date: Date.now()
    };

    if (firebaseReady && db) {
        try {
            // ID fixo = nome → impossível duplicar o mesmo jogador
            const ref = db.collection('ranking').doc(safeId);
            const doc = await ref.get();
            if (!doc.exists) {
                await ref.set(entry);
            }
            return;
        } catch (e) {
            console.error('Erro ao salvar ranking global:', e);
            rankingSaveLock = false;
        }
    }

    // Fallback local — só adiciona se o nome ainda não estiver na lista
    let rank = getLocalRanking();
    if (!rank.some(r => r.name.toLowerCase() === entry.nameLower)) {
        rank.push(entry);
        rank.sort((a, b) => b.rooms - a.rooms);
        saveLocalRanking(rank.slice(0, 50));
    }
}

// ===================== INIT =====================
document.getElementById('btn-start').addEventListener('click', () => {
    document.getElementById('landing').classList.remove('active');
    document.getElementById('setup').classList.add('active');
    renderSkinCarousel();
});
document.getElementById('btn-back-landing').addEventListener('click', () => {
    document.getElementById('setup').classList.remove('active');
    document.getElementById('landing').classList.add('active');
});
document.getElementById('btn-confirm-setup').addEventListener('click', confirmSetup);
document.getElementById('skin-prev').addEventListener('click', () => { skinIndex = (skinIndex - 1 + SKINS.length) % SKINS.length; renderSkinCarousel(); });
document.getElementById('skin-next').addEventListener('click', () => { skinIndex = (skinIndex + 1) % SKINS.length; renderSkinCarousel(); });
document.getElementById('btn-inventory').addEventListener('click', openInventory);
document.getElementById('btn-close-inv').addEventListener('click', () => document.getElementById('inventory-panel').classList.add('hidden'));
document.getElementById('btn-codex').addEventListener('click', openCodex);
document.getElementById('btn-close-codex').addEventListener('click', () => document.getElementById('codex-panel').classList.add('hidden'));
document.getElementById('btn-ranking-landing').addEventListener('click', openRanking);
document.getElementById('btn-ranking-game').addEventListener('click', openRanking);
document.getElementById('btn-close-ranking').addEventListener('click', () => document.getElementById('ranking-panel').classList.add('hidden'));
document.getElementById('btn-confirm-upgrade').addEventListener('click', confirmUpgrades);
document.getElementById('btn-debuff-ok').addEventListener('click', () => { document.getElementById('debuff-modal').classList.add('hidden'); nextRoom(); });
document.getElementById('btn-chest-ok').addEventListener('click', () => { document.getElementById('chest-modal').classList.add('hidden'); nextRoom(); });
document.getElementById('btn-attack').addEventListener('click', () => doPlayerAction(false));
document.getElementById('btn-defend').addEventListener('click', () => doPlayerAction(true));
document.getElementById('btn-use-item').addEventListener('click', toggleItemQuick);
document.getElementById('btn-restart').addEventListener('click', () => location.reload());
document.getElementById('btn-view-ranking-end').addEventListener('click', openRanking);

document.querySelectorAll('.codex-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.codex-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('codex-gear').classList.toggle('hidden', tab.dataset.tab !== 'gear');
        document.getElementById('codex-items').classList.toggle('hidden', tab.dataset.tab !== 'items');
    });
});

document.addEventListener('keydown', handleKey);

async function confirmSetup() {
    const name = document.getElementById('player-name').value.trim();
    const err = document.getElementById('name-error');
    const btn = document.getElementById('btn-confirm-setup');
    if (!name || name.length < 2) {
        err.textContent = 'Digite um nome com pelo menos 2 caracteres.';
        err.classList.remove('hidden');
        return;
    }
    btn.disabled = true;
    err.textContent = 'Verificando nome...';
    err.classList.remove('hidden');
    const taken = await isNameTaken(name);
    if (taken) {
        err.textContent = 'Esse nome já está em uso! Escolha outro.';
        btn.disabled = false;
        return;
    }
    err.classList.add('hidden');
    player.name = name;
    player.skinIndex = skinIndex;
    rankingSaveLock = false; // nova partida pode salvar de novo
    document.getElementById('setup').classList.remove('active'); 
    document.getElementById('game').classList.add('active');
    btn.disabled = false;
    generateRoom();
    updateHUD();
    updatePlayerVisuals();
}

function renderSkinCarousel() {
    const prev = (skinIndex - 1 + SKINS.length) % SKINS.length;
    const next = (skinIndex + 1) % SKINS.length;
    // null = skin pura, sem armadura (para a pessoa ver o personagem)
    const make = (idx, el) => {
        const s = SKINS[idx];
        el.innerHTML = `<div class="skin-char">${buildCharHTML(s.id, null)}</div><div class="skin-label">${s.name}</div>`;
    };
    make(prev, document.getElementById('skin-left'));
    make(skinIndex, document.getElementById('skin-main'));
    make(next, document.getElementById('skin-right'));
    document.getElementById('skin-name').textContent = SKINS[skinIndex].name;

    const dots = document.getElementById('skin-dots');
    dots.innerHTML = '';
    SKINS.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'skin-dot' + (i === skinIndex ? ' active' : '');
        d.addEventListener('click', () => { skinIndex = i; renderSkinCarousel(); });
        dots.appendChild(d);
    });
}

// ===================== STATS =====================
function getAtk() {
    return 4 + player.levels.sword * 3 + player.bonusAtk + (player.battleAtkBonus || 0);
}
function getDef() {
    const armorAvg = (player.levels.helmet + player.levels.chest + player.levels.pants + player.levels.boots) / 4;
    return Math.floor(2 + armorAvg * 2.2 + player.levels.shield * 2.2 + player.bonusDef + (player.battleDefBonus || 0));
}
function updateHUD() {
    document.getElementById('hp').textContent = Math.max(0, Math.floor(player.hp));
    document.getElementById('max-hp').textContent = player.maxHp;
    document.getElementById('atk').textContent = getAtk();
    document.getElementById('def').textContent = getDef();
    document.getElementById('room-info').textContent = `Sala ${player.room} / ${MAX_ROOMS}`;
    const totalItems = Object.values(player.items).reduce((a, b) => a + b, 0);
    document.getElementById('potion-count').textContent = totalItems;
}
function matClass(level) {
    return 'mat-' + Math.min(15, Math.max(1, level));
}
function swordClass(level) {
    if (level <= 4) return 'sword-wood';
    if (level <= 8) return 'sword-iron';
    if (level <= 9) return 'sword-steel';
    if (level === 10) return 'sword-diamond';
    if (level === 11) return 'sword-emerald';
    if (level === 12) return 'sword-ruby';
    return 'sword-legend';
}
function shieldClass(level) {
    if (level <= 5) return 'shield-wood';
    if (level <= 8) return 'shield-iron';
    if (level <= 9) return 'shield-steel';
    if (level <= 14) return 'shield-diamond';
    return 'shield-cap';
}

function buildCharHTML(skinId, levels, scaleClass = '') {
    // levels === null → mostra só a skin, sem armadura/armas (tela de escolha)
    let gear = '';
    if (levels) {
        const lv = levels;
        gear = `
        <div class="gear-overlay">
            <div class="eq-helmet ${matClass(lv.helmet)}"></div>
            <div class="eq-chest ${matClass(lv.chest)}"></div>
            <div class="eq-pants ${matClass(lv.pants)}"></div>
            <div class="eq-boots ${matClass(lv.boots)}"></div>
            <div class="eq-sword ${swordClass(lv.sword)}"></div>
            <div class="eq-shield ${shieldClass(lv.shield)}"></div>
        </div>`;
    }
    return `
    <div class="char skin-${skinId} ${scaleClass}">
        <div class="char-cape"></div>
        <div class="char-head">
            <div class="char-hair"></div>
            <div class="char-mask"></div>
        </div>
        <div class="char-arm-l"></div>
        <div class="char-arm-r"></div>
        <div class="char-body"></div>
        <div class="char-legs">
            <div class="char-leg"></div>
            <div class="char-leg"></div>
        </div>
        ${gear}
    </div>`;
}

function updatePlayerVisuals() {
    const skin = SKINS[player.skinIndex];
    const el = document.getElementById('player-sprite');
    el.innerHTML = buildCharHTML(skin.id, player.levels);
}

// ===================== PORTAS =====================
function getDoorComposition(room) {
    // 1–15: 2 seguras, 1 boss, 2 vazias
    // 16–25: 1 segura, 2 bosses, 1 vazia, 1 debuff
    // 26+:   1 segura, 3 bosses, 1 debuff
    let types;
    if (room <= 15) {
        types = ['safe', 'safe', 'boss', 'empty', 'empty'];
    } else if (room <= 25) {
        types = ['safe', 'boss', 'boss', 'empty', 'debuff'];
    } else {
        types = ['safe', 'boss', 'boss', 'boss', 'debuff'];
    }
    if (player.lucky) {
        const idx = types.findIndex(t => t === 'boss' || t === 'empty');
        if (idx >= 0) types[idx] = 'safe';
        player.lucky = false;
    }
    if (player.unlucky) {
        const idx = types.findIndex(t => t === 'safe' || t === 'empty');
        if (idx >= 0) types[idx] = 'boss';
        player.unlucky = false;
    }
    // chance de baú (substitui um boss)
    if (Math.random() < 0.22) {
        const bossIdx = types.findIndex(t => t === 'boss');
        if (bossIdx >= 0) types[bossIdx] = 'chest';
    }
    return shuffle(types);
}

function generateRoom() {
    const container = document.getElementById('doors-container');
    container.innerHTML = '';
    doors = [];
    const types = getDoorComposition(player.room);

    for (let i = 0; i < 5; i++) {
        const type = types[i];
        const door = document.createElement('div');
        // Todas as portas idênticas visualmente — não revelam o que tem atrás
        door.className = 'door';
        door.dataset.index = i;
        door.innerHTML = `
            <div class="door-number">${i + 1}</div>
            <div class="door-label">Porta Misteriosa</div>
            <div class="door-handle"></div>
        `;
        door.addEventListener('click', () => tryOpenDoor(i));
        container.appendChild(door);
        doors.push({ type, element: door, opened: false });
    }
    player.position = 50;
    updatePlayerPosition();
    setMessage('Use ← → para mover | Espaço ou clique para abrir');
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ===================== CONTROLE =====================
function handleKey(e) {
    if (!document.getElementById('game').classList.contains('active')) return;
    const blocked = ['upgrade-modal','buff-modal','battle-modal','debuff-modal','chest-modal','end-modal','inventory-panel','codex-panel','ranking-panel']
        .some(id => !document.getElementById(id).classList.contains('hidden'));
    if (blocked) {
        if (e.key === 'Escape') {
            ['inventory-panel','codex-panel','ranking-panel'].forEach(id => document.getElementById(id).classList.add('hidden'));
        }
        return;
    }
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.position = Math.max(8, player.position - 4);
        updatePlayerPosition(); highlightNearestDoor();
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.position = Math.min(92, player.position + 4);
        updatePlayerPosition(); highlightNearestDoor();
    } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const n = getNearestDoor();
        if (n !== -1) tryOpenDoor(n);
    } else if (e.key === 'i' || e.key === 'I') openInventory();
}

function updatePlayerPosition() {
    document.getElementById('player').style.left = player.position + '%';
}
function getNearestDoor() {
    if (!doors || doors.length === 0) return -1;
    const pos = [10, 30, 50, 70, 90];
    let min = 14, nearest = -1;
    pos.forEach((p, i) => {
        if (!doors[i]) return;
        const d = Math.abs(player.position - p);
        if (d < min && !doors[i].opened) { min = d; nearest = i; }
    });
    return nearest;
}
function highlightNearestDoor() {
    if (!doors || doors.length === 0) return;
    document.querySelectorAll('.door').forEach(d => d.classList.remove('near'));
    const n = getNearestDoor();
    if (n !== -1 && doors[n] && doors[n].element) doors[n].element.classList.add('near');
}
function setMessage(msg) { document.getElementById('message').textContent = msg; }

// ===================== ABRIR PORTA =====================
function tryOpenDoor(index) {
    if (doors[index].opened) return;
    const nearest = getNearestDoor();
    if (nearest !== index && nearest !== -1) {
        setMessage('Chegue mais perto da porta!');
        return;
    }
    doors[index].opened = true;
    doors[index].element.classList.add('opened');
    doors[index].element.classList.remove('near');

    const type = doors[index].type;
    if (type === 'safe') openSafeDoor();
    else if (type === 'debuff') openDebuffDoor();
    else if (type === 'boss') openBossDoor();
    else if (type === 'chest') openChest();
    else if (type === 'empty') {
        setMessage('Essa passagem estava vazia...');
        setTimeout(() => {
            if (doors.every(d => d.opened)) nextRoom();
        }, 600);
    }
}

// ===================== SAFE =====================
function openSafeDoor() {
    setMessage('🎉 Porta Segura!');
    selectedUpgrades = [];
    const container = document.getElementById('upgrade-choices');
    container.innerHTML = '';
    const slots = [
        { id: 'helmet', label: 'Capacete' }, { id: 'chest', label: 'Peitoral' },
        { id: 'pants', label: 'Calça' }, { id: 'boots', label: 'Botas' },
        { id: 'sword', label: 'Espada' }, { id: 'shield', label: 'Escudo' }
    ];
    slots.forEach(slot => {
        const lv = player.levels[slot.id];
        if (lv >= 15) return;
        let nextName = '';
        if (slot.id === 'sword') nextName = SWORD_NAMES[lv];
        else if (slot.id === 'shield') nextName = SHIELD_NAMES[lv];
        else nextName = ARMOR_NAMES[slot.id][lv];
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<strong>${slot.label}</strong> (Nv.${lv}) → <em>${nextName}</em>`;
        btn.dataset.slot = slot.id;
        btn.addEventListener('click', () => toggleUpgrade(slot.id, btn));
        container.appendChild(btn);
    });
    if (container.children.length === 0) {
        // tudo no máximo
        document.getElementById('upgrade-modal').classList.add('hidden');
        showBuffChoices();
        return;
    }
    document.getElementById('upgrade-selected').textContent = 'Selecionados: 0/2';
    document.getElementById('btn-confirm-upgrade').disabled = true;
    document.getElementById('upgrade-modal').classList.remove('hidden');
}
function toggleUpgrade(slot, btn) {
    const idx = selectedUpgrades.indexOf(slot);
    if (idx > -1) { selectedUpgrades.splice(idx, 1); btn.classList.remove('selected'); }
    else {
        if (selectedUpgrades.length >= 2) return;
        selectedUpgrades.push(slot); btn.classList.add('selected');
    }
    document.getElementById('upgrade-selected').textContent = `Selecionados: ${selectedUpgrades.length}/2`;
    document.getElementById('btn-confirm-upgrade').disabled = selectedUpgrades.length !== 2 && selectedUpgrades.length !== document.querySelectorAll('#upgrade-choices .choice-btn').length;
    // permite confirmar com 1 se só tiver 1 opção
    if (selectedUpgrades.length >= 1 && document.querySelectorAll('#upgrade-choices .choice-btn').length === 1) {
        document.getElementById('btn-confirm-upgrade').disabled = false;
    }
}
function confirmUpgrades() {
    selectedUpgrades.forEach(slot => {
        if (player.levels[slot] < 15) {
            player.levels[slot]++;
            if (!player.unlockedGear[slot].includes(player.levels[slot])) {
                player.unlockedGear[slot].push(player.levels[slot]);
            }
        }
    });
    updatePlayerVisuals();
    updateHUD();
    document.getElementById('upgrade-modal').classList.add('hidden');
    showBuffChoices();
}
function showBuffChoices() {
    const container = document.getElementById('buff-choices');
    container.innerHTML = '';
    const available = shuffle(BUFFS).slice(0, 3);
    available.forEach(buff => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<strong>${buff.name}</strong><br><small>${buff.desc}</small>`;
        btn.addEventListener('click', () => {
            buff.effect(player);
            updateHUD();
            document.getElementById('buff-modal').classList.add('hidden');
            setMessage(`Buff: ${buff.name}`);
            setTimeout(nextRoom, 700);
        });
        container.appendChild(btn);
    });
    document.getElementById('buff-modal').classList.remove('hidden');
}

// ===================== DEBUFF =====================
function openDebuffDoor() {
    if (player.immuneDebuff) {
        player.immuneDebuff = false;
        setMessage('Seu Escudo Espiritual bloqueou o debuff!');
        setTimeout(nextRoom, 900);
        return;
    }
    const debuff = DEBUFFS[Math.floor(Math.random() * DEBUFFS.length)];
    debuff.effect(player);
    updateHUD();
    document.getElementById('debuff-text').textContent = `${debuff.name}: ${debuff.desc}`;
    document.getElementById('debuff-modal').classList.remove('hidden');
}

// ===================== BAÚ =====================
function openChest() {
    const count = 3 + Math.floor(Math.random() * 3); // 3 a 5
    const found = [];
    const pool = shuffle(ITEMS);
    for (let i = 0; i < count; i++) {
        const item = pool[i % pool.length];
        found.push(item);
        player.items[item.id] = (player.items[item.id] || 0) + 1;
        player.discoveredItems[item.id] = true;
    }
    const container = document.getElementById('chest-items');
    container.innerHTML = '';
    found.forEach(item => {
        const div = document.createElement('div');
        div.className = 'chest-item';
        div.innerHTML = `${potionIconHTML(item.id)}<div class="name">${item.name}</div>`;
        container.appendChild(div);
    });
    updateHUD();
    document.getElementById('chest-modal').classList.remove('hidden');
}

// ===================== BATALHA =====================
function openBossDoor() {
    const baseIdx = Math.min(Math.floor((player.room - 1) / 8), BOSSES.length - 1);
    const base = BOSSES[Math.min(baseIdx + Math.floor(Math.random() * 2), BOSSES.length - 1)];

    const pAtk = getAtk();
    const pDef = getDef();
    const pHp = player.maxHp;
    const room = player.room;

    // Niveis de dificuldade por faixa de salas:
    // 1–5:   bosses mais fracos (tutorial)
    // 6–15:  força parecida com a do jogador
    // 16–30: um pouco acima do jogador
    // 31+:   desafiadores, acompanham e superam um pouco o power do player
    let diff, baseMul, hpMul, atkMul, defMul;
    if (room <= 5) {
        diff = 0.50;
        baseMul = 0.40;
        atkMul = 0.40;
        defMul = 0.25;
        hpMul = 0.40;
    } else if (room <= 15) {
        diff = 0.85;
        baseMul = 0.65;
        atkMul = 0.70;
        defMul = 0.45;
        hpMul = 0.65;
    } else if (room <= 30) {
        diff = 1.00;
        baseMul = 0.85;
        atkMul = 0.85;
        defMul = 0.60;
        hpMul = 0.85;
    } else {
        // late game: sobe suave com a sala
        const extra = Math.min(0.35, (room - 30) * 0.008);
        diff = 1.10 + extra;
        baseMul = 1.00;
        atkMul = 0.95;
        defMul = 0.70;
        hpMul = 1.00;
    }

    const bossAtk = Math.max(4, Math.floor(
        base.atk * baseMul +
        pAtk * diff * atkMul +
        room * 0.25
    ));

    const bossDef = Math.max(0, Math.floor(
        base.def * baseMul * 0.8 +
        pDef * diff * defMul +
        room * 0.12
    ));

    const bossHp = Math.max(30, Math.floor(
        base.hp * hpMul +
        pHp * diff * 0.45 +
        pAtk * (1.4 + diff * 0.6) +
        room * 2.2
    ));

    currentBoss = {
        name: base.name,
        emoji: base.emoji,
        hp: bossHp,
        maxHp: bossHp,
        atk: bossAtk,
        def: bossDef
    };
    player.battleAtkBonus = 0;
    player.battleDefBonus = 0;
    bossStunned = false;
    defending = false;

    document.getElementById('boss-name-display').textContent = currentBoss.name;
    document.getElementById('boss-sprite').innerHTML = `<div style="font-size:3.5rem">${currentBoss.emoji}</div>`;
    document.getElementById('player-battle-sprite').innerHTML = buildCharHTML(SKINS[player.skinIndex].id, player.levels);
    document.getElementById('item-quick').classList.add('hidden');
    updateBattleBars();
    document.getElementById('battle-modal').classList.remove('hidden');
}

function updateBattleBars() {
    const pp = Math.max(0, (player.hp / player.maxHp) * 100);
    const bp = Math.max(0, (currentBoss.hp / currentBoss.maxHp) * 100);
    document.getElementById('player-hp-bar').style.width = pp + '%';
    document.getElementById('boss-hp-bar').style.width = bp + '%';
    document.getElementById('player-hp-text').textContent = `${Math.max(0, Math.floor(player.hp))}/${player.maxHp}`;
    document.getElementById('boss-hp-text').textContent = `${Math.max(0, Math.floor(currentBoss.hp))}/${currentBoss.maxHp}`;
}

function showDamageFloat(text, isHeal = false) {
    const el = document.getElementById('damage-float');
    el.textContent = text;
    el.className = 'damage-float' + (isHeal ? ' heal' : '');
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 800);
}

function doPlayerAction(isDefend) {
    if (!currentBoss || currentBoss.hp <= 0) return;
    defending = isDefend;

    if (!isDefend) {
        let dmg = Math.max(1, getAtk() - currentBoss.def + Math.floor(Math.random() * 8) - 3);
        currentBoss.hp -= dmg;
        showDamageFloat('-' + dmg);
        document.getElementById('boss-sprite').classList.add('hit');
        setTimeout(() => document.getElementById('boss-sprite').classList.remove('hit'), 300);
    } else {
        showDamageFloat('DEF', true);
    }
    updateBattleBars();

    if (currentBoss.hp <= 0) {
        setTimeout(() => {
            document.getElementById('battle-modal').classList.add('hidden');
            player.hp = Math.min(player.maxHp, player.hp + 20);
            updateHUD();
            setMessage(`Vitória contra ${currentBoss.name}! +20 HP`);
            // se todas abertas, próxima sala
            if (doors.every(d => d.opened)) setTimeout(nextRoom, 600);
        }, 700);
        return;
    }

    // turno do boss
    setTimeout(() => {
        if (bossStunned) {
            bossStunned = false;
            showDamageFloat('STUN!', true);
            return;
        }
        let bossDmg = Math.max(1, currentBoss.atk - getDef() + Math.floor(Math.random() * 6) - 2);
        if (defending) bossDmg = Math.floor(bossDmg * 0.35);
        player.hp -= bossDmg;
        showDamageFloat('-' + bossDmg);
        document.getElementById('player-battle-sprite').classList.add('hit');
        setTimeout(() => document.getElementById('player-battle-sprite').classList.remove('hit'), 300);
        updateBattleBars();
        updateHUD();

        if (player.hp <= 0) {
            player.hp = 0;
            updateHUD();
            setTimeout(gameOver, 900);
        }
    }, 550);
}

function toggleItemQuick() {
    const q = document.getElementById('item-quick');
    if (!q.classList.contains('hidden')) {
        q.classList.add('hidden');
        return;
    }
    q.innerHTML = '';
    const usable = ITEMS.filter(it => player.items[it.id] > 0);
    if (usable.length === 0) {
        setMessage('Você não tem itens!');
        return;
    }
    usable.forEach(item => {
        const btn = document.createElement('button');
        btn.innerHTML = `${item.emoji} ${item.name} (${player.items[item.id]})`;
        btn.addEventListener('click', () => useItemInBattle(item));
        q.appendChild(btn);
    });
    q.classList.remove('hidden');
}

function useItemInBattle(item) {
    if (!player.items[item.id] || player.items[item.id] <= 0) return;
    player.items[item.id]--;
    if (player.items[item.id] <= 0) delete player.items[item.id];
    document.getElementById('item-quick').classList.add('hidden');
    updateHUD();

    switch (item.type) {
        case 'heal':
            player.hp = Math.min(player.maxHp, player.hp + item.value);
            showDamageFloat('+' + item.value, true);
            break;
        case 'damage':
            currentBoss.hp -= item.value;
            showDamageFloat('-' + item.value);
            document.getElementById('boss-sprite').classList.add('hit');
            setTimeout(() => document.getElementById('boss-sprite').classList.remove('hit'), 300);
            break;
        case 'stun':
            bossStunned = true;
            showDamageFloat('STUN!', true);
            break;
        case 'buff_atk':
            player.battleAtkBonus += item.value;
            showDamageFloat('ATK+', true);
            break;
        case 'buff_def':
            player.battleDefBonus += item.value;
            showDamageFloat('DEF+', true);
            break;
        case 'escape':
            player.hp = Math.min(player.maxHp, player.hp + item.value);
            document.getElementById('battle-modal').classList.add('hidden');
            setMessage('Você fugiu da batalha!');
            updateHUD();
            if (doors.every(d => d.opened)) setTimeout(nextRoom, 600);
            return;
    }
    updateBattleBars();
    if (currentBoss.hp <= 0) {
        setTimeout(() => {
            document.getElementById('battle-modal').classList.add('hidden');
            player.hp = Math.min(player.maxHp, player.hp + 20);
            updateHUD();
            setMessage(`Vitória!`);
            if (doors.every(d => d.opened)) setTimeout(nextRoom, 600);
        }, 600);
        return;
    }
    // boss ainda ataca depois de item (exceto stun já tratado)
    setTimeout(() => {
        if (bossStunned) { bossStunned = false; showDamageFloat('STUN!', true); return; }
        let bossDmg = Math.max(1, currentBoss.atk - getDef() + Math.floor(Math.random() * 5) - 2);
        player.hp -= bossDmg;
        showDamageFloat('-' + bossDmg);
        updateBattleBars();
        updateHUD();
        if (player.hp <= 0) { player.hp = 0; setTimeout(gameOver, 800); }
    }, 500);
}

// ===================== PRÓXIMA SALA =====================
function nextRoom() {
    if (player.regen > 0) player.hp = Math.min(player.maxHp, player.hp + player.regen);
    if (player.bleed > 0) {
        player.hp = Math.max(1, player.hp - 5);
        player.bleed--;
    }
    player.room++;
    updateHUD();
    if (player.room > MAX_ROOMS) {
        victory();
        return;
    }
    generateRoom();
}

async function gameOver() {
    document.getElementById('battle-modal').classList.add('hidden');
    document.getElementById('end-title').textContent = '💀 GAME OVER';
    document.getElementById('end-message').textContent = `${player.name}, você chegou até a sala ${player.room}.`;
    document.getElementById('end-rank-info').textContent = 'Salvando no ranking global...';
    document.getElementById('end-modal').classList.remove('hidden');
    await addToRanking(player.name, player.room - 1, SKINS[player.skinIndex].id);
    document.getElementById('end-rank-info').textContent = firebaseReady
        ? 'Resultado salvo no ranking global!'
        : 'Resultado salvo localmente (configure o Firebase para ranking global).';
}
async function victory() {
    document.getElementById('end-title').textContent = '🏆 VITÓRIA LENDÁRIA!';
    document.getElementById('end-message').textContent = `${player.name}, você sobreviveu às ${MAX_ROOMS} salas!`;
    document.getElementById('end-rank-info').textContent = 'Salvando no ranking global...';
    document.getElementById('end-modal').classList.remove('hidden');
    await addToRanking(player.name, MAX_ROOMS, SKINS[player.skinIndex].id);
    document.getElementById('end-rank-info').textContent = firebaseReady
        ? 'Você é uma lenda! Resultado no ranking global.'
        : 'Resultado salvo localmente (configure o Firebase para ranking global).';
}

function equipIconHTML(type, level) {
    if (type === 'sword') return `<div class="icon-sword ${swordClass(level)}" style="background:inherit"></div>`;
    if (type === 'shield') return `<div class="icon-shield ${shieldClass(level)}"></div>`;
    if (type === 'helmet') return `<div class="icon-helmet ${matClass(level)}"></div>`;
    if (type === 'chest') return `<div class="icon-chest ${matClass(level)}"></div>`;
    if (type === 'pants') return `<div class="icon-pants ${matClass(level)}"></div>`;
    if (type === 'boots') return `<div class="icon-boots ${matClass(level)}"></div>`;
    return '';
}
function potionIconHTML(itemId) {
    const map = {
        potion_heal: 'potion-red', potion_heal_big: 'potion-pink', potion_dmg: 'potion-orange',
        potion_stun: 'potion-purple', potion_str: 'potion-yellow', potion_def: 'potion-blue',
        bomb: 'potion-dark', smoke: 'potion-gray'
    };
    return `<div class="icon-potion ${map[itemId] || 'potion-red'}"></div>`;
}

// ===================== INVENTÁRIO =====================
function openInventory() {
    const eq = document.getElementById('equip-grid');
    eq.innerHTML = '';
    const slots = [
        { id: 'helmet', label: 'Capacete', names: ARMOR_NAMES.helmet },
        { id: 'chest', label: 'Peitoral', names: ARMOR_NAMES.chest },
        { id: 'pants', label: 'Calça', names: ARMOR_NAMES.pants },
        { id: 'boots', label: 'Botas', names: ARMOR_NAMES.boots },
        { id: 'sword', label: 'Espada', names: SWORD_NAMES },
        { id: 'shield', label: 'Escudo', names: SHIELD_NAMES }
    ];
    slots.forEach(s => {
        const lv = player.levels[s.id];
        const name = Array.isArray(s.names) ? s.names[lv - 1] : s.names[lv - 1];
        const div = document.createElement('div');
        div.className = 'equip-slot';
        div.innerHTML = `${equipIconHTML(s.id, lv)}<div class="name">${s.label}<br>${name}</div><div class="lvl">Nv. ${lv}/15</div>`;
        eq.appendChild(div);
    });

    const ig = document.getElementById('items-grid');
    ig.innerHTML = '';
    const hasItems = Object.keys(player.items).length > 0;
    if (!hasItems) {
        ig.innerHTML = '<p style="grid-column:1/-1;color:#888">Nenhum item ainda. Abra baús!</p>';
    } else {
        ITEMS.forEach(item => {
            const qty = player.items[item.id] || 0;
            if (qty <= 0) return;
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.innerHTML = `${potionIconHTML(item.id)}<div class="name">${item.name}</div><div class="qty">x${qty}</div>`;
            ig.appendChild(div);
        });
    }
    document.getElementById('inventory-panel').classList.remove('hidden');
}

// ===================== CÓDEX =====================
function openCodex() {
    const gearEl = document.getElementById('codex-gear');
    gearEl.innerHTML = '';
    const allSlots = [
        { key: 'helmet', label: 'Capacete', names: ARMOR_NAMES.helmet },
        { key: 'chest', label: 'Peitoral', names: ARMOR_NAMES.chest },
        { key: 'pants', label: 'Calça', names: ARMOR_NAMES.pants },
        { key: 'boots', label: 'Botas', names: ARMOR_NAMES.boots },
        { key: 'sword', label: 'Espada', names: SWORD_NAMES },
        { key: 'shield', label: 'Escudo', names: SHIELD_NAMES }
    ];
    allSlots.forEach(slot => {
        for (let lv = 1; lv <= 15; lv++) {
            const unlocked = player.unlockedGear[slot.key].includes(lv);
            const card = document.createElement('div');
            card.className = 'codex-card' + (unlocked ? '' : ' locked');
            card.innerHTML = `
                <div class="icon">${equipIconHTML(slot.key, lv)}</div>
                <div class="name">${slot.label} Nv.${lv}<br>${unlocked ? slot.names[lv - 1] : '???'}</div>
                <div class="status ${unlocked ? 'unlocked' : 'locked-txt'}">${unlocked ? '✓ Desbloqueado' : '🔒 Bloqueado'}</div>
            `;
            gearEl.appendChild(card);
        }
    });

    const itemsEl = document.getElementById('codex-items');
    itemsEl.innerHTML = '';
    ITEMS.forEach(item => {
        const unlocked = !!player.discoveredItems[item.id];
        const card = document.createElement('div');
        card.className = 'codex-card' + (unlocked ? '' : ' locked');
        card.innerHTML = `
            <div class="icon">${potionIconHTML(item.id)}</div>
            <div class="name">${item.name}<br>${unlocked ? item.desc : '???'}</div>
            <div class="status ${unlocked ? 'unlocked' : 'locked-txt'}">${unlocked ? '✓ Descoberto' : '🔒 Bloqueado'}</div>
        `;
        itemsEl.appendChild(card);
    });

    document.getElementById('codex-panel').classList.remove('hidden');
}

// ===================== RANKING =====================
async function openRanking() {
    const list = document.getElementById('ranking-list');
    list.innerHTML = '<p style="color:#aaa;text-align:center">Carregando ranking...</p>';
    document.getElementById('ranking-panel').classList.remove('hidden');

    const rank = await getRanking();
    if (!rank || rank.length === 0) {
        list.innerHTML = '<p style="color:#888;text-align:center">Ninguém no ranking ainda. Seja o primeiro!</p>';
        return;
    }
    list.innerHTML = '';
    rank.forEach((r, i) => {
        const skin = SKINS.find(s => s.id === r.skin) || SKINS[0];
        const row = document.createElement('div');
        row.className = 'rank-row' + (i === 0 ? ' top1' : i === 1 ? ' top2' : i === 2 ? ' top3' : '');
        row.innerHTML = `
            <div class="rank-pos">#${i + 1}</div>
            <div class="rank-skin" style="transform:scale(0.55);width:40px;height:50px;overflow:hidden">${buildCharHTML(skin.id, {helmet:1,chest:1,pants:1,boots:1,sword:1,shield:1})}</div>
            <div class="rank-info">
                <div class="rank-name">${r.name}</div>
                <div class="rank-rooms">${r.rooms} salas</div>
            </div>
        `;
        list.appendChild(row);
    });
}

// highlight contínuo
setInterval(highlightNearestDoor, 180);

// ===================================================================
// MELHORIAS: cole este bloco no FINAL do seu script.js (depois da última linha)
// ===================================================================
// Tempo de recarga entre ações (ms). Ajuste aqui, entre 3000 e 5000.
const COOLDOWN = { attack: 3000, defend: 3000, item: 3000, door: 3000 };
let actionLocked = false, doorLocked = false, gameEnded = false;
let cdTimer, doorTimer, floatTimer, walkTimer;

// ---------- elementos extras (criados aqui, sem mexer no HTML) ----------
document.getElementById('message').insertAdjacentHTML('afterend', '<div class="cd-track"><div id="hud-cd" class="cd-fill"></div></div>');
document.querySelector('.battle-actions').insertAdjacentHTML('afterend', '<div class="cd-track battle-cd"><div id="cooldown-fill" class="cd-fill"></div></div>');
document.querySelector('.boss-box').insertAdjacentHTML('afterbegin', '<div id="boss-status" class="boss-status"></div>');

// ---------- utilitários ----------
function runBar(id, ms) {
    const f = document.getElementById(id);
    f.style.animation = 'none'; void f.offsetWidth;
    f.style.animation = `cooldownFill ${ms}ms linear forwards`;
}
function anim(target, cls, ms = 450) {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), ms);
}
function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
showDamageFloat = function (text, good = false) {
    const el = document.getElementById('damage-float');
    el.textContent = text;
    el.className = 'damage-float' + (good ? ' heal' : '');
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    clearTimeout(floatTimer);
    floatTimer = setTimeout(() => el.classList.add('hidden'), 1100);
};

// ---------- cooldown da batalha ----------
const BATTLE_BTNS = ['btn-attack', 'btn-defend', 'btn-use-item'];
function setBattleButtons(disabled) { BATTLE_BTNS.forEach(id => document.getElementById(id).disabled = disabled); }
function lockBattle(ms) {
    actionLocked = true;
    setBattleButtons(true);
    document.getElementById('item-quick').classList.add('hidden');
    runBar('cooldown-fill', ms);
    clearTimeout(cdTimer);
    cdTimer = setTimeout(unlockBattle, ms);
}
function unlockBattle() { actionLocked = false; setBattleButtons(false); }

// ---------- defesa perfeita e atordoamento ----------
// Chance de bloquear 100% do ataque: depende da sua DEF contra o ATK do boss (15% a 75%).
function perfectChance() {
    return Math.min(0.75, Math.max(0.15, 0.25 + (getDef() - currentBoss.atk) * 0.02));
}
function refreshBattleUI() {
    document.getElementById('btn-defend').textContent = `🛡️ Defender (${Math.round(perfectChance() * 100)}% perfeita)`;
    document.getElementById('boss-sprite').classList.toggle('stunned', bossStunned > 0);
    document.getElementById('boss-status').textContent =
        bossStunned > 0 ? `💫 Atordoado: ${bossStunned} ${bossStunned > 1 ? 'rodadas' : 'rodada'}` : '';
    document.getElementById('player-hp-bar').classList.toggle('low', player.hp / player.maxHp < 0.3);
}

function bossTurn(isDefending) {
    setTimeout(() => {
        if (!currentBoss || currentBoss.hp <= 0 || document.getElementById('battle-modal').classList.contains('hidden')) return;
        if (bossStunned > 0) {
            bossStunned--;
            showDamageFloat('ATORDOADO!', true);
            refreshBattleUI();
            return;
        }
        let dmg = Math.max(1, currentBoss.atk - getDef() + Math.floor(Math.random() * 6) - 2);
        if (isDefending) {
            const reduced = Math.floor(dmg * 0.35);
            if (reduced === 0 || Math.random() < perfectChance()) {
                bossStunned = 2; // boss fica 2 rodadas sem atacar
                showDamageFloat('BLOQUEIO PERFEITO!', true);
                anim('player-battle-sprite', 'guard', 900);
                refreshBattleUI();
                return;
            }
            dmg = reduced;
        }
        player.hp -= dmg;
        showDamageFloat('-' + dmg);
        anim('boss-sprite', 'lunge-boss', 500);
        anim('player-battle-sprite', 'hit', 400);
        anim(document.querySelector('.battle-visual'), 'shake', 400);
        updateBattleBars(); updateHUD(); refreshBattleUI();
        if (player.hp <= 0) { player.hp = 0; updateHUD(); setTimeout(gameOver, 900); }
    }, 1000);
}

function winBattle() {
    anim('boss-sprite', 'dead', 900);
    document.getElementById('boss-sprite').classList.add('dead');
    setTimeout(() => {
        document.getElementById('battle-modal').classList.add('hidden');
        player.hp = Math.min(player.maxHp, player.hp + 20);
        updateHUD();
        setMessage(`Vitória contra ${currentBoss.name}! +20 HP`);
        if (doors.every(d => d.opened)) setTimeout(nextRoom, 600);
    }, 1000);
}

doPlayerAction = function (isDefend) {
    if (!currentBoss || currentBoss.hp <= 0 || actionLocked) return;
    lockBattle(isDefend ? COOLDOWN.defend : COOLDOWN.attack);
    defending = isDefend;
    if (isDefend) {
        showDamageFloat('🛡️', true);
        anim('player-battle-sprite', 'guard', 900);
    } else {
        const dmg = Math.max(1, getAtk() - currentBoss.def + Math.floor(Math.random() * 8) - 3);
        currentBoss.hp -= dmg;
        showDamageFloat('-' + dmg);
        anim('player-battle-sprite', 'lunge', 500);
        anim('boss-sprite', 'hit', 300);
    }
    updateBattleBars(); refreshBattleUI();
    if (currentBoss.hp <= 0) return winBattle();
    bossTurn(isDefend);
};

useItemInBattle = function (item) {
    if (actionLocked || !player.items[item.id]) return;
    player.items[item.id]--;
    if (player.items[item.id] <= 0) delete player.items[item.id];
    updateHUD();
    if (item.type === 'escape') {
        player.hp = Math.min(player.maxHp, player.hp + item.value);
        document.getElementById('battle-modal').classList.add('hidden');
        setMessage('Você fugiu da batalha!'); updateHUD();
        if (doors.every(d => d.opened)) setTimeout(nextRoom, 600);
        return;
    }
    lockBattle(COOLDOWN.item);
    switch (item.type) {
        case 'heal': player.hp = Math.min(player.maxHp, player.hp + item.value); showDamageFloat('+' + item.value, true); break;
        case 'damage': currentBoss.hp -= item.value; showDamageFloat('-' + item.value); anim('boss-sprite', 'hit', 300); break;
        case 'stun': bossStunned = Math.max(Number(bossStunned) || 0, 1); showDamageFloat('STUN!', true); break;
        case 'buff_atk': player.battleAtkBonus += item.value; showDamageFloat('ATK+', true); break;
        case 'buff_def': player.battleDefBonus += item.value; showDamageFloat('DEF+', true); break;
    }
    updateBattleBars(); refreshBattleUI();
    if (currentBoss.hp <= 0) return winBattle();
    bossTurn(false);
};

// início de cada batalha
const _openBoss = openBossDoor;
openBossDoor = function () {
    _openBoss();
    clearTimeout(cdTimer); unlockBattle();
    document.getElementById('cooldown-fill').style.animation = 'none';
    document.getElementById('boss-sprite').classList.remove('dead', 'hit', 'stunned');
    bossStunned = 0;
    refreshBattleUI();
};

// ---------- cooldown das portas + porta alcançada ----------
const _tryOpen = tryOpenDoor;
tryOpenDoor = function (i) {
    if (!doors[i] || doors[i].opened) return;
    if (doorLocked) { setMessage('⏳ Recarregando... espere a barra encher'); return; }
    _tryOpen(i);
    if (doors[i].opened) {
        player.lastDoor = i + 1;
        doorLocked = true;
        runBar('hud-cd', COOLDOWN.door);
        clearTimeout(doorTimer);
        doorTimer = setTimeout(() => doorLocked = false, COOLDOWN.door);
    }
};
const _gen = generateRoom;
generateRoom = function () { _gen(); player.lastDoor = 0; };
const _next = nextRoom;
nextRoom = function () { _next(); anim('room-info', 'pop', 600); anim('room', 'enter', 700); };

// animação de caminhada
const _pos = updatePlayerPosition;
updatePlayerPosition = function () {
    _pos();
    const s = document.getElementById('player-sprite');
    s.classList.add('walking');
    clearTimeout(walkTimer);
    walkTimer = setTimeout(() => s.classList.remove('walking'), 220);
};

// ---------- ranking com sala + porta ----------
function sortRanking(list) {
    const room = r => r.room || (r.rooms || 0) + 1;
    return [...list].sort((a, b) => room(b) - room(a) || (b.door || 0) - (a.door || 0) || (a.date || 0) - (b.date || 0));
}

addToRanking = async function (name, rooms, skinId) {
    if (rankingSaveLock) return;
    rankingSaveLock = true;
    const won = rooms >= MAX_ROOMS;
    const entry = {
        name: name.trim(), nameLower: name.toLowerCase().trim(), rooms,
        room: won ? MAX_ROOMS : player.room,
        door: won ? 5 : (player.lastDoor || 0),
        skin: skinId, date: Date.now()
    };
    if (firebaseReady && db) {
        try {
            const ref = db.collection('ranking').doc(entry.nameLower.replace(/[\/.#$\[\]]/g, '_'));
            if (!(await ref.get()).exists) await ref.set(entry);
            return;
        } catch (e) { console.error('Erro ao salvar ranking global:', e); rankingSaveLock = false; }
    }
    const rank = getLocalRanking();
    if (!rank.some(r => r.name.toLowerCase() === entry.nameLower)) {
        rank.push(entry);
        saveLocalRanking(sortRanking(rank).slice(0, 50));
    }
};

openRanking = async function () {
    const list = document.getElementById('ranking-list');
    list.innerHTML = '<p class="rank-empty">Carregando ranking...</p>';
    document.getElementById('ranking-panel').classList.remove('hidden');
    const rank = sortRanking((await getRanking()) || []);
    if (!rank.length) { list.innerHTML = '<p class="rank-empty">Ninguém no ranking ainda. Seja o primeiro!</p>'; return; }
    list.innerHTML = '';
    rank.forEach((r, i) => {
        const skin = SKINS.find(s => s.id === r.skin) || SKINS[0];
        const room = r.room || (r.rooms || 0) + 1, door = r.door || 0;
        const dots = [1, 2, 3, 4, 5].map(n =>
            `<span class="mini-door${n <= door ? ' reached' : ''}${n === door ? ' here' : ''}">${n}</span>`).join('');
        const row = document.createElement('div');
        row.className = 'rank-row' + (i < 3 ? ' top' + (i + 1) : '');
        row.style.animationDelay = Math.min(i, 10) * 60 + 'ms';
        row.innerHTML = `
            <div class="rank-pos">#${i + 1}</div>
            <div class="rank-skin" style="transform:scale(0.55);width:40px;height:50px;overflow:hidden">${buildCharHTML(skin.id, { helmet: 1, chest: 1, pants: 1, boots: 1, sword: 1, shield: 1 })}</div>
            <div class="rank-info">
                <div class="rank-name">${esc(r.name)}</div>
                <div class="rank-rooms">Sala ${room}, ${door ? 'porta ' + door : 'porta não registrada'}</div>
                <div class="mini-doors">${dots}</div>
            </div>`;
        list.appendChild(row);
    });
};

// ---------- correção: "Ver ranking" esconde a tela de fim de jogo ----------
const _go = gameOver, _win = victory;
gameOver = function () { gameEnded = true; return _go(); };
victory = function () { gameEnded = true; return _win(); };

function reopenEnd() { if (gameEnded) document.getElementById('end-modal').classList.remove('hidden'); }
function rebind(id, fn) {
    const old = document.getElementById(id), fresh = old.cloneNode(true);
    old.replaceWith(fresh);
    fresh.addEventListener('click', fn);
}
rebind('btn-ranking-landing', openRanking);
rebind('btn-ranking-game', openRanking);
rebind('btn-view-ranking-end', () => { document.getElementById('end-modal').classList.add('hidden'); openRanking(); });
rebind('btn-close-ranking', () => { document.getElementById('ranking-panel').classList.add('hidden'); reopenEnd(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') reopenEnd(); });
console.log('melhorias ativas ✔');

window.limparRanking = async function () {
    localStorage.removeItem('portas_ranking');
    if (firebaseReady && db) {
        const snap = await db.collection('ranking').get();
        await Promise.all(snap.docs.map(d => d.ref.delete()));
    }
    console.log('Ranking limpo!');
};
