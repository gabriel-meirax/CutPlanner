// Mock Next.js server modules before importing
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    constructor(public url: string, public init?: any) {}
    async json() {
      return JSON.parse(this.init?.body || '{}')
    }
  },
  NextResponse: {
    json: (data: any, init?: any) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}))

import { POST } from '@/app/api/optimize/[type]/route'

// Mock fetch
global.fetch = jest.fn()

describe('/api/optimize/[type]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.PYTHON_API_URL = 'http://localhost:8000'
  })

  it('forwards request to Python backend', async () => {
    const mockResponse = {
      success: true,
      efficiency: 95.5,
      total_waste: 150.0,
      materials_used: 3,
      processing_time: 125.5,
      cuts: [],
      leftovers: [],
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const request = new Request('http://localhost:3000/api/optimize/1d', {
      method: 'POST',
      body: JSON.stringify({
        materials: [{ id: 'mat1', name: 'Material 1', length: 1000, quantity: 1 }],
        parts: [{ id: 'part1', name: 'Part 1', length: 500, quantity: 1, priority: 1 }],
        kerf_width: 3.0,
        algorithm: 'best_fit',
      }),
    }) as any

    const response = await POST(request, { params: { type: '1d' } })
    const data = await response.json()

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/optimize/1d',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )
    expect(data).toEqual(mockResponse)
  })

  it('handles Python backend errors', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ detail: 'Internal server error' }),
    })

    const request = new Request('http://localhost:3000/api/optimize/1d', {
      method: 'POST',
      body: JSON.stringify({
        materials: [],
        parts: [],
        kerf_width: 3.0,
        algorithm: 'best_fit',
      }),
    }) as any

    const response = await POST(request, { params: { type: '1d' } })
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.detail).toBe('Internal server error')
  })

  it('removes optimizationType from request body', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    const request = new Request('http://localhost:3000/api/optimize/2d', {
      method: 'POST',
      body: JSON.stringify({
        optimizationType: '2d',
        materials: [],
        parts: [],
        kerf_width: 3.0,
        algorithm: 'best_fit',
      }),
    }) as any

    await POST(request, { params: { type: '2d' } })

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0]
    const requestBody = JSON.parse(fetchCall[1].body)

    expect(requestBody.optimizationType).toBeUndefined()
    expect(requestBody.materials).toBeDefined()
  })
})
