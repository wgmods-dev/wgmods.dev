import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { CopyMarkdownButton, ViewOptions } from '@/components/page-actions';
import { readFileSync } from 'fs';
import { join } from 'path';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  
  // Read the raw markdown content for copying
  let rawContent = '';
  try {
    const filePath = join(process.cwd(), 'content', 'docs', page.path);
    rawContent = readFileSync(filePath, 'utf-8');
  } catch {
    console.error('Could not read raw content for:', page.path);
  }

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <CopyMarkdownButton content={rawContent} />
        <ViewOptions
          markdownUrl={`https://raw.githubusercontent.com/wgmods-dev/wgmods.dev/main/content/docs/${page.path}`}
          githubUrl={`https://github.com/wgmods-dev/wgmods.dev/blob/main/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
                      a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
