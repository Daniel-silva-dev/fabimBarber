#💈 Fabiin Barber

Aplicação front-end desenvolvida para gerenciamento de agendamentos de uma barbearia. O projeto foi construído com React e Vite, priorizando componentização, controle de estado e renderização dinâmica de dados.

## 🧩 Stack Tecnológica
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Git / GitHub

## ⚙️ Funcionalidades
- Renderização dinâmica de agendamentos via `Array.map`
- Separação de dados em módulo externo (`db.js`)
- Exibição de informações em colunas fixas
- Formulário controlado com `useState`
- Seleção de horários pré-definidos pelo sistema
- Renderização condicional para estado vazio
- Estilização modular por componente

## 🧠 Conceitos Técnicos Aplicados
- Componentização funcional
- Props para comunicação entre componentes
- Estado local com `useState`
- Renderização condicional com operador ternário
- Manipulação de eventos (`onSubmit`, `onChange`)
- Estrutura de projeto baseada em responsabilidades
- Controle de versionamento com Git

## 📂 Arquitetura do Projeto
src/
├─ components/
│ ├─ Header.jsx # Renderização da lista de agendamentos
│ └─ Form.jsx # Formulário controlado
├─ componentsStyle/
│ ├─ header.css
│ └─ form.css
├─ db.js # Fonte inicial de dados
├─ App.jsx # Componente raiz
└─ main.jsx # Ponto de entrada da aplicação


## ▶️ Execução Local
```bash
npm install
npm run dev
Aplicação disponível em:


http://localhost:5173
🧪 Possíveis Evoluções
Persistência de dados com Firebase

Validação de formulário

Componentização de horários

Integração com WhatsApp

Deploy com GitHub Pages ou Vercel

👨‍💻 Autor
Daniel Silva
Desenvolvedor Front-end

GitHub: https://github.com/daniel-silva-dev

