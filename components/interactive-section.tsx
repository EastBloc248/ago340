"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const interactiveTools = [
  {
    icon: "?",
    title: "Quiz",
    description: "Test your understanding of inequality concepts and social justice issues.",
    status: "Coming Soon",
  },
  {
    icon: "—",
    title: "Timeline",
    description: "Explore key moments in the history of civil rights and social movements.",
    status: "Coming Soon",
  },
  {
    icon: "≡",
    title: "Comparison Charts",
    description: "Compare inequality metrics across different countries and demographics.",
    status: "Coming Soon",
  },
  {
    icon: "◎",
    title: "Interactive Map",
    description: "Visualize global inequality data and regional disparities.",
    status: "Coming Soon",
  },
  {
    icon: "%",
    title: "Statistics",
    description: "Explore real-time data on social inequality indicators worldwide.",
    status: "Coming Soon",
  },
]

export function InteractiveSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="interactive" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / Interactive</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">EXPLORE MORE</h2>
        <p className="mt-6 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
          Interactive tools to deepen your understanding of diversity, inequality, and injustice in society.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interactiveTools.map((tool, index) => (
          <article
            key={index}
            className={cn(
              "group relative border border-border/40 p-8 transition-all duration-500 cursor-pointer",
              "hover:border-accent/60 hover:bg-accent/5",
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <span className="font-[var(--font-bebas)] text-4xl text-accent">{tool.icon}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 border border-border/40 px-2 py-1">
                {tool.status}
              </span>
            </div>

            <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
              {tool.title}
            </h3>

            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {tool.description}
            </p>

            <div className="absolute bottom-4 right-4">
              <span className="font-mono text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
