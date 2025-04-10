
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const AddButton = ({ onClick, label, className = '' }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn-primary group ${className}`}
      aria-label={`Add ${label}`}
    >
      <Plus size={18} className="group-hover:rotate-90 transition-transform" />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;
