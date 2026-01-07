import "../componentsStyle/header.css";

export default function Header({ lista }) {

  function gerarDias() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return [
      {
        label: "Hoje",
        data: hoje.toISOString().split("T")[0]
      },
      {
        label: "Amanhã",
        data: new Date(hoje.getTime() + 86400000)
          .toISOString()
          .split("T")[0]
      },
      {
        label: "Depois de amanhã",
        data: new Date(hoje.getTime() + 2 * 86400000)
          .toISOString()
          .split("T")[0]
      }
    ];
  }

  const dias = gerarDias();

  function filtrarPorDia(data) {
    return lista
      .filter(item => item.data === data)
      .sort((a, b) => a.horario.localeCompare(b.horario));
  }

  // 🔹 verifica se existe algum horário nos próximos 3 dias
  const existeAlgumHorario = dias.some(
    dia => filtrarPorDia(dia.data).length > 0
  );

  return (
    <div className="banner">
      <p>Próximos horários</p>

      {!existeAlgumHorario ? (
        <p className="banner-vazio">
          Nenhum horário agendado para os próximos dias.
        </p>
      ) : (
        dias.map(dia => {
          const eventosDoDia = filtrarPorDia(dia.data);

          return (
            <div key={dia.data} className="bloco-dia">
              <h3 className="titulo-dia">{dia.label}</h3>

              {eventosDoDia.length === 0 ? (
                <p className="dia-vazio">Sem horários</p>
              ) : (
                <ul className="lista">
                  {eventosDoDia.map((evento, index) => (
                    <li key={index} className="item">
                      <span className="nome">{evento.nome}</span>
                      <span className="hora">{evento.horario}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
