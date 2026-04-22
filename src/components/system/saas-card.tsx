import { LucideIcon } from "lucide-react"

type Props = {
  title: string
  value: string | number
  icon?: LucideIcon
  description?: string
  trend?: string
}

export function SaasCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white/70 dark:bg-zinc-900/40 backdrop-blur p-5 shadow-sm hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>

        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground opacity-70" />
        )}
      </div>

      {/* VALUE */}
      <div className="mt-2">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>

        {/* DESCRIPTION (optional) */}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>

      {/* TREND (optional) */}
      {trend && (
        <div className="mt-3 text-xs text-emerald-600 font-medium">
          {trend}
        </div>
      )}

    </div>
  )
}