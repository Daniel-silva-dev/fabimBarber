import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { db } from "./services/firebase";
import { AuthProvider } from "./contexts/AuthContext"; // 👈 IMPORTANTE

import Form from "./components/form";
import Header from "./components/header";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [lista, setLista] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "agendamentos"),
      (snapshot) => {
        const dados = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLista(dados);
      }
    );

    return () => unsubscribe();
  }, []);

  async function novoEvento(evento) {
    const horarioJaExiste = lista.some(
      (item) =>
        item.data === evento.data &&
        item.horario === evento.horario
    );

    if (horarioJaExiste) {
      alert("Esse horário já está ocupado nesse dia");
      return;
    }

    await addDoc(collection(db, "agendamentos"), evento);
  }

  const horariosBloqueados = diaSelecionado
    ? lista.filter((item) => item.data === diaSelecionado).map(i => i.horario)
    : [];


  return (
    <AuthProvider> {/* 🔐 ENVOLVE TUDO */}
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <>
                <Header
                  lista={lista.filter(item =>
                    diaSelecionado ? item.data === diaSelecionado : true
                  )}
                />

                <Form
                  onSubmit={novoEvento}
                  diaSelecionado={diaSelecionado}
                  setDiaSelecionado={setDiaSelecionado}
                  horariosBloqueados={horariosBloqueados}
                />
              </>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
