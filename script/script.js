let participantes = [];

function adicionarNome() {
    const input = document.getElementById('nomeInput');
    const aviso = document.getElementById('aviso');
    const nome = input.value.trim();

// Validações
    if (!nome) {
        aviso.textContent = "Digite um nome válido!";
        aviso.style.color = "#ff4444";
        return;
    }
    
    if (participantes.includes(nome)) {
        aviso.textContent = "Nome já está na lista!";
        aviso.style.color = "#ff4444";
        return;
    }

// Adicionar à lista
    participantes.push(nome);
    input.value = '';
    aviso.textContent = '';
    atualizarListaNomes();
}

function atualizarListaNomes() {
    const lista = document.getElementById('lista-nomes');
    lista.innerHTML = participantes
        .map(nome => `
            <li>
                <span>${nome}</span>
                <button onclick="removerNome('${nome}')" class="btn-remover">X</button>
            </li>
        `)
        .join('');
}

function removerNome(nome) {
    participantes = participantes.filter(p => p !== nome);
    atualizarListaNomes();
}

function animarSorteio() {
    const btn = document.getElementById('sortearBtn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 100);
}

function sortear() {
    const aviso = document.getElementById('aviso');
    
// Validação básica
    if (participantes.length < 2) {
        aviso.textContent = "Adicione pelo menos 2 participantes!";
        aviso.style.color = "#ff4444";
        animarSorteio();
        return;
    }

// Algoritmo de sorteio
    const shuffled = [...participantes].sort(() => Math.random() - 0.5);
    const pares = new Map();

// Criar pares evitando auto-sorteio
    shuffled.forEach((nome, index) => {
        const nextIndex = (index + 1) % shuffled.length;
        pares.set(nome, shuffled[nextIndex]);
    });

// Exibir resultado
    aviso.innerHTML = `
        <div style="color: #00ff99; margin: 20px 0;">
            Sorteio realizado! 🎉<br>
            <button onclick="exibirPares()" style="margin-top: 15px;">
                Revelar Pares
            </button>
        </div>
    `;

// Salvar pares no localStorage
    localStorage.setItem('paresSecretos', JSON.stringify([...pares]));
    animarSorteio();
}

function exibirPares() {
    const pares = new Map(JSON.parse(localStorage.getItem('paresSecretos')));
    let resultado = '🎁 Pares do Amigo Secreto:\n\n';
    
    pares.forEach((valor, chave) => {
        resultado += `${chave} ➔ ${valor}\n`;
    });

    alert(resultado);
}