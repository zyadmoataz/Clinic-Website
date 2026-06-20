// ==========================================
// OWNER: Othman, Omar
// PURPOSE: Standard section header
// ==========================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'text-left'}`}>
      <h2 className="text-text text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle && <p className="text-muted mt-2 text-sm">{subtitle}</p>}
    </div>
  );
}
