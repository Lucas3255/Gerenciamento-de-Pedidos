// Lista de funcionários e pedidos
let funcionarios = [];
let pedidos = [];

// Função para cadastrar funcionário
document.getElementById('form-funcionario').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nomeFunc = document.getElementById('nome-func').value;
    const cpfFunc = document.getElementById('cpf-func').value;

    if (nomeFunc && cpfFunc.length === 11) {
        const funcionario = { nome: nomeFunc, cpf: cpfFunc };
        funcionarios.push(funcionario);
        atualizarListaFuncionarios();
    } else {
        alert('Por favor, preencha o nome e um CPF válido de 11 dígitos.');
    }

    document.getElementById('form-funcionario').reset();
});

// Função para cadastrar pedido
document.getElementById('form-pedido').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomePedido = document.getElementById('nome-pedido').value;
    const descPedido = document.getElementById('desc-pedido').value;
    const respPedido = document.getElementById('resp-pedido').value;
    const statusPedido = document.getElementById('status-pedido').value;

    if (nomePedido && respPedido) {
        const pedido = { nome: nomePedido, descricao: descPedido, responsavel: respPedido, status: statusPedido };
        pedidos.push(pedido);
        atualizarListaPedidos();
    } else {
        alert('Por favor, preencha o nome do pedido e selecione um responsável.');
    }

    document.getElementById('form-pedido').reset();
});

// Atualizar lista de funcionários
function atualizarListaFuncionarios() {
    const lista = document.getElementById('lista-funcionarios');
    lista.innerHTML = '';
    const selectResp = document.getElementById('resp-pedido');
    selectResp.innerHTML = '<option value="">Selecione um funcionário</option>';

    funcionarios.forEach((func, index) => {
        lista.innerHTML += `<li>${func.nome} - CPF: ${func.cpf}</li>`;
        selectResp.innerHTML += `<option value="${func.nome}">${func.nome}</option>`;
    });
}

// Atualizar lista de pedidos
function atualizarListaPedidos() {
    const lista = document.getElementById('lista-pedidos');
    lista.innerHTML = '';

    pedidos.forEach((pedido, index) => {
        lista.innerHTML += `<li>${pedido.nome} (Responsável: ${pedido.responsavel}) - Status: ${pedido.status}</li>`;
    });
}
