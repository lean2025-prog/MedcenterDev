
        let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
        const lista = document.getElementById('listaAgendamentos');
        
        function atualizarStatus(index, novoStatus, motivo = '') {
            agendamentos[index].status = novoStatus;
            if (motivo) {
                agendamentos[index].motivo = motivo;
            }
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
            renderizarAgendamentos();
        }

        function renderizarAgendamentos() {
            if (agendamentos.length === 0) {
                lista.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
            } else {
                lista.innerHTML = '';
                agendamentos.forEach((agendamento, index) => {
                    // Define status padrão se não existir
                    if (!agendamento.status) {
                        agendamento.status = 'em_analise';
                    }

                    let statusTexto = '';
                    let statusClass = '';
                    
                    switch(agendamento.status) {
                        case 'em_analise':
                            statusTexto = 'Em Análise';
                            statusClass = 'status-analise';
                            break;
                        case 'negado':
                            statusTexto = 'Negado';
                            statusClass = 'status-negado';
                            break;
                        case 'executada':
                            statusTexto = 'Executada';
                            statusClass = 'status-executada';
                            break;
                    }

                    lista.innerHTML += `
                        <div class="agendamento">
                            <h3>Agendamento ${index + 1}</h3>
                            <p><strong>Especialidade:</strong> ${agendamento.especialidade}</p>
                            <p><strong>Médico:</strong> ${agendamento.medico}</p>
                            <p><strong>Data:</strong> ${agendamento.data}</p>
                            <p><strong>Hora:</strong> ${agendamento.hora}</p>
                            <p><strong>Status:</strong> <span class="${statusClass}">${statusTexto}</span></p>
                            
                            ${agendamento.motivo ? 
                                `<div class="motivo"><strong>Motivo:</strong> ${agendamento.motivo}</div>` : ''
                            }
                            
                            <div>
                                <label><strong>Alterar Status:</strong></label><br>
                                <select onchange="alterarStatus(${index}, this.value)">
                                    <option value="em_analise" ${agendamento.status === 'em_analise' ? 'selected' : ''}>Em Análise</option>
                                    <option value="negado" ${agendamento.status === 'negado' ? 'selected' : ''}>Negado</option>
                                    <option value="executada" ${agendamento.status === 'executada' ? 'selected' : ''}>Executada</option>
                                </select>
                                
                                ${agendamento.status === 'negado' ? `
                                    <br>
                                    <input type="text" id="motivo-${index}" placeholder="Digite o motivo" 
                                           value="${agendamento.motivo || ''}" 
                                           onchange="atualizarMotivo(${index}, this.value)"
                                           style="padding: 5px; margin-top: 5px; width: 200px;">
                                ` : ''}
                            </div>
                        </div>
                    `;
                });
            }
        }

        function alterarStatus(index, novoStatus) {
            if (novoStatus === 'negado') {
                const motivo = prompt('Digite o motivo da negação:');
                if (motivo !== null) {
                    atualizarStatus(index, novoStatus, motivo);
                }
            } else {
                atualizarStatus(index, novoStatus, '');
            }
        }

        function atualizarMotivo(index, motivo) {
            agendamentos[index].motivo = motivo;
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        }

        // Inicializa a página
        renderizarAgendamentos();
    