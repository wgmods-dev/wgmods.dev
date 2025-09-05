import { cn } from '@/lib/utils';

interface FeatureBlockProps {
  icon?: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureBlock({ icon, title, description, className }: FeatureBlockProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="font-medium">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>
      <p className="text-sm text-fd-muted-foreground">
        {description}
      </p>
    </div>
  );
}