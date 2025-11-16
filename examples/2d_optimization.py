"""
Exemplo de otimização 2D do CutPlanner
"""

import sys
import os

# Adicionar o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from cutplanner import CutPlanner
from cutplanner.models import Material, Part, MaterialType, PartType


def main():
    """Exemplo de otimização 2D para chapas"""
    
    print("🔧 CutPlanner - Exemplo de Otimização 2D")
    print("=" * 50)
    
    # 1. Criar instância do planejador
    planner = CutPlanner(kerf_width=3.0)  # 3mm de espessura de corte
    print(f"✓ Planejador criado com espessura de corte: {planner.kerf_width}mm")
    
    # 2. Definir materiais 2D (chapas)
    materials = [
        Material(
            id="chapa_aco_2x3m",
            name="Chapa de Aço 2x3m",
            material_type=MaterialType.SHEET,
            length=3000,  # 3 metros (altura)
            width=2000,   # 2 metros (largura)
            thickness=5,  # 5mm de espessura
            quantity=4,
            cost_per_unit=800.0
        ),
        Material(
            id="chapa_aluminio_1.5x2m",
            name="Chapa de Alumínio 1.5x2m",
            material_type=MaterialType.SHEET,
            length=2000,  # 2 metros (altura)
            width=1500,   # 1.5 metros (largura)
            thickness=3,  # 3mm de espessura
            quantity=2,
            cost_per_unit=600.0
        )
    ]
    
    print(f"✓ {len(materials)} chapas definidas:")
    for material in materials:
        area = material.area / 1000000  # Converter para m²
        print(f"  - {material.name}: {material.width}x{material.length}mm ({area:.2f}m²) x {material.quantity} unid.")
    
    # 3. Definir peças 2D (retangulares)
    parts = [
        Part(
            id="painel_frontal",
            name="Painel Frontal",
            part_type=PartType.RECTANGULAR,
            length=800,   # 0.8 metros (altura)
            width=600,    # 0.6 metros (largura)
            quantity=8,
            priority=1
        ),
        Part(
            id="base_suporte",
            name="Base de Suporte",
            part_type=PartType.RECTANGULAR,
            length=400,   # 0.4 metros (altura)
            width=300,    # 0.3 metros (largura)
            quantity=12,
            priority=2
        ),
        Part(
            id="lateral_esquerdo",
            name="Lateral Esquerdo",
            part_type=PartType.RECTANGULAR,
            length=600,   # 0.6 metros (altura)
            width=400,    # 0.4 metros (largura)
            quantity=6,
            priority=1
        ),
        Part(
            id="lateral_direito",
            name="Lateral Direito",
            part_type=PartType.RECTANGULAR,
            length=600,   # 0.6 metros (altura)
            width=400,    # 0.4 metros (largura)
            quantity=6,
            priority=1
        ),
        Part(
            id="tampa_superior",
            name="Tampa Superior",
            part_type=PartType.RECTANGULAR,
            length=200,   # 0.2 metros (altura)
            width=600,    # 0.6 metros (largura)
            quantity=4,
            priority=3
        )
    ]
    
    print(f"✓ {len(parts)} tipos de peças definidos:")
    for part in parts:
        area = part.area / 1000000  # Converter para m²
        print(f"  - {part.name}: {part.width}x{part.length}mm ({area:.3f}m²) x {part.quantity} unid. (Prioridade: {part.priority})")
    
    # 4. Executar otimização 2D
    print("\n🔄 Executando otimização 2D...")
    result = planner.optimize_2d(
        materials=materials,
        parts=parts,
        algorithm="guillotine"
    )
    
    # 5. Exibir resultados
    print("\n📊 RESULTADOS DA OTIMIZAÇÃO 2D")
    print("=" * 50)
    
    if result.success:
        print(f"✅ Otimização bem-sucedida!")
        print(f"📈 Eficiência Total: {result.efficiency:.1f}%")
        print(f"🗑️  Desperdício Total: {result.total_waste:.1f}mm²")
        print(f"📦 Materiais Utilizados: {result.materials_used}")
        print(f"⚡ Tempo de Processamento: {result.processing_time:.1f}ms")
        print(f"🧮 Algoritmo Utilizado: {result.algorithm_used}")
        
        # Detalhes por material
        print(f"\n📋 DETALHES DOS CORTES:")
        for i, material_cut in enumerate(result.cuts, 1):
            print(f"\n{i}. {material_cut.material_name}:")
            print(f"   • Eficiência: {material_cut.efficiency:.1f}%")
            print(f"   • Desperdício: {material_cut.waste:.1f}mm²")
            print(f"   • Peças cortadas: {len(material_cut.cuts)}")
            
            for j, cut_op in enumerate(material_cut.cuts, 1):
                print(f"     {j}. {cut_op.part_name}: {cut_op.width}x{cut_op.length}mm (pos: {cut_op.position_x},{cut_op.position_y}mm)")
        
        # Retalhos utilizáveis
        if result.leftovers:
            usable_leftovers = [l for l in result.leftovers if l.usable]
            if usable_leftovers:
                print(f"\n♻️  RETALHOS UTILIZÁVEIS:")
                for leftover in usable_leftovers:
                    area = leftover.area / 1000000  # Converter para m²
                    if leftover.width:
                        print(f"   • {leftover.width}x{leftover.length}mm ({area:.3f}m²) - Material: {leftover.material_id}")
                    else:
                        print(f"   • {leftover.length}mm ({area:.3f}m²) - Material: {leftover.material_id}")
        
        # Ordem de execução
        if result.execution_order:
            print(f"\n📋 ORDEM DE EXECUÇÃO:")
            for i, step in enumerate(result.execution_order, 1):
                print(f"   {i}. {step}")
        
        # Análise de custos
        total_material_cost = sum(m.cost_per_unit * m.quantity for m in materials)
        total_area = sum(m.area for m in materials)
        cost_per_m2 = total_material_cost / (total_area / 1000000) if total_area > 0 else 0
        
        print(f"\n💰 ANÁLISE DE CUSTOS:")
        print(f"   • Custo total dos materiais: R$ {total_material_cost:.2f}")
        print(f"   • Área total disponível: {total_area / 1000000:.2f}m²")
        print(f"   • Custo por m²: R$ {cost_per_m2:.2f}")
        
        # Calcular economia baseada na eficiência
        if result.efficiency > 0:
            wasted_area = result.total_waste
            wasted_cost = (wasted_area / 1000000) * cost_per_m2
            saved_cost = total_material_cost * (result.efficiency / 100)
            
            print(f"   • Custo do desperdício: R$ {wasted_cost:.2f}")
            print(f"   • Valor aproveitado: R$ {saved_cost:.2f}")
        
    else:
        print(f"❌ Falha na otimização:")
        print(f"   Erro: {result.metadata.get('error', 'Erro desconhecido')}")
    
    print("\n" + "=" * 50)
    print("🎉 Exemplo 2D concluído!")


if __name__ == "__main__":
    main() 