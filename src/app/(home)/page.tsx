import Link from 'next/link';
import { Cards, Card } from 'fumadocs-ui/components/card';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/components/panel';
import { HeroVideo } from '@/components/hero-video';
import { RiDiscordFill } from 'react-icons/ri';

export default function HomePage() {
  return (
    <div className="mx-auto md:max-w-3xl">
      <div className="relative aspect-[2/1] border-x border-fd-border select-none sm:aspect-[3/1] flex items-center justify-center screen-line-before screen-line-after overflow-hidden">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            wgmods.dev
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            The comprehensive documentation hub for Wargaming games modding
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/docs"
              className={buttonVariants({ variant: "primary" })}
            >
              Getting Started
            </Link>
            <Link
              href="/docs/guides"
              className={`${buttonVariants({ variant: "outline" })} backdrop-blur-sm border-white/20 text-white hover:text-white`}
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </div>

      <Separator />


      <Panel>
        <PanelHeader>
          <PanelTitle>What you&apos;ll find here</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">📚 Complete Documentation</h4>
              <p className="text-sm text-fd-muted-foreground">
                Comprehensive guides covering modding for World of Tanks, World of Warships, and more
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">🔧 API Reference</h4>
              <p className="text-sm text-fd-muted-foreground">
                Detailed API documentation with examples and code samples
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">⚡ Quick Start Guides</h4>
              <p className="text-sm text-fd-muted-foreground">
                Get up and running with your first mod in minutes
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">🎯 Mod Types</h4>
              <p className="text-sm text-fd-muted-foreground">
                Learn about UI mods, gameplay modifications, and visual enhancements
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">💡 Best Practices</h4>
              <p className="text-sm text-fd-muted-foreground">
                Professional patterns and optimization techniques
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">👥 Community</h4>
              <p className="text-sm text-fd-muted-foreground">
                Join the community of Wargaming games modders
              </p>
            </div>
          </div>
        </PanelContent>
      </Panel>

      <Separator />

      <Panel>
        <PanelHeader>
          <PanelTitle>Popular Mod Categories</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 border border-fd-border rounded-lg">
              <h4 className="font-medium mb-1">🎨 UI Modifications</h4>
              <p className="text-sm text-fd-muted-foreground">Custom interfaces, damage panels, minimaps</p>
            </div>
            <div className="p-3 border border-fd-border rounded-lg">
              <h4 className="font-medium mb-1">🔊 Audio Mods</h4>
              <p className="text-sm text-fd-muted-foreground">Sound packs, voice overs, engine sounds</p>
            </div>
            <div className="p-3 border border-fd-border rounded-lg">
              <h4 className="font-medium mb-1">📊 Statistics & Analytics</h4>
              <p className="text-sm text-fd-muted-foreground">XVM, battle analytics, performance trackers</p>
            </div>
            <div className="p-3 border border-fd-border rounded-lg">
              <h4 className="font-medium mb-1">🎯 Crosshairs & Aiming</h4>
              <p className="text-sm text-fd-muted-foreground">Custom crosshairs, aiming assistance</p>
            </div>
          </div>
        </PanelContent>
      </Panel>

      <Separator />

      <Panel>
        <PanelHeader>
          <PanelTitle>Join the Community</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <div className="relative overflow-hidden rounded-lg border border-fd-border bg-gradient-to-br from-fd-primary/5 via-fd-primary/10 to-fd-primary/5 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-fd-primary/5 to-transparent" />
            <div className="relative text-center space-y-4">
              <h3 className="text-xl font-semibold mb-2">Connect with Modders</h3>
              <p className="text-fd-muted-foreground mb-6 max-w-md mx-auto">
                Join our Discord community to chat with other modders, get help, share your creations, and stay updated on the latest developments.
              </p>
              <Link
                href="https://discord.gg/pxSQgmzPTG"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary" })}
              >
                <RiDiscordFill className="w-4 h-4 mr-2" />
                Join Discord Server
              </Link>
            </div>
          </div>
        </PanelContent>
      </Panel>

      <Separator />

      <Panel>
        <PanelHeader>
          <PanelTitle>Explore</PanelTitle>
        </PanelHeader>
        
        <PanelContent>
          <Cards>
            <Card
              title="Documentation"
              description="Browse our complete documentation for Wargaming games modding"
              href="/docs"
            />
            <Card
              title="Guides"
              description="Follow step-by-step tutorials for World of Tanks, World of Warships, and more"
              href="/docs/guides"
            />
            <Card
              title="Reference"
              description="Access detailed API reference and technical specifications"
              href="/docs/reference"
            />
          </Cards>
        </PanelContent>
      </Panel>

      <Separator />

      <footer className="border-x border-fd-border screen-line-before">
        <div className="p-4 text-center space-y-3">
          <div className="text-sm text-fd-muted-foreground">
            Built for the Wargaming modding community
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/docs" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/docs/guides" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              Guides
            </Link>
            <Link href="/docs/reference" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              Reference
            </Link>
          </div>
          <div className="text-xs text-fd-muted-foreground space-y-1">
            <div>© 2025 wgmods.dev</div>
            <div>Not affiliated with Wargaming</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-8 w-full border-x border-fd-border diagonal-pattern ${className || ''}`}
    />
  );
}
