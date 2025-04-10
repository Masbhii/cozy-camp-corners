
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButton = ({ onClick, label }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="btn-primary group"
      aria-label={`Add ${label}`}
    >
      <Plus size={18} className="group-hover:rotate-90 transition-transform" />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;
