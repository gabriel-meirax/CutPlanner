import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/2024 CutPlanner/i)).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<Footer />)
    expect(screen.getByText(/Sistema de Otimização de Cortes/i)).toBeInTheDocument()
  })
})
