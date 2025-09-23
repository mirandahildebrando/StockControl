// Controle de telas
function mostrarTela(id){
    const divs = document.querySelectorAll('.main-content > div');
    divs.forEach(d => d.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Admin
function criarEmpresa() {
    const nome = document.getElementById('empresaNome').value;
    const email = document.getElementById('empresaEmail').value;
    const senha = document.getElementById('empresaSenha').value;

    fetch('/auth/criarEmpresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome,email,senha })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('empresaNome').value = '';
        document.getElementById('empresaEmail').value = '';
        document.getElementById('empresaSenha').value = '';
        listarEmpresas();
    });
}

function listarEmpresas() {
    // Para expandir: criar endpoint /auth/listarEmpresas
    const tabela = document.getElementById('tabelaEmpresas');
    tabela.innerHTML = '<tr><td colspan="3">Funcionalidade futura: Listar Empresas</td></tr>';
}

// Empresa
let usuarioEmail = '';
let usuarioSenha = '';

function cadastrarProduto() {
    const nome = document.getElementById('produtoNome').value;
    const preco = parseFloat(document.getElementById('produtoPreco').value);

    fetch('/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'email': usuarioEmail,
            'senha': usuarioSenha
        },
        body: JSON.stringify({ nome, preco })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('produtoNome').value = '';
        document.getElementById('produtoPreco').value = '';
        listarProdutos();
    });
}

function listarProdutos() {
    fetch('/produtos', {
        method: 'GET',
        headers: {
            'email': usuarioEmail,
            'senha': usuarioSenha
        }
    })
    .then(res => res.json())
    .then(produtos => {
        const tabela = document.getElementById('tabelaProdutos');
        tabela.innerHTML = '';
        produtos.forEach(p => {
            tabela.innerHTML += `<tr><td>${p.nome}</td><td>R$ ${p.preco}</td></tr>`;
        });
    });
}

function logout(){
    window.location.href = '/index.html';
}
