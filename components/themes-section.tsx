"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ThemesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const themesRef = useRef<HTMLDivElement>(null)

  const themes = [
    {
      number: "01",
      titleParts: [
        { text: "SOCIAL", highlight: true },
        { text: " INEQUALITY", highlight: false },
      ],
      description: "The unequal distribution of resources, opportunities, and privileges within society based on social position.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "RACIAL", highlight: true },
        { text: " INJUSTICE", highlight: false },
      ],
      description: "Systemic discrimination and prejudice based on race and ethnicity that perpetuates disparities across generations.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "GENDER ", highlight: false },
        { text: "INEQUALITY", highlight: true },
      ],
      description: "Disparities in rights, opportunities, and treatment based on gender identity and expression.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "CLASS ", highlight: false },
        { text: "DISPARITY", highlight: true },
      ],
      description: "Economic stratification that creates barriers to mobility and concentrates wealth among few.",
      align: "right",
    },
    {
      number: "05",
      titleParts: [
        { text: "INSTITUTIONAL", highlight: true },
        { text: " DISCRIMINATION", highlight: false },
      ],
      description: "Embedded biases within organizations and systems that disadvantage certain groups systematically.",
      align: "left",
    },
    {
      number: "06",
      titleParts: [
        { text: "ACCESS ", highlight: false },
        { text: "BARRIERS", highlight: true },
      ],
      description: "Obstacles to education, healthcare, and opportunity that disproportionately affect marginalized communities.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !themesRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const articles = themesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = themes[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="themes" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Themes</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">KEY THEMES</h2>
      </div>

      <div ref={themesRef} className="space-y-24 md:space-y-32">
        {themes.map((theme, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              theme.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {theme.number} / {theme.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
              {theme.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {theme.description}
            </p>

            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${theme.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
