// Arrays para armazenar funcionários e pedidos
let funcionarios = [];
let pedidos = [];

// Função para adicionar um funcionário
document.getElementById('form-funcionario').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome-funcionario').value;
    const cpf = document.getElementById('cpf-funcionario').value;

    if (cpf.length === 11) { // Validação de CPF
        funcionarios.push({ nome, cpf });
        atualizarFuncionarios();
    } else {
        alert('CPF deve ter 11 dígitos');
    }

    e.target.reset();
});

// Função para atualizar a lista de funcionários no formulário de pedidos
function atualizarFuncionarios() {
    const select = document.getElementById('responsavel-pedido');
    select.innerHTML = '';
    funcionarios.forEach((func) => {
        const option = document.createElement('option');
        option.value = func.nome;
        option.textContent = func.nome;
        select.appendChild(option);
    });
}

// Função para adicionar um pedido
document.getElementById('form-pedido').addEventListener('submit', function (e) {
    e.preventDefault();

    const nomePedido = document.getElementById('nome-pedido').value;
    const descricao = document.getElementById('descricao-pedido').value;
    const responsavel = document.getElementById('responsavel-pedido').value;
    const status = document.getElementById('status-pedido').value;

    pedidos.push({ nomePedido, descricao, responsavel, status });
    atualizarPedidos();

    e.target.reset();
});

// Função para atualizar a lista de pedidos
function atualizarPedidos() {
    const listaPedidos = document.getElementById('pedidos-list');
    listaPedidos.innerHTML = '';
    
    pedidos.forEach((pedido, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${pedido.nomePedido} - ${pedido.responsavel} - ${pedido.status}</span>
            <select data-index="${index}" class="status-change">
                <option value="A Fazer">A Fazer</option>
                <option value="Fazendo">Fazendo</option>
                <option value="Pronto para entrega">Pronto para entrega</option>
            </select>
        `;
        listaPedidos.appendChild(li);
    });

    document.querySelectorAll('.status-change').forEach(select => {
        select.addEventListener('change', function () {
            const index = this.getAttribute('data-index');
            pedidos[index].status = this.value;
            atualizarPedidos();
        });
    });
}

// Função para filtrar pedidos por status
document.getElementById('filtro-status').addEventListener('change', function () {
    const filtro = this.value;
    const listaPedidos = document.getElementById('pedidos-list');
    listaPedidos.innerHTML = '';

    pedidos
        .filter(pedido => filtro === 'Todos' || pedido.status === filtro)
        .forEach((pedido, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${pedido.nomePedido} - ${pedido.responsavel} - ${pedido.status}</span>
                <select data-index="${index}" class="status-change">
                    <option value="A Fazer">A Fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Pronto para entrega">Pronto para entrega</option>
                </select>
            `;
            listaPedidos.appendChild(li);
        });

    document.querySelectorAll('.status-change').forEach(select => {
        select.addEventListener('change', function () {
            const index = this.getAttribute('data-index');
            pedidos[index].status = this.value;
            atualizarPedidos();
        });
    });
});
