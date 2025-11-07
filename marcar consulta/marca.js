// pega todas as telas
const telas = [
    document.getElementById('tela1'),
    document.getElementById('tela2'),
    document.getElementById('tela3'),
    document.getElementById('tela4')
];

// mostra a tela pelo número
function mostrarTela(n) {
    telas.forEach((tela, i) => {
        tela.hidden = i !== n - 1;
    });
}

// inputs
const especialidade = document.getElementById('especialidade');
const medico = document.getElementById('medico');
const dataInput = document.getElementById('data');
const horaInput = document.getElementById('hora');

// botões
const next1 = document.getElementById('next1');
const next2 = document.getElementById('next2');
const next3 = document.getElementById('next3');
const back2 = document.getElementById('back2');
const back3 = document.getElementById('back3');
const back4 = document.getElementById('back4');
const submitBtn = document.getElementById('submitBtn');

// Inicializar botões
next1.disabled = especialidade.value === '';
next2.disabled = medico.value === '';
next3.disabled = dataInput.value === '';
submitBtn.disabled = horaInput.value === '';

// Event listeners
especialidade.addEventListener('change', () => {
    next1.disabled = especialidade.value === '';
});

medico.addEventListener('change', () => {
    next2.disabled = medico.value === '';
});

dataInput.addEventListener('change', () => {
    next3.disabled = dataInput.value === '';
});

// CORREÇÃO PRINCIPAL - adicionar .disabled
horaInput.addEventListener('change', () => {
    submitBtn.disabled = horaInput.value === '';
});

// botões próximos
next1.addEventListener('click', () => { 
    if (!next1.disabled) mostrarTela(2); 
});

next2.addEventListener('click', () => { 
    if (!next2.disabled) mostrarTela(3); 
});

next3.addEventListener('click', () => { 
    if (!next3.disabled) mostrarTela(4); 
});

// botões voltar
back2.addEventListener('click', () => mostrarTela(1));
back3.addEventListener('click', () => mostrarTela(2));
back4.addEventListener('click', () => mostrarTela(3));

// enviar
// enviar
document.getElementById('wizardForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
        especialidade: especialidade.value,
        medico: medico.value,
        data: dataInput.value,
        hora: horaInput.value,
        status: 'em_analise' // Status padrão
    };

    // Recupera agendamentos existentes ou cria array vazio
    const agendamentosExistentes = JSON.parse(localStorage.getItem("agendamentos")) || [];
    
    // Adiciona novo agendamento ao array
    agendamentosExistentes.push(dados);
    
    // Salva o array atualizado no localStorage
    localStorage.setItem("agendamentos", JSON.stringify(agendamentosExistentes));
    
    // Redireciona para a página de confirmação
    window.location.href = "confirmacao.html";
});