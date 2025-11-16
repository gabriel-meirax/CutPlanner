# Testes do CutPlanner

Este documento descreve a estrutura de testes do aplicativo CutPlanner.

## 📋 Estrutura de Testes

```
__tests__/
├── components/          # Testes de componentes React
│   ├── HeroSection.test.tsx
│   ├── FeaturesSection.test.tsx
│   ├── FormSection.test.tsx
│   ├── ResultsSection.test.tsx
│   └── Footer.test.tsx
├── api/                 # Testes de API routes
│   ├── optimize.test.ts
│   └── report.test.ts
├── integration/        # Testes de integração
│   └── app.test.tsx
├── utils/              # Utilitários de teste
│   └── test-helpers.ts
└── types/              # Testes de tipos
    └── index.test.ts
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

## 📊 Cobertura de Testes

Os testes cobrem:

- ✅ **Componentes React**: Todos os componentes principais
- ✅ **API Routes**: Rotas de otimização e relatórios
- ✅ **Integração**: Fluxo completo da aplicação
- ✅ **Tipos TypeScript**: Validação de tipos

## 🧪 Tipos de Testes

### Testes de Componentes

Testam a renderização e interação dos componentes React:

- Renderização correta
- Interações do usuário
- Estados de loading
- Validação de formulários

### Testes de API Routes

Testam as rotas da API Next.js que fazem proxy para o backend Python:

- Proxy correto para backend
- Tratamento de erros
- Formatação de respostas

### Testes de Integração

Testam o fluxo completo da aplicação:

- Integração entre componentes
- Fluxo de otimização
- Comunicação frontend-backend

## 📝 Adicionando Novos Testes

### Exemplo: Teste de Componente

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Exemplo: Teste de API Route

```typescript
import { POST } from '@/app/api/my-route/route';
import { NextRequest } from 'next/server';

describe('/api/my-route', () => {
  it('handles request correctly', async () => {
    const request = new NextRequest('http://localhost:3000/api/my-route', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

## 🔧 Configuração

Os testes usam:
- **Jest**: Framework de testes
- **React Testing Library**: Testes de componentes React
- **jsdom**: Ambiente DOM para testes
- **@testing-library/user-event**: Simulação de eventos do usuário

## 📈 Métricas de Qualidade

Execute `npm run test:coverage` para ver:
- Cobertura de código por arquivo
- Linhas não testadas
- Branches não cobertos

## 🐛 Troubleshooting

### Erro: "Cannot find module"

Execute:
```bash
npm install
```

### Erro: "SyntaxError: Unexpected token"

Verifique se o arquivo `jest.config.js` está configurado corretamente.

### Testes muito lentos

- Use `test:watch` apenas para os arquivos que está editando
- Verifique se há mocks desnecessários
- Considere usar `jest.setTimeout()` para testes assíncronos

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)

