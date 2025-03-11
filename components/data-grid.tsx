"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { DataCard, DataCardLoading } from "@/components/data-card";

import { formatDateRange } from "@/lib/utils";
import { Suspense } from "react";

const DataGridContent = () => {
  
  
  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  const accountId = params.get("accountId") || "";
  const fromS = params.get("from") || "";
  const toS = params.get("to") || "";
  const { data, isLoading } = useGetSummary(fromS, toS, accountId);
  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dataRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="default"
        dataRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data?.expenseAmount}
        percentageChange={data?.expenseChange}
        icon={FaArrowTrendDown}
        variant="default"
        dataRange={dateRangeLabel}
      />
    </div>
  );
};


export const DataGrid = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DataGridContent />
  </Suspense>
);
