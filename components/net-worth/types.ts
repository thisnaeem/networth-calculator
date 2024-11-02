export interface Item {
  id: number;
  category: string;
  name: string;
  value: string;
}

export interface OverviewTabProps {
  assets: Item[];
  liabilities: Item[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  formatCurrency: (value: number | string) => string;
  validAssets: Item[];
  validLiabilities: Item[];
}

export interface CalculatorTabProps {
  assets: Item[];
  liabilities: Item[];
  addItem: (type: 'asset' | 'liability') => void;
  removeItem: (id: number, type: 'asset' | 'liability') => void;
  handleChange: (id: number, field: 'name' | 'value', value: string, type: 'asset' | 'liability') => void;
  handleCategoryChange: (id: number, type: 'asset' | 'liability', category: string) => void;
}