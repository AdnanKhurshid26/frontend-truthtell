interface TableProps {
    children: React.ReactNode;
  }
  
  const Table = ({ children }: TableProps) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-200">
          {children}
        </table>
      </div>
    );
  };
  
  const TableHead = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-200">{children}</tr>
    </thead>
  );
  
  const TableRow = ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">{children}</tr>
  );
  
  const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="p-3">{children}</td>
  );
  
  export { Table, TableHead, TableRow, TableCell };
  