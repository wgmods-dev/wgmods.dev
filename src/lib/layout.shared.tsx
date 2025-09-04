import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 1104.586 1511.305"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="wgmods.dev Logo"
          >
            <path 
              d="M316.11 55.984L56.036 315.941V946.07l496.271 487.021 496.251-487.021V315.96L788.496 55.984H316.11zM8.304 284.584L284.914 8.24 293.096 0h518.379l8.18 8.24 276.629 276.344 8.303 8.316v676.439l-8.406 8.229-524.299 514.538-19.574 19.197-19.6-19.197L8.429 977.571 0 969.341V292.905l8.304-8.321z" 
              fill="#f25322"
            />
            <g fill="white" fontSize="400" fontFamily="monospace" fontWeight="bold">
              <text x="350" y="800" textAnchor="middle">{'{'}</text>
              <text x="750" y="800" textAnchor="middle">{'}'}</text>
            </g>
          </svg>
          wgmods.dev
        </>
      ),
    },
    links: [],
    githubUrl: 'https://github.com/wgmods-dev/wgmods.dev',
  };
}
