import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  DollarSign,
  Trash2,
  Building2,
  Car,
  PiggyBank,
  CreditCard,
  Home,
  Banknote,
  Landmark,
  Plane,
  Smartphone,
  Watch,
  GraduationCap,
  Bitcoin,
  ShoppingBag
} from 'lucide-react';
import { CalculatorTabProps } from './types';

const ASSET_CATEGORIES = [
  { value: 'cash', label: 'Cash & Savings', icon: Banknote, color: 'text-green-600' },
  { value: 'investments', label: 'Investments', icon: Bitcoin, color: 'text-blue-600' },
  { value: 'real-estate', label: 'Real Estate', icon: Home, color: 'text-amber-600' },
  { value: 'vehicles', label: 'Vehicles', icon: Car, color: 'text-purple-600' },
  { value: 'collectibles', label: 'Collectibles', icon: Watch, color: 'text-rose-600' },
  { value: 'electronics', label: 'Electronics', icon: Smartphone, color: 'text-gray-600' },
  { value: 'travel-rewards', label: 'Travel Rewards', icon: Plane, color: 'text-sky-600' },
  { value: 'education', label: 'Education', icon: GraduationCap, color: 'text-indigo-600' },
  { value: 'other', label: 'Other Assets', icon: ShoppingBag, color: 'text-teal-600' },
];

const LIABILITY_CATEGORIES = [
  { value: 'mortgage', label: 'Mortgage', icon: Building2, color: 'text-red-600' },
  { value: 'loans', label: 'Loans', icon: Landmark, color: 'text-orange-600' },
  { value: 'credit-cards', label: 'Credit Cards', icon: CreditCard, color: 'text-rose-600' },
  { value: 'student-loans', label: 'Student Loans', icon: GraduationCap, color: 'text-purple-600' },
  { value: 'personal-debt', label: 'Personal Debt', icon: PiggyBank, color: 'text-pink-600' },
  { value: 'other', label: 'Other Debts', icon: ShoppingBag, color: 'text-red-400' },
];

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  assets,
  liabilities,
  addItem,
  removeItem,
  handleChange,
  handleCategoryChange,
}) => {
  // Function to format value as currency while typing
  const formatCurrencyInput = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    return numericValue;
  };

  const getCategoryDetails = (category: string, type: 'asset' | 'liability') => {
    const categories = type === 'asset' ? ASSET_CATEGORIES : LIABILITY_CATEGORIES;
    return categories.find(cat => cat.value === category) || categories[categories.length - 1];
  };

  return (
    <div className="space-y-8">
      {/* Quick Add Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quick Add Asset</h3>
                <p className="text-sm text-gray-600">Add common assets quickly</p>
              </div>
              <Button 
                onClick={() => addItem('asset')}
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quick Add Liability</h3>
                <p className="text-sm text-gray-600">Add common liabilities quickly</p>
              </div>
              <Button 
                onClick={() => addItem('liability')}
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Section */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
            <p className="text-sm text-gray-600 mt-1">Track what you own</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => addItem('asset')}
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {assets.map((asset) => {
            const categoryDetails = getCategoryDetails(asset.category, 'asset');
            const Icon = categoryDetails.icon;
            
            return (
              <div
                key={asset.id}
                className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Select
                  value={asset.category}
                  onValueChange={(value) => handleCategoryChange(asset.id, 'asset', value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px] border-gray-200">
                    <SelectValue placeholder="Select Category">
                      {asset.category && (
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${categoryDetails.color}`} />
                          <span>{categoryDetails.label}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_CATEGORIES.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="focus:bg-emerald-50"
                        >
                          <div className="flex items-center gap-2">
                            <CategoryIcon className={`w-4 h-4 ${category.color}`} />
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <div className="flex-1 space-y-1">
                  <Label htmlFor={`asset-name-${asset.id}`} className="sr-only">Asset Name</Label>
                  <Input
                    id={`asset-name-${asset.id}`}
                    placeholder="Asset name"
                    value={asset.name}
                    onChange={(e) => handleChange(asset.id, 'name', e.target.value, 'asset')}
                    className="border-gray-200 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="relative w-full sm:w-auto">
                  <Label htmlFor={`asset-value-${asset.id}`} className="sr-only">Value</Label>
                  <DollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id={`asset-value-${asset.id}`}
                    placeholder="0.00"
                    type="text"
                    value={asset.value}
                    onChange={(e) => handleChange(asset.id, 'value', formatCurrencyInput(e.target.value), 'asset')}
                    className="pl-8 w-full sm:w-36 border-gray-200 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(asset.id, 'asset')}
                  className="absolute right-2 top-2 sm:relative sm:right-0 sm:top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </Button>
              </div>
            );
          })}
          
          {assets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No assets added yet. Add your first asset to get started!</p>
            </div>
          )}
        </div>
      </div>

      {/* Liabilities Section */}
      <div className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Liabilities</h2>
            <p className="text-sm text-gray-600 mt-1">Track what you owe</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => addItem('liability')}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Liability
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {liabilities.map((liability) => {
            const categoryDetails = getCategoryDetails(liability.category, 'liability');
            const Icon = categoryDetails.icon;
            
            return (
              <div
                key={liability.id}
                className="group relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Select
                  value={liability.category}
                  onValueChange={(value) => handleCategoryChange(liability.id, 'liability', value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px] border-gray-200">
                    <SelectValue placeholder="Select Category">
                      {liability.category && (
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${categoryDetails.color}`} />
                          <span>{categoryDetails.label}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {LIABILITY_CATEGORIES.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="focus:bg-red-50"
                        >
                          <div className="flex items-center gap-2">
                            <CategoryIcon className={`w-4 h-4 ${category.color}`} />
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <div className="flex-1 space-y-1">
                  <Label htmlFor={`liability-name-${liability.id}`} className="sr-only">Liability Name</Label>
                  <Input
                    id={`liability-name-${liability.id}`}
                    placeholder="Liability name"
                    value={liability.name}
                    onChange={(e) => handleChange(liability.id, 'name', e.target.value, 'liability')}
                    className="border-gray-200 focus:ring-red-500"
                  />
                </div>
                
                <div className="relative w-full sm:w-auto">
                  <Label htmlFor={`liability-value-${liability.id}`} className="sr-only">Value</Label>
                  <DollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    id={`liability-value-${liability.id}`}
                    placeholder="0.00"
                    type="text"
                    value={liability.value}
                    onChange={(e) => handleChange(liability.id, 'value', formatCurrencyInput(e.target.value), 'liability')}
                    className="pl-8 w-full sm:w-36 border-gray-200 focus:ring-red-500"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(liability.id, 'liability')}
                  className="absolute right-2 top-2 sm:relative sm:right-0 sm:top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </Button>
              </div>
            );
          })}
          
          {liabilities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No liabilities added yet. Add your first liability to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper components for better organization



export default CalculatorTab;