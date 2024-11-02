import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Item } from "./types";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: "#333",
  },
  summary: {
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#333",
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
  },
  netWorthSection: {
    marginTop: 30,
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
  },
  netWorthTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  netWorthValue: {
    fontSize: 24,
    textAlign: "center",
    color: "#2563eb",
  },
});

interface NetWorthPDFProps {
  assets: Item[];
  liabilities: Item[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  formatCurrency: (value: number | string) => string;
}

export const NetWorthPDF: React.FC<NetWorthPDFProps> = ({
  assets,
  liabilities,
  totalAssets,
  totalLiabilities,
  netWorth,
  formatCurrency,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Net Worth Report</Text>

      <View style={styles.netWorthSection}>
        <Text style={styles.netWorthTitle}>Total Net Worth</Text>
        <Text style={styles.netWorthValue}>{formatCurrency(netWorth)}</Text>
      </View>

      {/* Assets Section */}
      <Text style={styles.subtitle}>Assets</Text>
      {assets.map((asset, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>{asset.name}</Text>
          <Text style={styles.value}>{formatCurrency(asset.value)}</Text>
        </View>
      ))}
      <View style={styles.total}>
        <Text>Total Assets</Text>
        <Text>{formatCurrency(totalAssets)}</Text>
      </View>

      {/* Liabilities Section */}
      <Text style={styles.subtitle}>Liabilities</Text>
      {liabilities.map((liability, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.label}>{liability.name}</Text>
          <Text style={styles.value}>{formatCurrency(liability.value)}</Text>
        </View>
      ))}
      <View style={styles.total}>
        <Text>Total Liabilities</Text>
        <Text>{formatCurrency(totalLiabilities)}</Text>
      </View>
    </Page>
  </Document>
);
