import BarChartComponent from "@/components/charts/bar";
import ResultTable from "@/components/tables/result";
import UserTable from "@/components/tables/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
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

      <Card>
        <CardHeader>
          <CardTitle>List of user</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </div>
  );
}
