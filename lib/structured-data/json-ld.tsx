import type { Graph, Thing } from "schema-dts";

export function buildGraph(nodes: Thing[]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function serialiseJsonLd(graph: Graph) {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export function JsonLd({ nodes }: { nodes: Thing[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(buildGraph(nodes)) }}
    />
  );
}
