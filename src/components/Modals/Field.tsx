import { ReactNode } from 'react';
import { Icon } from '@/components/Icon/Icon';
import type { IconName } from '@/types';

interface FieldProps {
  label: string;
  hint?: string;
  children?: ReactNode;
  required?: boolean;
  span?: number;
}

export function Field({ label, hint, children, required, span = 1 }: FieldProps) {
  return (
    <div className="modal-field" style={{ gridColumn: `span ${span}` }}>
      <label className="modal-field-label">
        {label}
        {required && <span style={{ color: 'var(--red)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <div className="modal-field-hint">{hint}</div>}
    </div>
  );
}

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconName;
}

export function IconInput({ icon, ...rest }: IconInputProps) {
  return (
    <div className="icon-input">
      <Icon name={icon} size={14} className="icon-input-ic"/>
      <input className="search" {...rest}/>
    </div>
  );
}

interface IconSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: IconName;
  children: ReactNode;
}

export function IconSelect({ icon, children, ...rest }: IconSelectProps) {
  return (
    <div className="icon-input">
      <Icon name={icon} size={14} className="icon-input-ic"/>
      <select className="search" {...rest}>{children}</select>
    </div>
  );
}
