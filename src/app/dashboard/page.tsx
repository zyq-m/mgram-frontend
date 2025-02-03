import BarChartComponent from "@/components/charts/bar";
import ResultTable from "@/components/tables/result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <BarChartComponent />
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
