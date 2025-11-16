# Guia de Testes - CutPlanner Next.js

## 📋 Visão Geral

Este projeto possui uma suíte completa de testes para garantir que o aplicativo está funcionando corretamente.

## 🧪 Estrutura de Testes

```
__tests__/
├── components/          # Testes de componentes React
│   ├── HeroSection.test.tsx
│   ├── FeaturesSection.test.tsx
│   ├── FormSection.test.tsx
│   ├── ResultsSection.test.tsx
│   └── Footer.test.tsx
├── api/                # Testes de API routes
│   ├── optimize.test.ts
│   └── report.test.ts
├── integration/        # Testes de integração
│   └── app.test.tsx
├── types/              # Testes de tipos TypeScript
│   └── index.test.ts
└── utils/              # Funções auxiliares para testes
    └── test-helpers.ts
```

## 🚀 Executando os Testes

### Todos os testes
```bash
npm test
```

### Modo watch (re-executa ao salvar arquivos)
```bash
npm run test:watch
```

### Com cobertura de código
```bash
npm run test:coverage
```

## ✅ Testes Implementados

### Componentes (29 testes)

#### HeroSection
- ✅ Renderiza o título
- ✅ Renderiza a descrição
- ✅ Renderiza botões de ação

#### FeaturesSection
- ✅ Renderiza título da seção
- ✅ Renderiza todas as 3 funcionalidades
- ✅ Renderiza descrições das funcionalidades

#### FormSection
- ✅ Renderiza título do formulário
- ✅ Renderiza opções de tipo de otimização
- ✅ Renderiza inputs de configuração
- ✅ Permite adicionar materiais
- ✅ Permite adicionar peças
- ✅ Valida formulário antes de submeter
- ✅ Submete formulário com dados válidos
- ✅ Mostra estado de carregamento

#### ResultsSection
- ✅ Renderiza título dos resultados
- ✅ Exibe métrica de eficiência
- ✅ Exibe métrica de desperdício
- ✅ Exibe materiais utilizados
- ✅ Exibe tempo de processamento
- ✅ Exibe detalhes dos cortes
- ✅ Exibe retalhos
- ✅ Exibe ordem de execução
- ✅ Renderiza botões de ação
- ✅ Lida com resultado vazio

#### Footer
- ✅ Renderiza texto de copyright
- ✅ Renderiza descrição

### API Routes (6 testes)

#### /api/optimize/[type]
- ✅ Encaminha requisição para backend Python
- ✅ Lida com erros do backend Python
- ✅ Remove optimizationType do body

#### /api/report/generate
- ✅ Encaminha requisição de relatório para backend Python
- ✅ Lida com erros do backend

### Integração (2 testes)

#### Home Page
- ✅ Renderiza todas as seções principais
- ✅ Lida com fluxo de otimização

### Tipos TypeScript (3 testes)

- ✅ Material tem campos obrigatórios
- ✅ Material suporta largura opcional para 2D
- ✅ Part tem campos obrigatórios
- ✅ OptimizationResult tem campos obrigatórios

## 📊 Cobertura de Código

Os testes cobrem:
- ✅ Todos os componentes principais
- ✅ API routes
- ✅ Tipos TypeScript
- ✅ Fluxo de integração básico

## 🔧 Configuração

### Jest
- Configurado em `jest.config.js`
- Setup em `jest.setup.js`
- Suporte para TypeScript via `ts-jest`
- Ambiente jsdom para testes de componentes React

### Dependências de Teste
- `jest` - Framework de testes
- `@testing-library/react` - Testes de componentes React
- `@testing-library/jest-dom` - Matchers adicionais
- `@testing-library/user-event` - Simulação de eventos do usuário
- `jest-environment-jsdom` - Ambiente DOM para testes

## 📝 Escrevendo Novos Testes

### Exemplo: Teste de Componente

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText(/Expected Text/i)).toBeInTheDocument()
  })
})
```

### Exemplo: Teste de API Route

```typescript
import { POST } from '@/app/api/my-route/route'

jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    constructor(public url: string, public init?: any) {}
    async json() {
      return JSON.parse(this.init?.body || '{}')
    }
  },
  NextResponse: {
    json: (data: any, init?: any) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}))

describe('/api/my-route', () => {
  it('handles request correctly', async () => {
    // Test implementation
  })
})
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Verifique se os paths em `tsconfig.json` estão corretos

### Erro: "Request is not defined"
- O mock do Request está em `jest.setup.js`
- Certifique-se de que o arquivo está sendo carregado

### Testes falhando após mudanças
- Limpe o cache: `npm test -- --clearCache`
- Verifique se os mocks estão atualizados

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)

