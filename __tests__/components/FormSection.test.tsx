import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormSection from '@/components/FormSection'

const mockOnOptimize = jest.fn()

describe('FormSection', () => {
  beforeEach(() => {
    mockOnOptimize.mockClear()
  })

  it('renders the form title', () => {
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    expect(screen.getByText(/Configurar Otimização/i)).toBeInTheDocument()
  })

  it('renders optimization type options', () => {
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    expect(screen.getByText(/1D - Barras\/Perfis/i)).toBeInTheDocument()
    expect(screen.getByText(/2D - Chapas\/Placas/i)).toBeInTheDocument()
  })

  it('renders configuration inputs', () => {
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    expect(screen.getByText(/Espessura do Corte/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Algoritmo/i).length).toBeGreaterThan(0)
  })

  it('allows adding materials', async () => {
    const user = userEvent.setup()
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    
    const addButton = screen.getByText(/Adicionar Material/i)
    await user.click(addButton)
    
    const materialInputs = screen.getAllByPlaceholderText(/ID do Material/i)
    expect(materialInputs.length).toBeGreaterThan(1)
  })

  it('allows adding parts', async () => {
    const user = userEvent.setup()
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    
    const addButton = screen.getByText(/Adicionar Peça/i)
    await user.click(addButton)
    
    const partInputs = screen.getAllByPlaceholderText(/ID da Peça/i)
    expect(partInputs.length).toBeGreaterThan(1)
  })

  it('validates form before submission', async () => {
    const user = userEvent.setup()
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    
    const submitButton = screen.getByText(/Executar Otimização/i)
    await user.click(submitButton)
    
    // Should show alert for empty form
    await waitFor(() => {
      expect(mockOnOptimize).not.toHaveBeenCalled()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<FormSection onOptimize={mockOnOptimize} isLoading={false} />)
    
    // Fill material
    const materialIdInput = screen.getByPlaceholderText(/ID do Material/i)
    const materialNameInputs = screen.getAllByPlaceholderText(/Nome/i)
    const materialNameInput = materialNameInputs[0] // First one is for material
    const materialLengthInput = screen.getAllByPlaceholderText(/Comprimento \(mm\)/i)[0]
    
    await user.type(materialIdInput, 'mat1')
    await user.type(materialNameInput, 'Material 1')
    await user.type(materialLengthInput, '1000')
    
    // Fill part
    const partIdInput = screen.getByPlaceholderText(/ID da Peça/i)
    const partNameInput = materialNameInputs[1] // Second one is for part
    const partLengthInput = screen.getAllByPlaceholderText(/Comprimento \(mm\)/i)[1]
    
    await user.type(partIdInput, 'part1')
    await user.type(partNameInput, 'Part 1')
    await user.type(partLengthInput, '500')
    
    // Submit
    const submitButton = screen.getByText(/Executar Otimização/i)
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnOptimize).toHaveBeenCalled()
    })
  })

  it('shows loading state', () => {
    render(<FormSection onOptimize={mockOnOptimize} isLoading={true} />)
    expect(screen.getByText(/Processando/i)).toBeInTheDocument()
    const submitButton = screen.getByText(/Processando/i)
    expect(submitButton).toBeDisabled()
  })
})
