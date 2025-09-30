// Controle de telas
function mostrarTela(id){
    const divs = document.querySelectorAll('.main-content > div');
    divs.forEach(d => d.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Criar empresa
function criarEmpresa() {
    const nome = document.getElementById('empresaNome').value;
    const email = document.getElementById('empresaEmail').value;
    const senha = document.getElementById('empresaSenha').value;
    const msg = document.getElementById('msgEmpresa');

    if (!nome || !email || !senha) {
        msg.innerText = "Preencha todos os campos!";
        msg.className = "text-danger mt-2";
        return;
    }

    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nome,
            email: email,
            password: senha,
            role: "ADMIN"
        })
    })
    .then(res => {
        if(!res.ok) throw new Error(`Erro ao criar empresa: ${res.status}`);
        return res.json();
    })
    .then(data => {
        msg.innerText = "Empresa criada com sucesso!";
        msg.className = "text-success mt-2";
        document.getElementById('empresaNome').value = '';
        document.getElementById('empresaEmail').value = '';
        document.getElementById('empresaSenha').value = '';
        listarEmpresas();
        mostrarTela('listarEmpresasDiv');
    })
    .catch(err => {
        console.error(err);
        msg.innerText = err.message;
        msg.className = "text-danger mt-2";
    });
}

// Listar empresas
function listarEmpresas() {
    fetch('http://localhost:8080/users', { method: 'GET' })
    .then(res => {
        if(!res.ok) throw new Error(`Erro ao listar empresas: ${res.status}`);
        return res.json();
    })
    .then(empresas => {
        const tabela = document.getElementById('tabelaEmpresas');
        tabela.innerHTML = '';
        empresas.forEach(e => {
            tabela.innerHTML += `<tr>
                <td>${e.name}</td>
                <td>${e.email}</td>
                <td>${e.role}</td>
            </tr>`;
        });
    })
    .catch(err => console.error(err));
}

// Ao abrir a página, já lista as empresas
document.addEventListener('DOMContentLoaded', listarEmpresas);
