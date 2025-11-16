// Mock for next/server
export const NextRequest = class NextRequest {
  constructor(url, init) {
    this.url = url
    this.init = init
  }
  
  async json() {
    return JSON.parse(this.init?.body || '{}')
  }
}

export const NextResponse = {
  json: (data, init) => ({
    json: async () => data,
    status: init?.status || 200,
  }),
}

