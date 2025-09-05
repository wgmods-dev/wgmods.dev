import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      {...baseOptions()}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta || !node.icon) return option;

            return {
              ...option,
              icon: (
                <div className="[&_svg]:size-full rounded-lg size-full">
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
