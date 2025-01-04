interface StatusBadgeProps {
    status: string;
  }
  
  export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'In Stock':
          return 'text-emerald-600';
        case 'Low Stock':
          return 'text-amber-600';
        case 'Out of Stock':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };
  
    return (
      <span className={`${getStatusColor(status)}`}>
        {status}
      </span>
    );
  }
  
  