import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const body = await request.json();
    const { type } = params;

    // Remover optimizationType do body antes de enviar para o backend Python
    const { optimizationType, ...requestBody } = body;

    // Fazer requisição para o backend Python
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const response = await fetch(`${pythonApiUrl}/optimize/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        detail: `Erro do servidor: ${response.status}`,
      }));
      return NextResponse.json(
        { detail: errorData.detail || 'Erro desconhecido' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Erro na API route:', error);
    return NextResponse.json(
      { detail: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

