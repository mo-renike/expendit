import React from "react";
import { DEMO_DATASETS } from "@/mocks/demo";
import { formatMoney, formatMoneyCompact } from "@/lib/format";
import ChartDonut from "@/components/ui/ChartDonut";
import ChartLine from "@/components/ui/ChartLine";
import StatCard from "@/components/ui/StatCard";
import { OverviewCard } from "./OverviewCard";

/** Synthetic preview shown from the empty state; it never writes demo data. */
export const DemoOverview: React.FC = () => {
  const demo = DEMO_DATASETS.freelancer;
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[demo.stats.net, demo.stats.income, demo.stats.expenses].map(
          (stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              format={(value) => formatMoney(value, demo.currency)}
              delta={stat.delta}
              deltaCaption={demo.deltaCaption}
              sparkline={stat.sparkline}
            />
          ),
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <OverviewCard title="Cash flow — trailing 12 months">
          <ChartLine
            series={[
              {
                id: "net",
                label: "Net cash flow",
                color: "accent",
                points: demo.cashflow.points,
              },
            ]}
            xLabels={demo.cashflow.xLabels}
            yTickFormat={(value) => formatMoneyCompact(value, demo.currency)}
          />
        </OverviewCard>
        <OverviewCard title="Spending by category">
          <ChartDonut
            slices={demo.donut.slices}
            centerTotal={demo.donut.centerTotal}
            centerCaption="this month"
            legend="bottom"
          />
        </OverviewCard>
      </div>
    </div>
  );
};
