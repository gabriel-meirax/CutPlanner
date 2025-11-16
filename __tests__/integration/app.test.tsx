import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Mock fetch for API calls
global.fetch = jest.fn()

describe('Home Page Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all main sections', () => {
    render(<Home />)
    
    expect(screen.getAllByText(/CutPlanner/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Funcionalidades Principais/i)).toBeInTheDocument()
    expect(screen.getByText(/Configurar Otimização/i)).toBeInTheDocument()
  })

  it('handles optimization flow', async () => {
    const mockResult = {
      success: true,
      efficiency: 95.5,
      total_waste: 150.0,
      materials_used: 3,
      processing_time: 125.5,
      cuts: [
        {
          material_id: 'mat1',
          material_name: 'Material 1',
          cuts: [],
          waste: 50.0,
          efficiency: 90.0,
        },
      ],
      leftovers: [],
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResult,
    })

    render(<Home />)

    // Wait for components to render
    await waitFor(() => {
      expect(screen.getByText(/Configurar Otimização/i)).toBeInTheDocument()
    })
  })
})
