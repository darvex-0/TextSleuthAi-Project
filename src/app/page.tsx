import { Cpu, Files, Github, Instagram, Lock, ShieldCheck, User, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background animated-gradient">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      </div>
      
      <main className="flex-1 relative z-0">
        <section className="w-full py-20 md:py-28 flex items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-headline text-5xl font-bold text-primary tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                TextSleuth AI
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
                Your intelligent partner for analyzing text. Detect AI-generated
                content and check for plagiarism with cutting-edge tools.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
              <ToolCard
                href="/ai-detector"
                icon={<Cpu className="w-12 h-12 text-primary" />}
                title="AI Content Detector"
                description="Identify AI-generated text with advanced machine learning and confidence scoring."
              />
              <ToolCard
                href="/plagiarism-checker"
                icon={<Files className="w-12 h-12 text-primary" />}
                title="Plagiarism Checker"
                description="Scan your text against millions of sources to detect potential plagiarism and ensure originality."
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose TextSleuth AI?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a powerful, fast, and easy-to-use suite of tools to ensure your text is authentic and original.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              <Feature
                icon={<Zap className="w-8 h-8 text-accent" />}
                title="Lightning Fast"
                description="Get results in seconds with our highly optimized analysis engines."
              />
              <Feature
                icon={<ShieldCheck className="w-8 h-8 text-accent" />}
                title="Comprehensive Analysis"
                description="Leverage advanced AI for detailed similarity reports and confidence scoring."
              />
              <Feature
                icon={<User className="w-8 h-8 text-accent" />}
                title="User-Friendly Interface"
                description="A clean, intuitive, and responsive design makes text analysis simple on any device."
              />
              <Feature
                icon={<Lock className="w-8 h-8 text-accent" />}
                title="Privacy Focused"
                description="Your data is your own. We never store or share the text you analyze."
              />
            </div>
          </div>
        </section>

      </main>

      <footer className="py-6 text-center text-muted-foreground text-sm relative z-0">
        <div className="container flex flex-col items-center justify-center gap-2">
            <p>Connect with us</p>
            <div className="flex gap-4">
                <Link href="https://github.com/darvex-0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Github className="h-6 w-6" />
                </Link>
                <Link href="https://www.instagram.com/__rakeshhh_._?igsh=MTEyMzlseHg2enBl" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <Instagram className="h-6 w-6" />
                </Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="h-full rounded-lg border bg-card/80 text-card-foreground shadow-sm transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/50 backdrop-blur-sm">
        <div className="flex flex-col items-center text-center p-8">
          {icon}
          <h2 className="font-headline text-2xl mt-4">{title}</h2>
          <p className="mt-2 text-base text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}


function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-2 text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold font-headline">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
