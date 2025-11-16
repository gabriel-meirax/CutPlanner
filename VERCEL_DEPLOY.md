# Deploy no Vercel - CutPlanner

## ✅ Correções Aplicadas

### 1. **next.config.js**
- Removido o rewrite para `localhost:8000` que causava erro no Vercel
- As API routes fazem proxy diretamente via `fetch` usando a variável de ambiente

### 2. **tsconfig.json**
- Adicionados arquivos de teste ao `exclude` para evitar compilação desnecessária
- Excluídos: `__tests__`, `__mocks__`, `*.test.ts`, `*.test.tsx`, etc.

### 3. **.gitignore**
- Removido `next-env.d.ts` do ignore (necessário para TypeScript)

### 4. **.vercelignore** (novo)
- Criado para excluir arquivos Python e de teste do deploy

## 🔧 Configuração no Vercel

### Variáveis de Ambiente

No painel do Vercel, adicione a variável de ambiente:

```
PYTHON_API_URL=https://seu-backend-python.vercel.app
```

Ou se o backend Python estiver em outro servidor:

```
PYTHON_API_URL=https://api.seudominio.com
```

### Build Settings

O Vercel detecta automaticamente o Next.js, mas você pode verificar:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (automático)
- **Install Command**: `npm install`

## 🚀 Deploy

1. Conecte seu repositório ao Vercel
2. Configure a variável de ambiente `PYTHON_API_URL`
3. Faça o deploy

## ⚠️ Notas Importantes

- O backend Python precisa estar acessível publicamente
- Se o backend estiver em outro servidor, configure CORS adequadamente
- Os arquivos de teste não serão incluídos no build de produção

## 🐛 Troubleshooting

### Erro: "Failed to compile"
- Verifique se todos os imports estão corretos
- Certifique-se de que `next-env.d.ts` existe (gerado automaticamente)
- Verifique os logs do build no Vercel para mais detalhes

### Erro: "Cannot find module"
- Verifique se todas as dependências estão em `package.json`
- Execute `npm install` localmente para verificar

### Erro: "PYTHON_API_URL is not defined"
- Configure a variável de ambiente no painel do Vercel
- Reinicie o deploy após adicionar a variável

