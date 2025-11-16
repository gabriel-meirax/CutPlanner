#!/usr/bin/env python3
"""
Demonstração simples do sistema CutPlanner
"""

import sys
import os

# Adicionar o diretório atual ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from cutplanner import CutPlanner
    from cutplanner.models import Material, Part, MaterialType, PartType
    
    print("🔧 CutPlanner - Demonstração do Sistema")
    print("=" * 60)
    
    # Criar planejador
    planner = CutPlanner(kerf_width=3.0)
    print(f"✓ Planejador criado com espessura de corte: {planner.kerf_width}mm")
    
    # Dados de exemplo
    materials = [
        Material(
            id="barra_aco_6m",
            name="Barra de Aço 6m",
            material_type=MaterialType.BAR,
            length=6000,
            quantity=3,
            cost_per_unit=150.0
        )
    ]
    
    parts = [
        Part(
            id="viga_principal",
            name="Viga Principal",
            part_type=PartType.LINEAR,
            length=1200,
            quantity=8,
            priority=1
        ),
        Part(
            id="suporte_secundario",
            name="Suporte Secundário",
            part_type=PartType.LINEAR,
            length=800,
            quantity=6,
            priority=2
        )
    ]
    
    print(f"✓ {len(materials)} materiais carregados")
    print(f"✓ {len(parts)} tipos de peças definidos")
    
    # Executar otimização
    print("\n🔄 Executando otimização...")
    result = planner.optimize_1d(
        materials=materials,
        parts=parts,
        algorithm="best_fit"
    )
    
    # Exibir resultados
    if result.success:
        print(f"\n✅ Otimização concluída com sucesso!")
        print(f"📊 Eficiência: {result.efficiency:.1f}%")
        print(f"🗑️  Desperdício: {result.total_waste:.1f}mm")
        print(f"📦 Materiais utilizados: {result.materials_used}")
        print(f"⚡ Tempo de processamento: {result.processing_time:.1f}ms")
        
        print(f"\n📋 Detalhes dos cortes:")
        for i, material_cut in enumerate(result.cuts, 1):
            print(f"  {i}. {material_cut.material_name}:")
            print(f"     • Eficiência: {material_cut.efficiency:.1f}%")
            print(f"     • Desperdício: {material_cut.waste:.1f}mm")
            print(f"     • Peças cortadas: {len(material_cut.cuts)}")
            
            for j, cut_op in enumerate(material_cut.cuts, 1):
                print(f"       {j}. {cut_op.part_name}: {cut_op.length}mm (pos: {cut_op.position_x}mm)")
        
        if result.leftovers:
            usable = [l for l in result.leftovers if l.usable]
            if usable:
                print(f"\n♻️  Retalhos utilizáveis: {len(usable)}")
                for leftover in usable:
                    print(f"     • {leftover.length:.1f}mm")
        
        print(f"\n📋 Ordem de execução:")
        for i, step in enumerate(result.execution_order, 1):
            print(f"     {i}. {step}")
        
    else:
        print(f"❌ Falha na otimização: {result.metadata.get('error', 'Erro desconhecido')}")
    
    print("\n" + "=" * 60)
    print("🎉 Demonstração concluída!")
    print("\nPara mais funcionalidades, execute:")
    print("  python run.py demo          # Demonstração completa")
    print("  python run.py api           # Servidor da API")
    print("  python run.py test          # Testes do sistema")
    
except ImportError as e:
    print(f"❌ Erro de importação: {e}")
    print("Instale as dependências com: pip install -r requirements.txt")
except Exception as e:
    print(f"❌ Erro: {e}")
    print("Verifique se o sistema está configurado corretamente") 