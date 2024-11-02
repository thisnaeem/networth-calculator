import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Wallet, CreditCard } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { OverviewTabProps } from "./types";

export const OverviewTab: React.FC<OverviewTabProps> = ({
  totalAssets,
  totalLiabilities,
  netWorth,
  formatCurrency,
  validAssets,
  validLiabilities,
}) => {
  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    try {
      // Wait for icons to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (document) => {
          // Ensure SVGs are rendered properly
          document.querySelectorAll("svg").forEach((svg) => {
            svg.setAttribute(
              "width",
              svg.getBoundingClientRect().width.toString()
            );
            svg.setAttribute(
              "height",
              svg.getBoundingClientRect().height.toString()
            );
          });
        },
      });

      const imgWidth = 210; // A4 width in mmm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );
      pdf.save("net-worth-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="grid gap-8">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={validAssets.length === 0 && validLiabilities.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* PDF Content */}
      <div id="pdf-content" className="space-y-8">
        {/* Net Worth Summary */}
        <Card className="shadow-xl bg-white border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900">
              Net Worth Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">Total Net Worth</p>
              <p
                className={`text-3xl font-bold ${
                  netWorth >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {formatCurrency(netWorth)}
              </p>
            </div>
          </CardContent>
        </Card>

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
                  <div key={asset.id} className="flex justify-between py-4">
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
                  <div key={liability.id} className="flex justify-between py-4">
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

      {/* Add a footnote if needed */}
      {validAssets.length === 0 && validLiabilities.length === 0 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          Add some assets or liabilities to generate a report
        </p>
      )}
    </div>
  );
};
