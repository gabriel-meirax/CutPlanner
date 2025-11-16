"""
Exemplo básico de uso do CutPlanner
"""

import sys
import os

# Adicionar o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from cutplanner import CutPlanner
from cutplanner.models import Material, Part, MaterialType, PartType


def main():
    """Exemplo básico de otimização 1D"""
    
    print("🔧 CutPlanner - Exemplo Básico de Uso")
    print("=" * 50)
    
    # 1. Criar instância do planejador
    planner = CutPlanner(kerf_width=3.0)  # 3mm de espessura de corte
    print(f"✓ Planejador criado com espessura de corte: {planner.kerf_width}mm")
    
    # 2. Definir materiais disponíveis
    materials = [
        Material(
            id="barra_aco_6m",
            name="Barra de Aço 6m",
            material_type=MaterialType.BAR,
            length=6000,  # 6 metros em mm
            quantity=5,
            cost_per_unit=150.0
        ),
        Material(
            id="perfil_aluminio_4m",
            name="Perfil de Alumínio 4m",
            material_type=MaterialType.PROFILE,
            length=4000,  # 4 metros em mm
            quantity=3,
            cost_per_unit=120.0
        )
    ]
    
    print(f"✓ {len(materials)} materiais definidos:")
    for material in materials:
        print(f"  - {material.name}: {material.length}mm x {material.quantity} unid.")
    
    # 3. Definir peças a cortar
    parts = [
        Part(
            id="viga_principal",
            name="Viga Principal",
            part_type=PartType.LINEAR,
            length=1200,  # 1.2 metros
            quantity=10,
            priority=1
        ),
        Part(
            id="suporte_secundario",
            name="Suporte Secundário",
            part_type=PartType.LINEAR,
            length=800,   # 0.8 metros
            quantity=15,
            priority=2
        ),
        Part(
            id="conector",
            name="Conector",
            part_type=PartType.LINEAR,
            length=600,   # 0.6 metros
            quantity=20,
            priority=3
        )
    ]
    
    print(f"✓ {len(parts)} tipos de peças definidos:")
    for part in parts:
        print(f"  - {part.name}: {part.length}mm x {part.quantity} unid. (Prioridade: {part.priority})")
    
    # 4. Executar otimização
    print("\n🔄 Executando otimização...")
    result = planner.optimize_1d(
        materials=materials,
        parts=parts,
        algorithm="best_fit"
    )
    
    # 5. Exibir resultados
    print("\n📊 RESULTADOS DA OTIMIZAÇÃO")
    print("=" * 50)
    
    if result.success:
        print(f"✅ Otimização bem-sucedida!")
        print(f"📈 Eficiência Total: {result.efficiency:.1f}%")
        print(f"🗑️  Desperdício Total: {result.total_waste:.1f}mm")
        print(f"📦 Materiais Utilizados: {result.materials_used}")
        print(f"⚡ Tempo de Processamento: {result.processing_time:.1f}ms")
        print(f"🧮 Algoritmo Utilizado: {result.algorithm_used}")
        
        # Detalhes por material
        print(f"\n📋 DETALHES DOS CORTES:")
        for i, material_cut in enumerate(result.cuts, 1):
            print(f"\n{i}. {material_cut.material_name}:")
            print(f"   • Eficiência: {material_cut.efficiency:.1f}%")
            print(f"   • Desperdício: {material_cut.waste:.1f}mm")
            print(f"   • Peças cortadas: {len(material_cut.cuts)}")
            
            for j, cut_op in enumerate(material_cut.cuts, 1):
                print(f"     {j}. {cut_op.part_name}: {cut_op.length}mm (pos: {cut_op.position_x}mm)")
        
        # Retalhos utilizáveis
        if result.leftovers:
            usable_leftovers = [l for l in result.leftovers if l.usable]
            if usable_leftovers:
                print(f"\n♻️  RETALHOS UTILIZÁVEIS:")
                for leftover in usable_leftovers:
                    print(f"   • {leftover.length:.1f}mm (Material: {leftover.material_id})")
        
        # Ordem de execução
        if result.execution_order:
            print(f"\n📋 ORDEM DE EXECUÇÃO:")
            for i, step in enumerate(result.execution_order, 1):
                print(f"   {i}. {step}")
        
    else:
        print(f"❌ Falha na otimização:")
        print(f"   Erro: {result.metadata.get('error', 'Erro desconhecido')}")
    
    print("\n" + "=" * 50)
    print("🎉 Exemplo concluído!")


if __name__ == "__main__":
    main() 