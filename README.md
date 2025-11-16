# CutPlanner - Sistema de Otimização de Cortes (Next.js)

Sistema inteligente de otimização de cortes para serralherias com interface moderna em Next.js.

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- Python 3.8+ instalado
- npm ou yarn

### Passo 1: Instalar dependências

**Backend Python:**
```bash
pip install -r requirements.txt
```

**Frontend Next.js:**
```bash
npm install
```

### Passo 2: Iniciar o backend Python

Em um terminal, inicie o servidor Python:

```bash
python run.py api
```

O servidor Python estará rodando em `http://localhost:8000`

### Passo 3: Iniciar o Next.js

Em outro terminal, inicie o servidor Next.js:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
CutPlannerCursor/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (proxy para Python)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── FormSection.tsx
│   ├── ResultsSection.tsx
│   └── Footer.tsx
├── types/                 # Tipos TypeScript
│   └── index.ts
├── api/                   # Backend Python (FastAPI)
│   └── main.py
├── cutplanner/           # Biblioteca Python
│   ├── core.py
│   ├── models.py
│   └── utils.py
├── package.json          # Dependências Node.js
├── requirements.txt      # Dependências Python
└── run.py               # Script para iniciar backend
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (opcional):

```env
PYTHON_API_URL=http://localhost:8000
```

Se o backend Python estiver em outra porta ou URL, ajuste esta variável.

## 🎯 Funcionalidades

- ✅ Interface moderna com Next.js e React
- ✅ Otimização 1D (barras e perfis)
- ✅ Otimização 2D (chapas e placas)
- ✅ Múltiplos algoritmos de otimização
- ✅ Visualização de resultados
- ✅ Geração de relatórios
- ✅ Design responsivo com Tailwind CSS

## 📝 Scripts Disponíveis

**Next.js:**
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

**Python:**
- `python run.py api` - Inicia o servidor da API

## 🔄 Como Funciona

1. O frontend Next.js faz requisições para `/api/optimize/[type]`
2. As API routes do Next.js fazem proxy para o backend Python em `http://localhost:8000`
3. O backend Python processa a otimização e retorna os resultados
4. O frontend exibe os resultados de forma interativa

## 🐛 Troubleshooting

### Erro: "Cannot connect to Python backend"

- Certifique-se de que o backend Python está rodando em `http://localhost:8000`
- Verifique se a porta 8000 não está sendo usada por outro processo
- Verifique a variável de ambiente `PYTHON_API_URL` no `.env.local`

### Erro: "Module not found"

- Execute `npm install` novamente
- Delete a pasta `node_modules` e `.next`, depois execute `npm install`

### Porta 3000 já em uso

- O Next.js tentará usar a próxima porta disponível automaticamente
- Ou defina uma porta customizada: `PORT=3001 npm run dev`

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

