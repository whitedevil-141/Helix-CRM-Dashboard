import { TweakRow } from './TweakRow';

type SelectOption = string | { value: string; label: string };

interface TweakSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (v: string) => void;
}

export function TweakSelect({ label, value, options, onChange }: TweakSelectProps) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}
