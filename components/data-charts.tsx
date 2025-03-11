"use client";

import { Chart, ChartLoading } from "@/components/chart";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { SpendingPie, SpendingPieLoading } from "./spending-pie";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DataChartsContent = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";
  
  const { data, isLoading } = useGetSummary(from, to, accountId);

  if (isLoading) {
    return (
      <div className="grid grid-col-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
};


export const DataCharts = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DataChartsContent />
  </Suspense>
)