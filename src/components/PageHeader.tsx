interface PageHeaderProps {
  title: string
  subtitle?: string
  testid?: string
}

export default function PageHeader({ title, subtitle, testid = 'page-header' }: PageHeaderProps) {
  return (
    <div className="page-header" data-testid={testid}>
      <h1 data-testid="page-title">{title}</h1>
      {subtitle && (
        <p className="page-subtitle" data-testid="page-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  )
}
