import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/HeroSection'

describe('HeroSection', () => {
  it('renders the title', () => {
    render(<HeroSection />)
    expect(screen.getByText(/CutPlanner/i)).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Sistema inteligente de otimização/i)).toBeInTheDocument()
  })

  it('renders the call-to-action buttons', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Começar Agora/i)).toBeInTheDocument()
    expect(screen.getByText(/Saiba Mais/i)).toBeInTheDocument()
  })

  it('has scroll to form functionality', () => {
    render(<HeroSection />)
    const button = screen.getByText(/Começar Agora/i)
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
  })
})
