import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { db } from "./services/firebase";
import { AuthProvider } from "./contexts/AuthContext";

import Form from "./components/form";
import Header from "./components/header";
import Footer from "./components/Footer";
import HeaderBar from "./components/HeaderBar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

/* 🔁 Trata redirect do GitHub Pages (/admin direto na URL) */
function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, []);

  return null;
}

function App() {
  const [lista, setLista] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState("");

  /* 🔥 Escuta agendamentos em tempo real */
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

  /* ➕ Criar novo agendamento */
  async function novoEvento(evento) {
    const existe = lista.some(
      (item) =>
        item.data === evento.data &&
        item.horario === evento.horario &&
        (item.status === "ativo" || item.status === "bloqueado")
    );

    if (existe) return false;

    await addDoc(collection(db, "agendamentos"), {
      ...evento,
      status: "ativo",
    });

    return true;
  }

  /* ⛔ Horários bloqueados por dia + status */
  const horariosBloqueados = diaSelecionado
    ? lista
        .filter(
          (item) =>
            item.data === diaSelecionado &&
            (item.status === "ativo" || item.status === "bloqueado")
        )
        .map((item) => item.horario)
    : [];

  return (
    <AuthProvider>
      <BrowserRouter basename="/fabimBarber">
        <RedirectHandler />

        <Routes>
          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              <>
                <HeaderBar />
                <Header
                  lista={lista.filter((item) =>
                    diaSelecionado ? item.data === diaSelecionado : true
                  )}
                />

                <Form
                  onSubmit={novoEvento}
                  diaSelecionado={diaSelecionado}
                  setDiaSelecionado={setDiaSelecionado}
                  horariosBloqueados={horariosBloqueados}
                />

                <Footer />
              </>
            }
          />

          {/* 🔐 LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* 🛠 ADMIN (PROTEGIDO) */}
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
