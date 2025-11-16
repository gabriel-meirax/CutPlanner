import { render, screen } from '@testing-library/react'
import FeaturesSection from '@/components/FeaturesSection'

describe('FeaturesSection', () => {
  it('renders the section title', () => {
    render(<FeaturesSection />)
    expect(screen.getByText(/Funcionalidades Principais/i)).toBeInTheDocument()
  })

  it('renders all three features', () => {
    render(<FeaturesSection />)
    expect(screen.getByText(/Otimização 1D/i)).toBeInTheDocument()
    expect(screen.getByText(/Otimização 2D/i)).toBeInTheDocument()
    expect(screen.getByText(/Relatórios Detalhados/i)).toBeInTheDocument()
  })

  it('renders feature descriptions', () => {
    render(<FeaturesSection />)
    expect(screen.getByText(/Para barras, perfis e materiais lineares/i)).toBeInTheDocument()
    expect(screen.getByText(/Para chapas e placas/i)).toBeInTheDocument()
    expect(screen.getByText(/Análises completas/i)).toBeInTheDocument()
  })
})
