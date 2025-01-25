import BarChartComponent from "@/components/charts/bar";
import ResultTable from "@/components/tables/result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid gap-8">
      {/* barchart */}
      <BarChartComponent />

      {/* list of prediction */}
      <Card>
        <CardHeader>
          <CardTitle>List of recent prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultTable />
        </CardContent>
      </Card>
    </div>
  );
}
