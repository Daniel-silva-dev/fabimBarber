import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";

import { db } from "../services/firebase";
import "./admin.css";


export default function Admin() {
  
  const [filtroData, setFiltroData] = useState("");
  const [mostrarPassados, setMostrarPassados] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);

  function isPassado(data) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataItem = new Date(data + "T00:00:00");
  return dataItem < hoje;
}

  
  
  async function limparDiasPassados() {
  const confirmar = window.confirm(
    "Deseja apagar todos os agendamentos de dias passados?"
  );
  if (!confirmar) return;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const snapshot = await getDocs(collection(db, "agendamentos"));

  snapshot.forEach(async (docSnap) => {
    const data = docSnap.data().data;
    if (!data) return;

    const [ano, mes, dia] = data.split("-");
    const dataItem = new Date(ano, mes - 1, dia);

    if (dataItem < hoje) {
      await deleteDoc(doc(db, "agendamentos", docSnap.id));
    }
  });

  alert("Agendamentos antigos removidos com sucesso.");
}



  // 🔹 ESCUTA EM TEMPO REAL
  useEffect(() => {
    const q = query(
      collection(db, "agendamentos"),
      orderBy("data"),
      orderBy("horario")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgendamentos(dados);
    });

    return () => unsubscribe();
  }, []);

  async function cancelarAgendamento(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar este agendamento?"
    );
    if (!confirmar) return;

    await deleteDoc(doc(db, "agendamentos", id));
  }
  const agendamentosFiltrados = agendamentos.filter((item) => {
  // filtrar por data selecionada
  if (filtroData && item.data !== filtroData) return false;

  // esconder dias passados
  if (!mostrarPassados && isPassado(item.data)) return false;

  return true;
});


  const agendamentosPorDia = agendamentosFiltrados.reduce((acc, item) => {
    if (!acc[item.data]) acc[item.data] = [];
    acc[item.data].push(item);
    return acc;
  }, {});

  

  return (
    <div className="admin-container">

      {Object.keys(agendamentosPorDia).length === 0 && (
        <p className="admin-empty">Nenhum agendamento encontrado.</p>
      )}
     <h1 className="admin-title">Painel Admin</h1>

        <div className="admin-filtros">
          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={mostrarPassados}
              onChange={(e) => setMostrarPassados(e.target.checked)}
            />
            Mostrar dias passados
          </label>
        </div>

        {Object.keys(agendamentosPorDia).length === 0 && (
  <p className="admin-empty">
    Nenhum agendamento para os filtros selecionados.
  </p>
)}



        <button className="admin-clean-btn" onClick={limparDiasPassados}>
        Limpar dias passados
        </button>


      {Object.entries(agendamentosPorDia).map(([data, itens]) => (
        <div key={data} className="admin-dia">
          <h2 className="admin-data">{data}</h2>
          {
            
          }
          {itens.map((item) => (
            <div key={item.id} className="admin-item">
              <div className="admin-info">
                <strong>{item.nome}</strong>
                <span>{item.horario}</span>
              </div>

              <button
                className="admin-btn"
                onClick={() => cancelarAgendamento(item.id)}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

