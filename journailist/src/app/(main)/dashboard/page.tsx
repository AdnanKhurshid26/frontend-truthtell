"use client";

import { faChartBar, faCloud, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import WordCloud from "@/app/components/Wordcloud";
import LiveAlerts from "@/app/components/LiveAlerts";
import Heatmap from "@/app/components/Heatmap";

interface AlertData {
  claim: string;
  flagReason: string;
  riskLevel: number;
  confidence: number;
  dataSource: string;
  description: string;
  location: { lat: number; lng: number };
}

const API_URL = "https://y5pb6dc3avenbfpmp3bs3qro7i0rkvpy.lambda-url.ap-south-1.on.aws/";

const Dashboard = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        // Ensure data is valid and in the expected format
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          console.error("Invalid API response format:", data);
          return;
        }

        const newAlert: AlertData = {
          claim: data.claim || "Unknown claim",
          flagReason: data.flagReason || "Unknown",
          description: data.description || "",
          riskLevel: data.riskLevel ?? 0, // Ensure number
          confidence: data.confidence ?? 0, // Ensure number
          dataSource: data.dataSource || "Unknown source",
          location: data.location ?? { lat: 0, lng: 0 }, // Default location if missing
        };

        setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 15)); // Keep latest 15 alerts
      } catch (error) {
        console.error("Error fetching alert:", error);
      }
    };

    fetchAlert(); // Fetch immediately on mount

    const interval = setInterval(fetchAlert, 2000); // Fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // **Separate Data for Components**
  const alertsForHeatmap = alerts.map(({ location, riskLevel }) => ({ location, riskLevel }));
  const alertsForWordCloud = alerts.map(({ claim }) => ({ claim }));

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        📊 Real-Time Misinformation Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Live Alerts Section */}
        <div className="md:col-span-2">
          <Card className="p-5 bg-white shadow-md rounded-xl">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-2xl" />
              <h2 className="text-2xl font-semibold text-gray-800">Live Alerts</h2>
            </div>
            <div className="mt-4">
              <LiveAlerts alerts={alerts} />
            </div>
          </Card>
        </div>

        {/* Word Cloud Analysis */}
        <Card className="p-5 bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Word Cloud Analysis</h2>
            <FontAwesomeIcon icon={faCloud} className="text-blue-500 text-2xl" />
          </div>
          <div className="mt-4">
            <WordCloud alerts={alertsForWordCloud} />
          </div>
        </Card>

        {/* Heatmap */}
        <Card className="p-5 bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Geographical Heatmap</h2>
            <FontAwesomeIcon icon={faChartBar} className="text-green-500 text-2xl" />
          </div>
          <div className="mt-4">
            <Heatmap alerts={alertsForHeatmap} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
