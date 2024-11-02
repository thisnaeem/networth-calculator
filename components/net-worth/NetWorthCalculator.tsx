import React, { useState, } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  DollarSign,
  Trash2,
  TrendingUp,
  Wallet,
  CreditCard,
  PieChart,
  Calculator,
} from "lucide-react";



interface Item {
  id: number;
  category: string;
  name: string;
  value: string;
}


const NetWorthCalculator = () => {
  const [assets, setAssets] = useState<Item[]>([
    { id: 1, category: "Cash and Investments", name: "", value: "" },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
    { id: 1, category: "Debts", name: "", value: "" },
  ]);

  const formatCurrency = (value: number | string): string => {
    if (!value) return "$0";
    const num = parseFloat(value.toString().replace(/[^\d.-]/g, ""));
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const calculateTotal = (items: Item[]): number => {
    return items.reduce((sum, item) => {
      const value =
        parseFloat(item.value.toString().replace(/[^\d.-]/g, "")) || 0;
      return sum + value;
    }, 0);
  };

  const addItem = (type: "asset" | "liability") => {
    if (type === "asset") {
      setAssets([
        ...assets,
        {
          id: assets.length + 1,
          category: "Cash and Investments",
          name: "",
          value: "",
        },
      ]);
    } else {
      setLiabilities([
        ...liabilities,
        { id: liabilities.length + 1, category: "Debts", name: "", value: "" },
      ]);
    }
  };

  const removeItem = (id: number, type: "asset" | "liability") => {
    if (type === "asset") {
      setAssets(assets.filter((asset) => asset.id !== id));
    } else {
      setLiabilities(liabilities.filter((liability) => liability.id !== id));
    }
  };

  const handleChange = (
    id: number,
    field: "name" | "value",
    value: string,
    type: "asset" | "liability"
  ) => {
    if (type === "asset") {
      setAssets(
        assets.map((asset) =>
          asset.id === id ? { ...asset, [field]: value } : asset
        )
      );
    } else {
      setLiabilities(
        liabilities.map((liability) =>
          liability.id === id ? { ...liability, [field]: value } : liability
        )
      );
    }
  };

  const totalAssets = calculateTotal(assets);
  const totalLiabilities = calculateTotal(liabilities);
  const netWorth = totalAssets - totalLiabilities;

  const validAssets = assets.filter((asset) => asset.name && asset.value);
  const validLiabilities = liabilities.filter(
    (liability) => liability.name && liability.value
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Track Your Wealth
          </h1>
          <p className="text-gray-500">
            Monitor your assets and liabilities in one place
          </p>
        </div>

        {/* Net Worth Summary Card */}
        <Card className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden border-none shadow-xl">
          <CardContent className="p-8 sm:p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-blue-50">
                Your Net Worth
              </h2>
              <TrendingUp className="w-6 h-6 text-blue-50 opacity-80" />
            </div>

            <div className="text-5xl sm:text-6xl font-bold mb-10 tracking-tight">
              {formatCurrency(netWorth)}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3 p-4 bg-white/5 rounded-2xl">
                <div className="text-sm text-blue-100 flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Total Assets
                </div>
                <div className="text-2xl font-semibold text-green-400">
                  {formatCurrency(totalAssets)}
                </div>
              </div>
              <div className="space-y-3 p-4 bg-white/5 rounded-2xl">
                <div className="text-sm text-blue-100 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Total Liabilities
                </div>
                <div className="text-2xl font-semibold text-red-400">
                  {formatCurrency(totalLiabilities)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Overview
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator">
            <Card className="shadow-xl bg-white border-none">
              <CardContent className="p-6 sm:p-8">
                {/* Assets Section */}
                <div className="mb-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Assets
                      </h2>
                      <p className="text-sm text-gray-500">
                        Add your assets to calculate net worth
                      </p>
                    </div>
                    <Button
                      onClick={() => addItem("asset")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Asset
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <Input
                          placeholder="Asset name"
                          value={asset.name}
                          onChange={(e) =>
                            handleChange(
                              asset.id,
                              "name",
                              e.target.value,
                              "asset"
                            )
                          }
                          className="flex-1 border-gray-200 focus:ring-emerald-500"
                        />
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="0"
                            value={asset.value}
                            onChange={(e) =>
                              handleChange(
                                asset.id,
                                "value",
                                e.target.value,
                                "asset"
                              )
                            }
                            className="pl-8 w-full sm:w-36 border-gray-200 focus:ring-emerald-500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(asset.id, "asset")}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Liabilities Section */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Liabilities
                      </h2>
                      <p className="text-sm text-gray-500">
                        Add your debts and liabilities
                      </p>
                    </div>
                    <Button
                      onClick={() => addItem("liability")}
                      className="bg-red-500 hover:bg-red-600 text-white shrink-0"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Liability
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {liabilities.map((liability) => (
                      <div
                        key={liability.id}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <Input
                          placeholder="Liability name"
                          value={liability.name}
                          onChange={(e) =>
                            handleChange(
                              liability.id,
                              "name",
                              e.target.value,
                              "liability"
                            )
                          }
                          className="flex-1 border-gray-200 focus:ring-red-500"
                        />
                        <div className="relative">
                          <DollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="0"
                            value={liability.value}
                            onChange={(e) =>
                              handleChange(
                                liability.id,
                                "value",
                                e.target.value,
                                "liability"
                              )
                            }
                            className="pl-8 w-full sm:w-36 border-gray-200 focus:ring-red-500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(liability.id, "liability")}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-8">
              {/* Assets Overview Card */}
              <Card className="shadow-xl bg-white border-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-emerald-600">
                    <Wallet className="w-5 h-5" />
                    Assets Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {validAssets.length > 0 ? (
                    <div className="divide-y">
                      {validAssets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex justify-between py-4"
                        >
                          <span className="font-medium">{asset.name}</span>
                          <span className="text-emerald-600 font-semibold">
                            {formatCurrency(asset.value)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between py-4 font-bold">
                        <span>Total Assets</span>
                        <span className="text-emerald-600">
                          {formatCurrency(totalAssets)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No assets added yet
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Liabilities Overview Card */}
              <Card className="shadow-xl bg-white border-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2 text-red-600">
                    <CreditCard className="w-5 h-5" />
                    Liabilities Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {validLiabilities.length > 0 ? (
                    <div className="divide-y">
                      {validLiabilities.map((liability) => (
                        <div
                          key={liability.id}
                          className="flex justify-between py-4"
                        >
                          <span className="font-medium">{liability.name}</span>
                          <span className="text-red-600 font-semibold">
                            {formatCurrency(liability.value)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between py-4 font-bold">
                        <span>Total Liabilities</span>
                        <span className="text-red-600">
                          {formatCurrency(totalLiabilities)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No liabilities added yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NetWorthCalculator;
