import { useState } from "react";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
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
  title?: string;
  description?: string;
  location?: { lat: number; lng: number };
}

const LiveAlerts = ({ alerts }: { alerts: AlertData[] }) => {
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);

  return (
    <>
      {/* Live Alerts Table */}
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
                <tr
                  key={index}
                  className="odd:bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
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

      {/* Modal for Alert Details */}
      {selectedAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedAlert(null)}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{selectedAlert.title || "Alert Details"}</h2>
            <p className="text-gray-700 mt-2">{selectedAlert.description || "No additional details available."}</p>

            {/* Alert Info */}
            <div className="mt-4 space-y-2">
              <p><strong>Claim:</strong> {selectedAlert.claim}</p>
              {/* <p><strong>Description:</strong> {selectedAlert.description}</p> */}
              <p><strong>Flag Reason:</strong> {selectedAlert.flagReason}</p>
              <p><strong>Risk Level:</strong> {selectedAlert.riskLevel}</p>
              <p><strong>Confidence:</strong> {selectedAlert.confidence}%</p>
              <p><strong>Source:</strong> {selectedAlert.dataSource}</p>
            </div>

            {/* Location if available */}
            {selectedAlert.location && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {selectedAlert.location.lat}, {selectedAlert.location.lng}
                </p>
              </div>
            )}

            {/* Close Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveAlerts;
