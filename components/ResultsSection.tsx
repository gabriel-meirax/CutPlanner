'use client';

import { OptimizationResult } from '@/types';

interface ResultsSectionProps {
  result: OptimizationResult;
  onReset: () => void;
}

export default function ResultsSection({ result, onReset }: ResultsSectionProps) {
  if (!result) return null;

  const downloadReport = async () => {
    try {
      const response = await fetch('/api/report/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar relatório');
      }

      const reportData = await response.json();
      if (reportData.results?.html) {
        const blob = new Blob([reportData.results.html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_cutplanner.html';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error: any) {
      console.error('Erro ao gerar relatório:', error);
      alert('Erro ao gerar relatório: ' + error.message);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Resultados da Otimização</h2>

        {/* Resumo */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">
              {result.efficiency?.toFixed(1) || 0}%
            </h3>
            <p className="text-gray-600">Eficiência</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-600 mb-2">
              {result.total_waste?.toFixed(1) || 0} mm
            </h3>
            <p className="text-gray-600">Desperdício</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-green-600 mb-2">
              {result.materials_used || 0}
            </h3>
            <p className="text-gray-600">Materiais</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <h3 className="text-3xl font-bold text-purple-600 mb-2">
              {result.processing_time?.toFixed(1) || 0} ms
            </h3>
            <p className="text-gray-600">Tempo</p>
          </div>
        </div>

        {/* Detalhes dos Cortes */}
        {result.cuts && result.cuts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-4">✂️ Detalhes dos Cortes</h3>
            <div className="space-y-4">
              {result.cuts.map((materialCut, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">
                    {materialCut.material_name}
                  </h4>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                      Eficiência: {materialCut.efficiency?.toFixed(1) || 0}%
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">
                      Desperdício: {materialCut.waste?.toFixed(1) || 0}mm
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      Peças: {materialCut.cuts?.length || 0}
                    </span>
                  </div>
                  <div>
                    <strong>Peças cortadas:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {materialCut.cuts?.map((cut, cutIndex) => (
                        <li key={cutIndex}>
                          {cut.part_name} - {cut.length}mm (pos: {cut.position_x || cut.position || 0}mm)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Retalhos */}
        {result.leftovers && result.leftovers.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-4">♻️ Retalhos Utilizáveis</h3>
            <div className="bg-green-50 rounded-lg p-4">
              {result.leftovers.filter((l) => l.usable).length > 0 ? (
                <ul className="space-y-2">
                  {result.leftovers
                    .filter((l) => l.usable)
                    .map((leftover, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>→</span>
                        <span>
                          {leftover.length?.toFixed(1) || 0}mm (Material:{' '}
                          {leftover.material_id || 'N/A'})
                        </span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-600">Nenhum retalho utilizável encontrado.</p>
              )}
            </div>
          </div>
        )}

        {/* Ordem de Execução */}
        {result.execution_order && result.execution_order.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-2xl font-semibold mb-4">📋 Ordem de Execução</h3>
            <ol className="list-decimal list-inside space-y-2">
              {result.execution_order.map((step, index) => (
                <li key={index} className="p-2 bg-gray-50 rounded">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Ações */}
        <div className="text-center space-x-4">
          <button
            onClick={downloadReport}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            📥 Baixar Relatório
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 Nova Otimização
          </button>
        </div>
      </div>
    </section>
  );
}

