// LiveAlerts.tsx
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import { Table } from "./Table";
import Progress from "./Progress";

interface AlertData {
  claim: string;
  flagReason: string;
  riskLevel: number;
  confidence: number;
  dataSource: string;
}

const LiveAlerts = ({ alerts }: { alerts: AlertData[] }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Live Alerts</h2>
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-xl" />
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto">
        <Table>
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Claim</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2">Risk</th>
              <th className="px-4 py-2">Confidence</th>
              <th className="px-4 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-2">{alert.claim}</td>
                <td className="px-4 py-2">{alert.flagReason}</td>
                <td className="px-4 py-2">
                  <Progress value={alert.riskLevel} color="red" />
                </td>
                <td className="px-4 py-2 font-semibold text-gray-700">{alert.confidence}%</td>
                <td className="px-4 py-2 text-blue-500">{alert.dataSource}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default LiveAlerts;
