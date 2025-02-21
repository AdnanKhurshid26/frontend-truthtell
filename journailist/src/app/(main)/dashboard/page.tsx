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
  location: { lat: number; lng: number };
}

const generateFakeAlert = (): AlertData => {
  const fakeClaims = [
    "Government confirms UFO sighting in New York!",
    "Celebrity found alive after death hoax!",
    "New miracle drug claims to cure all diseases overnight!",
    "Scientists discover a way to reverse aging!",
    "Bitcoin will hit $1 million next year, experts say!",
    "AI surpasses human intelligence!",
    "New species found in the Amazon!",
    "Stock market crashes overnight!",
    "Scientists claim time travel is possible!",
    "NASA announces a new habitable planet!",
  ];
  
  const fakeReasons = ["Misinformation", "Clickbait", "Unverified Source", "Exaggeration", "Satire"];
  const fakeSources = [
    "www.fake-news-101.com",
    "rumorwatch.net",
    "viral-truth.ai",
    "tabloid-express.com",
  ];

  return {
    claim: fakeClaims[Math.floor(Math.random() * fakeClaims.length)],
    flagReason: fakeReasons[Math.floor(Math.random() * fakeReasons.length)],
    riskLevel: Math.floor(Math.random() * 100),
    confidence: Math.floor(Math.random() * 100),
    dataSource: fakeSources[Math.floor(Math.random() * fakeSources.length)],
    location: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
  };
};

const Dashboard = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    setAlerts(Array.from({ length: 5 }, generateFakeAlert));

    const interval = setInterval(() => {
      setAlerts((prev) => {
        if (prev.length >= 15) return prev;
        return [generateFakeAlert(), ...prev];
      });
    }, 5000);

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
