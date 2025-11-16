import { render, screen } from '@testing-library/react'
import ResultsSection from '@/components/ResultsSection'
import { OptimizationResult } from '@/types'

const mockResult: OptimizationResult = {
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
  execution_order: ['Cortar Material 1', 'Cortar Part 1'],
}

const mockOnReset = jest.fn()

describe('ResultsSection', () => {
  beforeEach(() => {
    mockOnReset.mockClear()
  })

  it('renders results title', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/Resultados da Otimização/i)).toBeInTheDocument()
  })

  it('displays efficiency metric', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/95.5%/i)).toBeInTheDocument()
  })

  it('displays waste metric', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/150.0 mm/i)).toBeInTheDocument()
  })

  it('displays materials used', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/3/i)).toBeInTheDocument()
  })

  it('displays processing time', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/125.5 ms/i)).toBeInTheDocument()
  })

  it('displays cut details', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getAllByText(/Material 1/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Part 1/i).length).toBeGreaterThan(0)
  })

  it('displays leftovers', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/Retalhos Utilizáveis/i)).toBeInTheDocument()
  })

  it('displays execution order', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/Ordem de Execução/i)).toBeInTheDocument()
    expect(screen.getByText(/Cortar Material 1/i)).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<ResultsSection result={mockResult} onReset={mockOnReset} />)
    expect(screen.getByText(/Baixar Relatório/i)).toBeInTheDocument()
    expect(screen.getByText(/Nova Otimização/i)).toBeInTheDocument()
  })

  it('handles empty result gracefully', () => {
    const emptyResult: OptimizationResult = {
      success: false,
      efficiency: 0,
      total_waste: 0,
      materials_used: 0,
      processing_time: 0,
      cuts: [],
      leftovers: [],
    }
    render(<ResultsSection result={emptyResult} onReset={mockOnReset} />)
    expect(screen.getByText(/0%/i)).toBeInTheDocument()
  })
})
