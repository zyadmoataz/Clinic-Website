// ==========================================
// OWNER: Othman, Omar
// PURPOSE: Standard section header
// ==========================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className={`} mb-10`}>
      <h2 className="text-text text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle && <p className="text-muted mt-2 text-sm">{subtitle}</p>}
    </div>
  );
}
