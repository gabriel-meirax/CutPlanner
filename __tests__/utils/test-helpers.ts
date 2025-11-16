// Test helper functions - not a test file
export {}

import { OptimizationResult, Material, Part } from '@/types'

export const createMockMaterial = (overrides?: Partial<Material>): Material => ({
  id: 'mat1',
  name: 'Material 1',
  material_type: 'bar',
  length: 1000,
  quantity: 1,
  ...overrides,
})

export const createMockPart = (overrides?: Partial<Part>): Part => ({
  id: 'part1',
  name: 'Part 1',
  part_type: 'linear',
  length: 500,
  quantity: 1,
  priority: 1,
  ...overrides,
})

export const createMockOptimizationResult = (
  overrides?: Partial<OptimizationResult>
): OptimizationResult => ({
  success: true,
  efficiency: 95.5,
  total_waste: 150.0,
  materials_used: 3,
  processing_time: 125.5,
  cuts: [
    {
      material_id: 'mat1',
      material_name: 'Material 1',
      cuts: [
        {
          part_id: 'part1',
          part_name: 'Part 1',
          length: 500,
          position_x: 0,
        },
      ],
      waste: 50.0,
      efficiency: 90.0,
    },
  ],
  leftovers: [
    {
      material_id: 'mat1',
      length: 50.0,
      usable: true,
    },
  ],
  execution_order: ['Step 1', 'Step 2'],
  ...overrides,
})
