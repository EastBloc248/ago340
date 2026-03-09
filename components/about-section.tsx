"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return

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

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const focusAreas = [
    "Social inequality and class structures",
    "Discrimination and systemic exclusion",
    "Structural injustice in institutions",
    "Unequal access to opportunities",
    "Lived experiences of marginalized groups",
    "Power dynamics and privilege",
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / About</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">THE PROJECT</h2>
      </div>

      <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div className="space-y-6">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            This website was created as part of a university creative assignment examining the interconnected themes of diversity, inequality, and injustice in contemporary society.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Through research, case studies, and critical analysis, this project explores how structural inequalities manifest across different dimensions of society—from economic disparities to institutional discrimination—and how these systems impact the lived experiences of individuals and communities.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            The goal is to foster understanding, encourage critical thinking, and inspire meaningful dialogue about creating a more equitable world.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Key Focus Areas</h3>
          <ul className="space-y-4">
            {focusAreas.map((area, index) => (
              <li key={index} className="flex items-start gap-4 group">
                <span className="font-mono text-[10px] text-accent mt-1">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-mono text-sm text-foreground/80 group-hover:text-accent transition-colors duration-200">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
