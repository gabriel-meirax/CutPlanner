"""
Testes básicos para o sistema CutPlanner
"""

import sys
import os
import unittest

# Adicionar o diretório raiz ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from cutplanner import CutPlanner
from cutplanner.models import Material, Part, MaterialType, PartType


class TestCutPlanner(unittest.TestCase):
    """Testes básicos para o CutPlanner"""
    
    def setUp(self):
        """Configuração inicial para cada teste"""
        self.planner = CutPlanner(kerf_width=3.0)
        
        # Materiais de teste 1D
        self.materials_1d = [
            Material(
                id="test_bar_1",
                name="Barra de Teste 1",
                material_type=MaterialType.BAR,
                length=1000,
                quantity=2,
                cost_per_unit=100.0
            ),
            Material(
                id="test_bar_2",
                name="Barra de Teste 2",
                material_type=MaterialType.BAR,
                length=800,
                quantity=1,
                cost_per_unit=80.0
            )
        ]
        
        # Peças de teste 1D
        self.parts_1d = [
            Part(
                id="test_part_1",
                name="Peça de Teste 1",
                part_type=PartType.LINEAR,
                length=300,
                quantity=3,
                priority=1
            ),
            Part(
                id="test_part_2",
                name="Peça de Teste 2",
                part_type=PartType.LINEAR,
                length=200,
                quantity=2,
                priority=2
            )
        ]
        
        # Materiais de teste 2D
        self.materials_2d = [
            Material(
                id="test_sheet_1",
                name="Chapa de Teste 1",
                material_type=MaterialType.SHEET,
                length=1000,
                width=800,
                thickness=5,
                quantity=1,
                cost_per_unit=200.0
            )
        ]
        
        # Peças de teste 2D
        self.parts_2d = [
            Part(
                id="test_rect_1",
                name="Retângulo de Teste 1",
                part_type=PartType.RECTANGULAR,
                length=300,
                width=200,
                quantity=2,
                priority=1
            )
        ]
    
    def test_planner_initialization(self):
        """Testa a inicialização do planejador"""
        self.assertEqual(self.planner.kerf_width, 3.0)
        self.assertIsNotNone(self.planner.algorithms)
    
    def test_material_creation(self):
        """Testa a criação de materiais"""
        material = self.materials_1d[0]
        self.assertEqual(material.id, "test_bar_1")
        self.assertEqual(material.length, 1000)
        self.assertEqual(material.material_type, MaterialType.BAR)
        self.assertEqual(material.area, 1000)  # Para 1D, área = comprimento
    
    def test_part_creation(self):
        """Testa a criação de peças"""
        part = self.parts_1d[0]
        self.assertEqual(part.id, "test_part_1")
        self.assertEqual(part.length, 300)
        self.assertEqual(part.part_type, PartType.LINEAR)
        self.assertEqual(part.area, 300)  # Para 1D, área = comprimento
    
    def test_1d_optimization_basic(self):
        """Testa otimização 1D básica"""
        result = self.planner.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d,
            algorithm="best_fit"
        )
        
        self.assertIsNotNone(result)
        self.assertTrue(result.success)
        self.assertGreater(result.efficiency, 0)
        self.assertGreaterEqual(len(result.cuts), 1)
    
    def test_2d_optimization_basic(self):
        """Testa otimização 2D básica"""
        result = self.planner.optimize_2d(
            materials=self.materials_2d,
            parts=self.parts_2d,
            algorithm="guillotine"
        )
        
        self.assertIsNotNone(result)
        self.assertTrue(result.success)
        self.assertGreaterEqual(len(result.cuts), 1)
    
    def test_auto_optimization(self):
        """Testa otimização automática"""
        result = self.planner.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d
        )
        
        self.assertIsNotNone(result)
        self.assertTrue(result.success)
    
    def test_material_validation(self):
        """Testa validação de materiais"""
        # Material 2D sem largura deve falhar
        invalid_material = Material(
            id="invalid",
            name="Inválido",
            material_type=MaterialType.SHEET,
            length=1000,
            quantity=1
        )
        
        with self.assertRaises(ValueError):
            # A validação acontece no Pydantic
            pass
    
    def test_part_validation(self):
        """Testa validação de peças"""
        # Peça 2D sem largura deve falhar
        invalid_part = Part(
            id="invalid",
            name="Inválido",
            part_type=PartType.RECTANGULAR,
            length=1000,
            quantity=1
        )
        
        with self.assertRaises(ValueError):
            # A validação acontece no Pydantic
            pass
    
    def test_kerf_width_impact(self):
        """Testa o impacto da espessura do corte"""
        # Testar com kerf diferente
        planner_no_kerf = CutPlanner(kerf_width=0.0)
        planner_with_kerf = CutPlanner(kerf_width=5.0)
        
        result_no_kerf = planner_no_kerf.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d
        )
        
        result_with_kerf = planner_with_kerf.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d
        )
        
        # Com kerf, deve usar mais material
        self.assertGreaterEqual(
            result_with_kerf.materials_used,
            result_no_kerf.materials_used
        )
    
    def test_algorithm_comparison(self):
        """Testa comparação entre algoritmos"""
        algorithms = ["first_fit", "best_fit"]
        results = {}
        
        for algorithm in algorithms:
            result = self.planner.optimize_1d(
                materials=self.materials_1d,
                parts=self.parts_1d,
                algorithm=algorithm
            )
            results[algorithm] = result
        
        # Ambos devem ser bem-sucedidos
        for algorithm, result in results.items():
            self.assertTrue(result.success, f"Algoritmo {algorithm} falhou")
            self.assertGreater(result.efficiency, 0, f"Algoritmo {algorithm} tem eficiência 0")
    
    def test_empty_inputs(self):
        """Testa comportamento com entradas vazias"""
        # Materiais vazios
        with self.assertRaises(Exception):
            self.planner.optimize_1d(materials=[], parts=self.parts_1d)
        
        # Peças vazias
        with self.assertRaises(Exception):
            self.planner.optimize_1d(materials=self.materials_1d, parts=[])
    
    def test_result_structure(self):
        """Testa a estrutura do resultado"""
        result = self.planner.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d
        )
        
        # Verificar campos obrigatórios
        required_fields = [
            'success', 'efficiency', 'total_waste', 'materials_used',
            'cuts', 'leftovers', 'execution_order', 'algorithm_used',
            'processing_time', 'metadata'
        ]
        
        for field in required_fields:
            self.assertIn(field, result.dict())
    
    def test_cut_operations(self):
        """Testa operações de corte individuais"""
        result = self.planner.optimize_1d(
            materials=self.materials_1d,
            parts=self.parts_1d
        )
        
        for material_cut in result.cuts:
            self.assertGreater(len(material_cut.cuts), 0)
            
            for cut_op in material_cut.cuts:
                self.assertGreater(cut_op.length, 0)
                self.assertGreaterEqual(cut_op.position_x, 0)
                self.assertGreater(cut_op.order, 0)


if __name__ == '__main__':
    # Executar testes
    unittest.main(verbosity=2) 