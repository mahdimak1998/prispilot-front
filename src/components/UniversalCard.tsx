import ImageWithFallback from "@/components/ImageWithFallback";

// ----------------------------------------------------
// Types
// ----------------------------------------------------
export type Category = "strom" | "forsikring" | "renhold" | string;

export interface Feature {
  icon?: React.ReactNode;
  label: string;
}

export interface Price {
  amount: number | string;
  currency?: string; // default: "kr"
  period?: string; // e.g. "per måned"
  original?: number | string; // shown struck-through if provided
  savingsLabel?: string; // e.g. "Spar 200 kr"
  // Ekstra for internett/mobil
  mbps?: number | string;
  gb?: number | string;
  sms?: number | string;
  minutter?: number | string;
}

export type CardVariant = "default" | "featured" | "compact" | "ultra";

export interface UniversalCardProps {
  providerName: string;
  logoUrl?: string;

  /** Primary CTA */
  onGetQuote: () => void;
  getQuoteLabel?: string; // default: "Få tilbud"

  /** Provider page (visible URL button) */
  visitUrl?: string; // provider/leverandør URL
  visitLabel?: string; // default: "Les mer"
  onVisitClick?: () => void; // optional analytics hook

  /** Optional */
  onProviderClick?: () => void;
  onCompareChange?: (checked: boolean) => void;
  compared?: boolean;

  productName?: string;
  productSubtitle?: string;
  price?: Price;
  effectiveRate?: string;
  features?: Feature[];
  category?: Category;
  rating?: number; // 0..5
  reviews?: number; // count
  trustLabel?: string;
  badges?: string[]; // extra text chips top-right (e.g. "Best i test")
  highlight?: string; // headline ribbon text for featured

  variant?: CardVariant;
  loading?: boolean;
  className?: string;
}

// ----------------------------------------------------
// Theming per category
// ----------------------------------------------------
const themes: Record<string, {
  ring: string;
  gradFrom: string;
  gradTo: string;
  pill: string;
  accent: string;
  softBg: string;
}> = {
  strom: {
    ring: "ring-sky-300/50",
    gradFrom: "from-sky-500",
    gradTo: "to-sky-700",
    pill: "bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200",
    accent: "text-sky-600 dark:text-sky-300",
    softBg: "bg-sky-50/70 dark:bg-sky-950/20",
  },
  forsikring: {
    ring: "ring-emerald-300/50",
    gradFrom: "from-emerald-500",
    gradTo: "to-emerald-700",
    pill: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
    accent: "text-emerald-600 dark:text-emerald-300",
    softBg: "bg-emerald-50/70 dark:bg-emerald-950/20",
  },
  renhold: {
    ring: "ring-violet-300/50",
    gradFrom: "from-violet-500",
    gradTo: "to-violet-700",
    pill: "bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-200",
    accent: "text-violet-600 dark:text-violet-300",
    softBg: "bg-violet-50/70 dark:bg-violet-950/20",
  },
};
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Star,
  ShieldCheck,
  ExternalLink,
  Info,
  Sparkles,
  Tag,
  TrendingUp,
  Link as LinkIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// ----------------------------------------------------
// Utilities
// ----------------------------------------------------
const cleanProviderName = (name: string) =>
  name
    .replace(/\s*(AS|ASA|A\/S|SA|AB|ApS|Ltd|Limited|Inc|Corp|Corporation|GmbH|AG|SE|SL|Sp\.\s*z\s*o\.o\.|S\.p\.A\.|S\.L\.|B\.V\.|N\.V\.)\s*$/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const formatAmount = (value?: number | string, locale = "no-NO") => {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  try {
    return value.toLocaleString(locale);
  } catch {
    return String(value);
  }
};

const join = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

// Skeleton atom
const Line = ({ className = "" }: { className?: string }) => (
  <div className={join("h-3 rounded bg-muted/60 dark:bg-muted/30", className)} />
);

// ----------------------------------------------------
// Component
// ----------------------------------------------------
const UniversalCard = React.forwardRef<HTMLDivElement, UniversalCardProps>(
  (
    {
      providerName,
      logoUrl,
      onGetQuote,
      getQuoteLabel = "Få tilbud",

      visitUrl,
      visitLabel = "Les mer",
      onVisitClick,

      onProviderClick,
      onCompareChange,
      compared = false,

      productName,
      productSubtitle,
      price,
      effectiveRate,
      features = [],
      category = "strom",
      rating = 0,
      reviews = 0,
      trustLabel = "Trygg leverandør",
      badges = [],
      highlight,

      variant = "default",
      loading = false,
      className,
    },
    ref
  ) => {
    const t = themes[category] ?? themes.strom;
    const displayName = cleanProviderName(providerName);
    const roundedRating = clamp(Math.round(rating), 0, 5);

    const isFeatured = variant === "featured";
    const isCompact = variant === "compact";
    const isUltra = variant === "ultra"; // tighter header, sticky CTA

    const handleVisit = () => {
      onVisitClick?.();
      if (visitUrl) {
        window.open(visitUrl, "_blank", "noopener,noreferrer");
      }
    };

    // Dynamisk ekstra features for internett og mobil
    let extraFeatures: Feature[] = [];
    if (category === 'internett' && price && typeof price === 'object') {
      if (price.mbps) extraFeatures.push({ label: `${price.mbps} Mbit/s` });
    }
    if (category === 'mobil' && price && typeof price === 'object') {
      if (price.gb) extraFeatures.push({ label: `${price.gb} GB inkludert` });
      if (price.sms) extraFeatures.push({ label: `${price.sms} SMS inkludert` });
      if (price.minutter) extraFeatures.push({ label: `${price.minutter} min tale` });
    }
    // Unngå duplikater: filtrer ut labels som allerede finnes i features
    const allFeatures = [...features];
    for (const ef of extraFeatures) {
      if (!allFeatures.some(f => f.label === ef.label)) {
        allFeatures.push(ef);
      }
    }

    return (
      <motion.article
        ref={ref}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className={join(
          "group relative isolate w-full overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75",
          "shadow-sm hover:shadow-xl transition-all duration-200",
          isFeatured ? join("ring-2 ring-offset-2 ring-offset-background ", t.ring) : "",
          isUltra ? "p-4" : isCompact ? "p-4" : "p-6",
          className,
        )}
        aria-label={`Produktkort for ${productName || "produkt"} fra ${displayName}`}
      >
        {/* Decorative gradient border glow */}
        <div className={join("pointer-events-none absolute -inset-px -z-10 bg-gradient-to-br opacity-[0.06]", t.gradFrom, t.gradTo)} />

        {/* FEATURED ribbon */}
        {isFeatured && (
          <div className="absolute right-4 top-3 z-20">
            <Badge className={join(t.pill, "border-0 px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1")}>
              <Sparkles className="h-3.5 w-3.5" /> {highlight || "Anbefalt"}
            </Badge>
          </div>
        )}

        {/* HEADER */}
        <div className={join("flex items-start gap-4", isUltra || isCompact ? "mb-3" : "mb-4")}> 
          <button
            type="button"
            onClick={onProviderClick}
            className="relative grid place-items-center shrink-0 w-20 h-20 rounded-2xl bg-white border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60"
            aria-label={`${displayName} logo`}
          >
            {loading ? (
              <div className="w-16 h-16 rounded-md bg-muted/60 dark:bg-muted/30" />
            ) : (
              <ImageWithFallback
                src={logoUrl || "/placeholder.svg"}
                alt={`${displayName} logo`}
                fallbackSrc="/placeholder.svg"
                className="max-h-16 max-w-16 object-contain"
              />
            )}
          </button>

          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="flex flex-col gap-2">
                <Line className="w-40" />
                <Line className="w-64" />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-foreground/90 leading-tight">
                    {displayName}
                  </h3>
                  {(productName && productName !== displayName) && (
                    <p className="text-xs text-muted-foreground leading-tight">
                      {productName}
                    </p>
                  )}
                  {productSubtitle && (
                    <p className="text-xs text-muted-foreground leading-tight">
                      {productSubtitle}
                    </p>
                  )}
                  {category !== "strom" && (
                    <Badge className={join(t.pill, "border-0 px-2 py-0.5 text-[11px] font-medium rounded-full w-fit")}>{category}</Badge>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Compare toggle (optional) */}
          {onCompareChange && (
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
              <Checkbox checked={compared} onCheckedChange={(c) => onCompareChange(Boolean(c))} />
              Sammenlign
            </label>
          )}
        </div>

        {/* Top badges row */}
        {badges.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {badges.slice(0, 3).map((b, i) => (
              <Badge key={i} className={join(t.pill, "border-0 px-2 py-0.5 text-[11px] font-medium rounded-full flex items-center gap-1")}>
                <Tag className="h-3.5 w-3.5" /> {b}
              </Badge>
            ))}
          </div>
        )}

        {/* Feature chips */}
        <div
          className={join(
            "grid mb-4",
            isUltra ? "grid-cols-1 gap-2" : isCompact ? "grid-cols-1 gap-2" : "grid-cols-2 gap-2.5"
          )}
          aria-label="Nøkkelfordeler"
        >
          {(loading
            ? Array.from({ length: isUltra || isCompact ? 2 : 6 })
            : allFeatures
          ).map((f: any, i: number) => (
            <div
              key={i}
              className={join(
                "flex items-center gap-2 rounded-lg px-3 py-2 min-h-[40px]",
                loading ? "bg-muted/50" : join("", t.softBg, " border border-border/40")
              )}
            >
              {loading ? (
                <div className="h-3 w-16 bg-muted/70 rounded" />
              ) : (
                <>
                  <span className={join(t.accent, "grid place-items-center flex-shrink-0")}>{f?.icon ?? <Info className="h-4 w-4" />}</span>
                  <span className="text-sm text-foreground/80 font-medium break-words">{f?.label}</span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Price + Inline Actions */}
        {loading || (category === 'lån' || effectiveRate || (price && typeof price === 'object' && price.amount) || (category !== 'lån' && price?.original)) ? (
          <div
            className={join(
              "relative overflow-hidden rounded-xl border border-border",
              isUltra ? "py-3 px-4" : isCompact ? "py-3 px-4" : "py-4 px-5"
            )}
            aria-label="Pris"
          >
            <div className={join("absolute inset-0 -z-10 bg-gradient-to-r opacity-10", t.gradFrom, t.gradTo)} />

            {loading ? (
              <div className="flex items-end gap-2">
                <Line className="w-24 h-6" />
                <Line className="w-10 h-4" />
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center w-full gap-1">
                  {category === 'lån' || effectiveRate ? (
                    <div className="flex flex-col items-center justify-center w-full h-24 gap-1">
                      <span className="text-xs font-medium text-muted-foreground mb-1 tracking-wide uppercase flex items-center gap-1"><TrendingUp className="h-4 w-4" />Rente på lånet</span>
                      <span className="text-foreground/90 font-extrabold leading-none text-4xl md:text-5xl">{String(effectiveRate).replace(/%/g, "").trim()}%</span>
                    </div>
                  ) : price && typeof price === 'object' && price.amount ? (
                    <div className="flex items-end gap-1">
                      <span className="text-foreground/90 font-extrabold leading-none text-3xl md:text-4xl">
                        <span className="align-super text-base mr-1 opacity-80">{price.currency || "kr"}</span>
                        {formatAmount(price.amount)}
                      </span>
                      {price.period && (
                        <span className="text-sm text-muted-foreground mb-0.5">{price.period}</span>
                      )}
                    </div>
                  ) : null}
                  {/* Show original price and savings only if not lån */}
                  {category !== 'lån' && price?.original && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">{price.currency || "kr"} {formatAmount(price.original)}</span>
                      {price.savingsLabel && (
                        <Badge variant="secondary" className="px-2 py-0.5 text-[11px]">{price.savingsLabel}</Badge>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : null}
        {/* Action buttons: always below price box, stacked vertically */}
        <div className="mt-3 flex flex-col gap-2 w-full">
          <Button
            className={join("w-full font-semibold shadow-sm text-white bg-gradient-to-r", t.gradFrom, t.gradTo, "hover:opacity-95")}
            onClick={onGetQuote}
            aria-label={getQuoteLabel}
          >
            {getQuoteLabel}
          </Button>
          {visitUrl ? (
            <Button
              className={join("w-full font-semibold shadow-sm text-white bg-gradient-to-r", t.gradFrom, t.gradTo, "hover:opacity-95 flex items-center justify-center gap-2")}
              onClick={() => window.open(visitUrl, '_blank', 'noopener,noreferrer')}
              aria-label="Les mer"
            >
              <ExternalLink className="h-4 w-4" /> Les mer
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 pointer-events-none opacity-60"
              disabled
            >
              <ExternalLink className="h-4 w-4" /> Les mer
            </Button>
          )}
        </div>
        {/* Footer: rating + trust */}
        <div className={join("mt-4 flex items-center justify-between gap-3", isCompact ? "flex-col sm:flex-row" : "")}> 
          <div className="flex items-center gap-1" aria-label={`Vurdering ${roundedRating} av 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={join("h-4 w-4", i < roundedRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{reviews || 0} omtaler</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-foreground/80">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>{trustLabel}</span>
          </div>
        </div>

  {/* STICKY CTA BAR removed: actions are now always below price */}

        {/* sr-only provider */}
        <span className="sr-only">Leverandør: {displayName}</span>
      </motion.article>
    );
  }
);

UniversalCard.displayName = "UniversalCard";

export default UniversalCard;
