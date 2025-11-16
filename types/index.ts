export interface Material {
  id: string;
  name: string;
  material_type: 'bar' | 'profile' | 'sheet';
  length: number;
  width?: number;
  quantity: number;
  cost_per_unit?: number;
}

export interface Part {
  id: string;
  name: string;
  part_type: 'linear' | 'rectangular';
  length: number;
  width?: number;
  quantity: number;
  priority: number;
}

export interface CutOperation {
  part_id: string;
  part_name: string;
  length: number;
  position_x: number;
  position_y?: number;
}

export interface MaterialCut {
  material_id: string;
  material_name: string;
  cuts: CutOperation[];
  waste: number;
  efficiency: number;
}

export interface Leftover {
  material_id: string;
  length: number;
  width?: number;
  usable: boolean;
}

export interface OptimizationResult {
  success: boolean;
  efficiency: number;
  total_waste: number;
  materials_used: number;
  processing_time: number;
  cuts: MaterialCut[];
  leftovers: Leftover[];
  execution_order?: string[];
  metadata?: Record<string, any>;
}

export interface OptimizationRequest {
  materials: Material[];
  parts: Part[];
  kerf_width: number;
  algorithm: string;
}

