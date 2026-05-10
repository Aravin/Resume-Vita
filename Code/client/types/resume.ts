export interface AtsScore {
  overall: number;
  details: {
    keywords: number;
    format: number;
    content: number;
  };
  improvements: {
    keywords: string[];
    format: string[];
    content: string[];
  };
}