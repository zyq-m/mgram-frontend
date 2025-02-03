import ResultTable from "@/components/tables/result";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Result() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>List of Result</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultTable />
        </CardContent>
      </Card>
    </div>
  );
}
