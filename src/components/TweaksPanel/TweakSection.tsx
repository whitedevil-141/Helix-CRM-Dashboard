import { ReactNode } from 'react';

interface TweakSectionProps {
  label: string;
  children?: ReactNode;
}

export function TweakSection({ label, children }: TweakSectionProps) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}
