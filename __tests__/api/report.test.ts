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

import { POST } from '@/app/api/report/generate/route'

// Mock fetch
global.fetch = jest.fn()

describe('/api/report/generate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.PYTHON_API_URL = 'http://localhost:8000'
  })

  it('forwards report request to Python backend', async () => {
    const mockResponse = {
      formats_generated: ['html'],
      results: {
        html: '<html>Report content</html>',
      },
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const request = new Request('http://localhost:3000/api/report/generate', {
      method: 'POST',
      body: JSON.stringify({
        success: true,
        efficiency: 95.5,
        cuts: [],
        leftovers: [],
      }),
    }) as any

    const response = await POST(request)
    const data = await response.json()

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/report/generate?format=html',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    )
    expect(data).toEqual(mockResponse)
  })

  it('handles backend errors', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ detail: 'Error generating report' }),
    })

    const request = new Request('http://localhost:3000/api/report/generate', {
      method: 'POST',
      body: JSON.stringify({}),
    }) as any

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.detail).toBe('Error generating report')
  })
})
