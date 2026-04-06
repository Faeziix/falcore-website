import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
};

type FeatureCardPorps = React.ComponentProps<'div'> & {
    feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardPorps) {
    const id = React.useId();
    const p = React.useMemo(() => genSeededPattern(id), [id]);

    return (
        <div className={cn('relative overflow-hidden p-6', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="from-accent/5 to-accent/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="fill-accent/5 stroke-border absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                </div>
            </div>
            <feature.icon className="text-accent size-6" strokeWidth={1} aria-hidden />
            <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
            <p className="text-muted-foreground relative z-20 mt-2 text-xs font-light">{feature.description}</p>
        </div>
    );
}

function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
    const patternId = React.useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y], index) => (
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}

function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function genSeededPattern(seed: string, length: number = 5): number[][] {
    let h = simpleHash(seed);
    return Array.from({ length }, () => {
        h = (h * 16807 + 1) | 0;
        const x = (Math.abs(h) % 4) + 7;
        h = (h * 16807 + 1) | 0;
        const y = (Math.abs(h) % 6) + 1;
        return [x, y];
    });
}
