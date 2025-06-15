import { Textarea } from '@/components/ui/input/textarea';

interface KPTFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  colorClass?: string;
  id: string;
}

const KPTField: React.FC<KPTFieldProps> = ({ label, value, onChange, placeholder, colorClass = '', id }) => {
  return (
    <div>
      <h2 className={`text-lg font-semibold mb-2 ${colorClass}`}>{label}</h2>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className='min-w-[300px]'
      />
    </div>
  );
};

export default KPTField;