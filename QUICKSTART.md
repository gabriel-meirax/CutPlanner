# 🚀 CutPlanner - Guia de Início Rápido

## Instalação Rápida

### 1. Clone o repositório
```bash
git clone https://github.com/cutplanner/cutplanner.git
cd cutplanner
```

### 2. Instale as dependências
```bash
pip install -r requirements.txt
```

### 3. Execute a demonstração
```bash
python run.py demo
```

## Uso Básico

### Via Python
```python
from cutplanner import CutPlanner

# Criar planejador
planner = CutPlanner(kerf_width=3.0)

# Definir materiais
materials = [
    {
        "id": "barra1",
        "name": "Barra de Aço 6m",
        "material_type": "bar",
        "length": 6000,
        "quantity": 5
    }
]

# Definir peças
parts = [
    {
        "id": "peça1",
        "name": "Viga Principal",
        "part_type": "linear",
        "length": 1200,
        "quantity": 10,
        "priority": 1
    }
]

# Otimizar
result = planner.optimize_1d(materials, parts)
print(f"Eficiência: {result.efficiency:.1f}%")
```

### Via API
```bash
# Iniciar servidor
python run.py api

# Fazer requisição
curl -X POST "http://localhost:8000/optimize/1d" \
  -H "Content-Type: application/json" \
  -d '{
    "materials": [...],
    "parts": [...],
    "kerf_width": 3.0
  }'
```

### Via Interface Web
1. Execute `python run.py api`
2. Acesse `http://localhost:8000`
3. Preencha os dados e clique em "Executar Otimização"

## Exemplos Práticos

### Exemplo 1: Otimização de Barras
```bash
python examples/basic_usage.py
```

### Exemplo 2: Otimização de Chapas
```bash
python examples/2d_optimization.py
```

## Testes
```bash
python run.py test
```

## Estrutura do Projeto
```
CutPlanner/
├── cutplanner/          # Biblioteca principal
├── api/                 # API REST
├── web/                 # Interface web
├── examples/            # Exemplos de uso
├── tests/               # Testes unitários
└── run.py               # Script principal
```

## Próximos Passos
- Leia o [README.md](README.md) completo
- Explore a [documentação da API](http://localhost:8000/docs)
- Execute os exemplos
- Personalize para suas necessidades

## Suporte
- 📧 Email: team@cutplanner.com
- 🐛 Issues: [GitHub Issues](https://github.com/cutplanner/cutplanner/issues)
- 📖 Docs: [Documentação](https://cutplanner.readthedocs.io/)

---

**🎉 Parabéns! Você está pronto para otimizar seus cortes!** 