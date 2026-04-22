type Props = {
  title: string
  data: { label: string; value: string | string[] }[]
}

// SIDEBAR estilo Wiki:
export function InfoSection({ title, data }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">

      {/* HEADER */}
      <div className="bg-primary/20 px-4 py-2">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-text-muted text-xs">
              {item.label}
            </span>

            {Array.isArray(item.value) ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {item.value.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-surface px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="mt-1 text-secondary">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
