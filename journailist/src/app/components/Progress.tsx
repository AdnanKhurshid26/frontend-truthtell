interface ProgressProps {
    value: number;
    color?: "red" | "green" | "blue";
  }
  
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };
  
  const Progress = ({ value, color = "red" }: ProgressProps) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };
  
  export default Progress;
  