// --- DADOS DO PERFIL ---
const profile = {
    name: "Wendell Soares",
    tagline: "Cybersecurity Student | Infraestrutura & Redes",
    username: "@WENDELLS04"
};

const links = [
    { title: "Instagram", url: "https://instagram.com/wendells04", icon: "instagram", key: "instagram" },
    { title: "Currículo VITAE", url: "https://drive.google.com/file/d/1xekSi3TsU8cMHBkqMcNkEbIIoWZUv0lX/view?usp=sharing", icon: "file-text", key: "cv" },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/wendell-soares/", icon: "linkedin", key: "linkedin" },
    { title: "GitHub Repos", url: "https://github.com/W3ndell-S04", icon: "github", key: "github" }
];

// --- ESTADO GLOBAL ---
let isPanic = false;
let matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
let commandHistory = [];
let historyIndex = -1;

// --- FUNÇÕES DE INTERFACE ---

function renderLinks() {
    const container = document.getElementById('links-container');
    if (!container) return;
    
    container.innerHTML = "";
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
        linkElement.className = "group relative block w-full no-underline";
        
        linkElement.innerHTML = `
            <div class="absolute inset-0 bg-[#00FF41]/10 tech-cut opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"></div>
            <div class="flex items-center justify-between p-4 bg-[#1a2421]/60 border border-white/5 group-hover:border-[#00FF41]/40 tech-cut transition-all duration-300 backdrop-blur-sm">
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center rounded-lg bg-[#00FF41]/10 text-[#00FF41] shrink-0 size-12 border border-[#00FF41]/20 group-hover:scale-110 group-hover:bg-[#00FF41]/20 transition-all duration-300">
                        <i data-lucide="${link.icon}" class="size-6"></i>
                    </div>
                    <span class="text-white text-lg font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                        ${link.title}
                    </span>
                </div>
                <div class="text-[#00FF41]/40 group-hover:text-[#00FF41] transition-colors duration-300">
                    <i data-lucide="chevron-right" class="size-5"></i>
                </div>
            </div>
        `;
        container.appendChild(linkElement);
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function typeWriterLoop(elementId, text, speed = 100, pause = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let isDeleting = false;
    let charIndex = 0;
    element.classList.add('typing-cursor');

    function type() {
        const currentText = text;
        if (isDeleting) {
            element.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? speed / 2 : speed;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = pause;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

// --- LOGS INICIAIS (WATCHDOG) ---
async function bootLogs() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const logs = [
        { text: "[OK] Kernel Valhalla_v4 loaded.", color: "text-[#00FF41]" },
        { text: "[OK] Firewall Rules Applied.", color: "text-[#00FF41]" },
        { text: "[WARNING] 3 Failed login attempts from 192.168.1.104...", color: "text-yellow-500" },
        { text: "[INFO] Intrusion Detection System: ACTIVE", color: "text-blue-400" },
        { text: "[SYSTEM] Welcome back, Admin.", color: "text-[#00FF41]" },
        { text: "----------------------------------------", color: "opacity-30" }
    ];

    output.innerHTML = ""; // Limpa o "Welcome" padrão

    for (const log of logs) {
        const p = document.createElement('p');
        p.className = `${log.color} font-mono text-[10px] mb-1`;
        p.innerText = log.text;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
        await new Promise(r => setTimeout(r, 400));
    }
}

// --- SISTEMA TERMINAL ---

function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const destinations = {};
    links.forEach(l => destinations[l.key] = l.url);

    const commands = {
        help: "Comandos: ls, open [alvo], nmap, fetch, submit [flag], secret, whoami, status, panic, clear",
        ls: "Diretório: [instagram, linkedin, github, cv]",
        whoami: "Wendell Soares. Cybersecurity & Infra. (Dica: Há segredos para quem tem acesso ROOT...)",
        status: () => `Host: ${window.location.hostname} | OS: Valhalla v4.0.2 | Security: ${isPanic ? 'BREACHED' : 'STABLE'}`,
        panic: () => { togglePanicMode(); return "Executando protocolo de emergência..."; },
        clear: () => { output.innerHTML = ""; return ""; },
        
        open: (target) => {
            if (!target) return "Uso: open [nome]. Ex: open github";
            const url = destinations[target];
            if (url) {
                window.open(url, '_blank');
                return `Acesso concedido. Abrindo ${target}...`;
            }
            return `Erro: Destino '${target}' não reconhecido.`;
        },

        // --- COMANDO FETCH ---
        fetch: () => {
            const fetchArt = `
<div class="flex gap-4">
<span class="text-[#00FF41] font-mono leading-tight">
  /\\
 /  \\
/____\\
|    |
|____|</span>
<span class="text-white font-mono text-[11px]">
<b class="text-[#00FF41]">USER:</b> ${profile.username}
<b class="text-[#00FF41]">OS:</b> Valhalla Linux v4.0.2
<b class="text-[#00FF41]">HOST:</b> CyberViking_Station
<b class="text-[#00FF41]">SHELL:</b> Bash / V-Shell
<b class="text-[#00FF41]">SKILLS:</b> PenTesting, Network, Infra
<b class="text-[#00FF41]">STATUS:</b> ${isPanic ? 'Panic Mode' : 'Stable'}
</span>
</div>`;
            const div = document.createElement('div');
            div.className = "mb-4";
            div.innerHTML = fetchArt;
            output.appendChild(div);
            return "";
        },

        nmap: async () => {
            const lines = [
                "Starting Nmap 7.92 at 2026-02-10 14:30",
                "Nmap scan report for valhalla.sys (127.0.0.1)",
                "PORT     STATE SERVICE",
                "80/tcp   open  http (Instagram)",
                "443/tcp  open  https (LinkedIn)",
                "22/tcp   open  ssh (GitHub)",
                "110/tcp  open  pop3 (Currículo_Vitae)",
                "Nmap done: 1 IP address scanned."
            ];

            for (const line of lines) {
                const p = document.createElement('p');
                p.className = "mb-1 opacity-80 font-mono text-[11px]";
                p.innerText = line;
                output.appendChild(p);
                output.scrollTop = output.scrollHeight;
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return "";
        },

        submit: (flag) => {
            const secretFlag = "VALHALLA{R00T_4CC3SS}";
            if (!flag) return "Uso: submit [VALHALLA{SUA_FLAG}]";
            
            if (flag === secretFlag) {
                document.body.classList.add('gold-mode');
                const userDisplay = document.getElementById('username-display');
                if(userDisplay) {
                    userDisplay.innerText = "👑 SYSTEM ADMINISTRATOR 👑";
                    userDisplay.classList.add('gold-text');
                }
                return "SUCESSO! Privilégios elevados. Tente o comando 'secret'.";
            }
            return "ERRO: Flag inválida. Tentativa de intrusão detectada.";
        },

        secret: () => {
            if (!document.body.classList.contains('gold-mode')) {
                return "ACESSO NEGADO: Este comando requer privilégios de ROOT.";
            }

            const vikingArt = `
<span class="text-yellow-500">          .---.
         /     \\
        | (O) (O) |
         \\  ---  /
          |     |
         /       \\
        /  \\ /  \\ \\
       /            \\
      /              \\
     |   V A L H A L L A   |
      \\              /
       \\            /</span>
<span class="text-white">     [ CYBER VIKING ]</span>`;

            const p = document.createElement('pre');
            p.className = "text-[10px] leading-tight mb-4 font-mono text-yellow-500/90";
            p.innerHTML = vikingArt;
            output.appendChild(p);
            return "SKÅL! O trono do Valhalla é seu.";
        }
    };

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[commandHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else {
                historyIndex = -1;
                input.value = "";
            }
        }

        if (e.key === 'Enter') {
            const rawValue = input.value.trim();
            if (rawValue === "") return;

            commandHistory.push(rawValue);
            historyIndex = -1;

            const parts = rawValue.split(" ");
            const cmd = parts[0].toLowerCase();
            const arg = parts[1];

            if (cmd !== 'clear') {
                output.innerHTML += `<div><span class="text-[#00FF41]">#</span> ${rawValue}</div>`;
            }

            let response;
            if (commands[cmd]) {
                response = typeof commands[cmd] === 'function' ? await commands[cmd](arg) : commands[cmd];
            } else if (cmd === 'cd' || cmd === 'dir') {
                response = commands.open(arg); 
            } else {
                response = `Comando inválido: ${cmd}. Tente 'help'.`;
            }
            
            if (cmd !== 'clear' && response) {
                output.innerHTML += `<div class="mb-2 opacity-70">> ${response}</div>`;
            }
            
            input.value = "";
            output.scrollTop = output.scrollHeight;
        }
    });

    document.addEventListener('click', () => input.focus());
}

// --- MODO PÂNICO ---

function togglePanicMode() {
    isPanic = !isPanic;
    document.body.classList.toggle('panic-mode');
    const userDisplay = document.getElementById('username-display');
    
    if (isPanic) {
        userDisplay.innerText = "!!! SECURITY BREACH !!!";
        userDisplay.classList.add('breach-text');
        matrixChars = '01'; 
    } else {
        userDisplay.innerText = profile.username;
        userDisplay.classList.remove('breach-text');
        matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
    }
}

// --- MATRIX RAIN ---

function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let cw, ch, columns, drops;
    const fontSize = 16;

    function resize() {
        cw = canvas.width = window.innerWidth;
        ch = canvas.height = window.innerHeight;
        columns = Math.floor(cw / fontSize);
        drops = Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = 'rgba(5, 8, 6, 0.15)';
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = isPanic ? '#ff0000' : '#00FF41';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > ch && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    window.addEventListener('resize', resize);
    resize();

    function animate() {
        draw();
        setTimeout(() => requestAnimationFrame(animate), 50);
    }
    animate();
}

// --- BOOT UP ---

window.addEventListener('load', () => {
    initMatrix();
    renderLinks();
    initTerminal();
    bootLogs(); // Chama os logs do Watchdog

    setTimeout(() => {
        typeWriterLoop('typewriter-name', profile.name, 120, 4000);
        setTimeout(() => {
            typeWriterLoop('typewriter-tagline', profile.tagline, 60, 5000);
        }, 1000);
    }, 500);

    document.getElementById('panic-btn')?.addEventListener('click', togglePanicMode);
    
    document.getElementById('share-btn')?.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({ title: profile.name, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copiado para o clipboard.");
        }
    });

    const img = document.getElementById('profile-img');
    if (img) img.onerror = () => img.src = `https://ui-avatars.com/api/?name=Wendell+Soares&background=0d1112&color=00FF41`;
});