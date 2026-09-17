export interface FoodAnalysis {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  productName: string;
  good: string[];
  bad: string[];
  summary?: string;
}
