# 📋 Quadro Kanban em React

Este é um projeto de um quadro Kanban simples e interativo, construído com React. Ele permite aos usuários gerenciar tarefas divididas em três colunas: "A Fazer", "Em Progresso" e "Concluído".

## ✨ Funcionalidades

- **Criar Tarefas:** Adicione novas tarefas com título e descrição através de um modal intuitivo.
- **Mover Tarefas:** Avance ou retroceda tarefas entre as colunas de status.
- **Excluir Tarefas:** Remova tarefas que não são mais necessárias.
- **Persistência Local:** Todas as tarefas são salvas no `localStorage` do seu navegador, o que significa que seus dados persistem mesmo após fechar a aba. Nenhuma conexão com a internet é necessária para gerenciar as tarefas.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência tanto em desktops quanto em dispositivos móveis. Em telas maiores, as colunas são exibidas lado a lado, enquanto em telas menores, elas são empilhadas verticalmente.

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/):** Biblioteca principal para a construção da interface de usuário.
- **[Vite](https://vitejs.dev/):** Ferramenta de build moderna e rápida para o desenvolvimento front-end.
- **JavaScript (ES6+):** Linguagem de programação utilizada.
- **CSS3:** Para estilização e design responsivo.

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**

### Instalação

1.  Clone o repositório para sua máquina local:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd react-kanban
    ```
3.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

### Execução

Após a instalação, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou em outra porta, caso a 5173 esteja em uso).

## 📂 Estrutura do Projeto

```
react-kanban/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css         # Estilos globais e do componente App
│   ├── App.jsx         # Componente principal da aplicação
│   ├── index.css       # Estilos base
│   ├── localDB.js      # Módulo para interagir com o localStorage
│   └── main.jsx        # Ponto de entrada da aplicação React
├── .gitignore
├── index.html
├── package.json
└── README.md
```

- **`src/App.jsx`**: Contém toda a lógica e a estrutura da interface do quadro Kanban.
- **`src/localDB.js`**: Abstrai as operações de Leitura/Escrita (CRUD) no `localStorage` do navegador, tratando as tarefas como um banco de dados local.
- **`src/App.css`**: Define a aparência visual da aplicação, incluindo as regras de responsividade.

---
Feito com José Mario