import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Deck } from "@/components/deck/Deck";
import { slides } from "@/slides";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { slide?: number } => (s["slide"] ? { slide: Number(s["slide"]) } : {}),
  head: () => ({
    meta: [
      { title: "LoRa — Long Range Wireless Communication" },
      { name: "description", content: "A keynote-style introduction to LoRa: how it works, hardware, communication and real-world uses." },
      { property: "og:title", content: "LoRa — Long Range Wireless Communication" },
      { property: "og:description", content: "A keynote-style introduction to LoRa and long-range IoT communication." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { slide: raw } = Route.useSearch();
  const slide = Math.max(1, Math.min(slides.length, Number(raw) || 1));
  const navigate = useNavigate({ from: "/" });
  const onChange = useCallback((i: number) => navigate({ search: { slide: i + 1 }, replace: true }), [navigate]);
  return <Deck initial={slide - 1} onChange={onChange} />;
}
