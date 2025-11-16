'use client';

import { useState, FormEvent } from 'react';
import { Material, Part } from '@/types';

interface FormSectionProps {
  onOptimize: (data: any) => void;
  isLoading: boolean;
}

export default function FormSection({ onOptimize, isLoading }: FormSectionProps) {
  const [optimizationType, setOptimizationType] = useState<'1d' | '2d'>('1d');
  const [kerfWidth, setKerfWidth] = useState('3.0');
  const [algorithm, setAlgorithm] = useState('best_fit');
  const [materials, setMaterials] = useState<Material[]>([
    { id: '', name: '', material_type: 'bar', length: 0, quantity: 1 },
  ]);
  const [parts, setParts] = useState<Part[]>([
    { id: '', name: '', part_type: 'linear', length: 0, quantity: 1, priority: 1 },
  ]);

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        id: '',
        name: '',
        material_type: optimizationType === '1d' ? 'bar' : 'sheet',
        length: 0,
        quantity: 1,
      },
    ]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((_, i) => i !== index));
    }
  };

  const updateMaterial = (index: number, field: keyof Material, value: any) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    setMaterials(updated);
  };

  const addPart = () => {
    setParts([
      ...parts,
      {
        id: '',
        name: '',
        part_type: optimizationType === '1d' ? 'linear' : 'rectangular',
        length: 0,
        quantity: 1,
        priority: 1,
      },
    ]);
  };

  const removePart = (index: number) => {
    if (parts.length > 1) {
      setParts(parts.filter((_, i) => i !== index));
    }
  };

  const updatePart = (index: number, field: keyof Part, value: any) => {
    const updated = [...parts];
    updated[index] = { ...updated[index], [field]: value };
    setParts(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validMaterials = materials.filter(
      (m) => m.id && m.name && m.length > 0 && m.quantity > 0
    );
    const validParts = parts.filter(
      (p) => p.id && p.name && p.length > 0 && p.quantity > 0
    );

    if (validMaterials.length === 0 || validParts.length === 0) {
      alert('Por favor, adicione pelo menos um material e uma peça.');
      return;
    }

    const formData = {
      materials: validMaterials.map((m) => ({
        id: m.id,
        name: m.name,
        material_type: optimizationType === '1d' ? 'bar' : 'sheet',
        length: m.length,
        width: optimizationType === '2d' ? (m.width || 1000) : undefined,
        quantity: m.quantity,
      })),
      parts: validParts.map((p) => ({
        id: p.id,
        name: p.name,
        part_type: optimizationType === '1d' ? 'linear' : 'rectangular',
        length: p.length,
        width: optimizationType === '2d' ? (p.width || 500) : undefined,
        quantity: p.quantity,
        priority: p.priority,
      })),
      kerf_width: parseFloat(kerfWidth),
      algorithm,
    };

    onOptimize({ ...formData, optimizationType });
  };

  return (
    <section id="form-section" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Configurar Otimização</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tipo de Otimização e Configurações */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">⚙️ Tipo de Otimização</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="optimizationType"
                    value="1d"
                    checked={optimizationType === '1d'}
                    onChange={(e) => {
                      setOptimizationType(e.target.value as '1d' | '2d');
                      setMaterials([
                        {
                          id: '',
                          name: '',
                          material_type: e.target.value === '1d' ? 'bar' : 'sheet',
                          length: 0,
                          quantity: 1,
                        },
                      ]);
                      setParts([
                        {
                          id: '',
                          name: '',
                          part_type: e.target.value === '1d' ? 'linear' : 'rectangular',
                          length: 0,
                          quantity: 1,
                          priority: 1,
                        },
                      ]);
                    }}
                    className="mt-1"
                  />
                  <div>
                    <strong>1D - Barras/Perfis</strong>
                    <p className="text-sm text-gray-600">
                      Para materiais lineares como barras de aço, perfis de alumínio
                    </p>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="optimizationType"
                    value="2d"
                    checked={optimizationType === '2d'}
                    onChange={(e) => {
                      setOptimizationType(e.target.value as '1d' | '2d');
                      setMaterials([
                        {
                          id: '',
                          name: '',
                          material_type: e.target.value === '2d' ? 'sheet' : 'bar',
                          length: 0,
                          quantity: 1,
                        },
                      ]);
                      setParts([
                        {
                          id: '',
                          name: '',
                          part_type: e.target.value === '2d' ? 'rectangular' : 'linear',
                          length: 0,
                          quantity: 1,
                          priority: 1,
                        },
                      ]);
                    }}
                    className="mt-1"
                  />
                  <div>
                    <strong>2D - Chapas/Placas</strong>
                    <p className="text-sm text-gray-600">
                      Para chapas de aço, placas de madeira, etc.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">🎛️ Configurações</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Espessura do Corte (mm)
                  </label>
                  <input
                    type="number"
                    value={kerfWidth}
                    onChange={(e) => setKerfWidth(e.target.value)}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Perda da serra durante o corte</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Algoritmo</label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="best_fit">Best Fit (Recomendado)</option>
                    <option value="first_fit">First Fit</option>
                    <option value="genetic">Algoritmo Genético</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">📦 Materiais Disponíveis</h3>
            <div className="space-y-3">
              {materials.map((material, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-3 items-center p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="ID do Material"
                    value={material.id}
                    onChange={(e) => updateMaterial(index, 'id', e.target.value)}
                    className="flex-1 min-w-[120px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Nome"
                    value={material.name}
                    onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                    className="flex-1 min-w-[120px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Comprimento (mm)"
                    value={material.length || ''}
                    onChange={(e) =>
                      updateMaterial(index, 'length', parseFloat(e.target.value) || 0)
                    }
                    className="w-40 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {optimizationType === '2d' && (
                    <input
                      type="number"
                      placeholder="Largura (mm)"
                      value={material.width || ''}
                      onChange={(e) =>
                        updateMaterial(index, 'width', parseFloat(e.target.value) || undefined)
                      }
                      className="w-40 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                  <input
                    type="number"
                    placeholder="Quantidade"
                    value={material.quantity}
                    onChange={(e) =>
                      updateMaterial(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-32 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    disabled={materials.length === 1}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addMaterial}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ➕ Adicionar Material
            </button>
          </div>

          {/* Peças */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">🧩 Peças a Cortar</h3>
            <div className="space-y-3">
              {parts.map((part, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-3 items-center p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="text"
                    placeholder="ID da Peça"
                    value={part.id}
                    onChange={(e) => updatePart(index, 'id', e.target.value)}
                    className="flex-1 min-w-[120px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Nome"
                    value={part.name}
                    onChange={(e) => updatePart(index, 'name', e.target.value)}
                    className="flex-1 min-w-[120px] px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Comprimento (mm)"
                    value={part.length || ''}
                    onChange={(e) =>
                      updatePart(index, 'length', parseFloat(e.target.value) || 0)
                    }
                    className="w-40 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {optimizationType === '2d' && (
                    <input
                      type="number"
                      placeholder="Largura (mm)"
                      value={part.width || ''}
                      onChange={(e) =>
                        updatePart(index, 'width', parseFloat(e.target.value) || undefined)
                      }
                      className="w-40 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  )}
                  <input
                    type="number"
                    placeholder="Quantidade"
                    value={part.quantity}
                    onChange={(e) =>
                      updatePart(index, 'quantity', parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-32 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={part.priority}
                    onChange={(e) => updatePart(index, 'priority', parseInt(e.target.value))}
                    className="w-32 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="1">Prioridade 1</option>
                    <option value="2">Prioridade 2</option>
                    <option value="3">Prioridade 3</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    disabled={parts.length === 1}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addPart}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ➕ Adicionar Peça
            </button>
          </div>

          {/* Botão de Otimização */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-primary-500 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Processando...
                </>
              ) : (
                '✨ Executar Otimização'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

