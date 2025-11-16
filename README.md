# CutPlanner - Sistema de Otimização de Cortes para Serralherias

## Visão Geral

O CutPlanner é um sistema inteligente que otimiza o corte de materiais (barras, chapas, perfis) para serralherias, reduzindo desperdícios e maximizando o aproveitamento do material.

## Funcionalidades

- **Otimização 1D**: Para barras e perfis lineares
- **Otimização 2D**: Para chapas e placas
- **Consideração de espessura de corte**: Perda da serra incluída nos cálculos
- **Múltiplos algoritmos**: First Fit, Best Fit, Genetic Algorithm
- **Relatórios detalhados**: Aproveitamento, sobras, ordem de cortes
- **API REST**: Para integração com sistemas SaaS
- **Interface Web**: Interface amigável para uso direto

## Instalação

```bash
pip install -r requirements.txt
```

## Uso Rápido

### Via Python

```python
from cutplanner import CutPlanner

# Configurar o planejador
planner = CutPlanner(kerf_width=3.0)  # 3mm de espessura de corte

# Definir materiais disponíveis
materials = [
    {"id": "barra1", "length": 6000, "quantity": 5},  # 5 barras de 6m
    {"id": "barra2", "length": 4000, "quantity": 3}   # 3 barras de 4m
]

# Definir peças a cortar
parts = [
    {"id": "peça1", "length": 1200, "quantity": 10},
    {"id": "peça2", "length": 800, "quantity": 15},
    {"id": "peça3", "length": 600, "quantity": 20}
]

# Calcular plano de corte
result = planner.optimize_1d(materials, parts)
print(result)
```

### Via API

```bash
# Iniciar servidor
uvicorn main:app --reload

# Fazer requisição
curl -X POST "http://localhost:8000/optimize/1d" \
  -H "Content-Type: application/json" \
  -d '{
    "materials": [...],
    "parts": [...],
    "kerf_width": 3.0
  }'
```

## Estrutura do Projeto

```
CutPlanner/
├── cutplanner/           # Biblioteca principal
│   ├── __init__.py
│   ├── core.py          # Algoritmos de otimização
│   ├── models.py        # Modelos de dados
│   └── utils.py         # Utilitários
├── api/                  # API REST
│   ├── __init__.py
│   ├── main.py          # Servidor FastAPI
│   └── routes.py        # Rotas da API
├── web/                  # Interface web
│   ├── templates/
│   └── static/
├── tests/                # Testes unitários
└── examples/             # Exemplos de uso
```

## Algoritmos Implementados

### 1D (Barras/Perfis)

- **First Fit**: Primeira barra que cabe
- **Best Fit**: Melhor aproveitamento por barra
- **Genetic Algorithm**: Otimização evolutiva

### 2D (Chapas)

- **Guillotine Cut**: Cortes ortogonais
- **MaxRects**: Algoritmo de retângulos máximos
- **Skyline**: Algoritmo de linha do horizonte

## Formato de Saída

### JSON (API)

```json
{
  "efficiency": 94.5,
  "total_waste": 156.0,
  "cuts": [
    {
      "material_id": "barra1",
      "cuts": [
        { "part_id": "peça1", "position": 0, "length": 1200 },
        { "part_id": "peça2", "position": 1203, "length": 800 }
      ],
      "waste": 23.0
    }
  ],
  "leftovers": [{ "length": 156, "usable": true }]
}
```

### Tabela (Interface Web)

- Lista de cortes por material
- Posições e dimensões das peças
- Sobras e aproveitamento
- Ordem de execução

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

MIT License - veja o arquivo LICENSE para detalhes.
