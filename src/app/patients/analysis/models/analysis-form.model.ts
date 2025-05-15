export interface AnalysisResult {
  parameter: string;
  value?: string;
  unit?: string;
  referenceRange?: string;
  isAbnormal?: boolean;
}

export interface AnalysisForm {
  type: string;
  date: string;
  laboratory: string;
  requestedBy: string;
  status: 'pending' | 'completed' | 'cancelled';
  comments?: string;
  results?: AnalysisResult[];
}
