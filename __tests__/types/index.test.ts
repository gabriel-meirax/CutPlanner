import type { Material, Part, OptimizationResult } from '@/types'

describe('Type Definitions', () => {
  describe('Material', () => {
    it('has required fields', () => {
      const material: Material = {
        id: 'mat1',
        name: 'Material 1',
        material_type: 'bar',
        length: 1000,
        quantity: 1,
      }

      expect(material.id).toBe('mat1')
      expect(material.name).toBe('Material 1')
      expect(material.material_type).toBe('bar')
      expect(material.length).toBe(1000)
      expect(material.quantity).toBe(1)
    })

    it('supports optional width for 2D materials', () => {
      const material: Material = {
        id: 'mat2',
        name: 'Material 2',
        material_type: 'sheet',
        length: 2000,
        width: 1000,
        quantity: 1,
      }

      expect(material.width).toBe(1000)
    })
  })

  describe('Part', () => {
    it('has required fields', () => {
      const part: Part = {
        id: 'part1',
        name: 'Part 1',
        part_type: 'linear',
        length: 500,
        quantity: 2,
        priority: 1,
      }

      expect(part.id).toBe('part1')
      expect(part.name).toBe('Part 1')
      expect(part.part_type).toBe('linear')
      expect(part.length).toBe(500)
      expect(part.quantity).toBe(2)
      expect(part.priority).toBe(1)
    })
  })

  describe('OptimizationResult', () => {
    it('has required fields', () => {
      const result: OptimizationResult = {
        success: true,
        efficiency: 95.5,
        total_waste: 150.0,
        materials_used: 3,
        processing_time: 125.5,
        cuts: [],
        leftovers: [],
      }

      expect(result.success).toBe(true)
      expect(result.efficiency).toBe(95.5)
      expect(result.total_waste).toBe(150.0)
      expect(result.materials_used).toBe(3)
      expect(result.processing_time).toBe(125.5)
      expect(result.cuts).toEqual([])
      expect(result.leftovers).toEqual([])
    })
  })
})
