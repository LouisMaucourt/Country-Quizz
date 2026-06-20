interface Props {
    total: number
    history: boolean[]
}

export const QuizzProgress = ({ total, history }: Props) => (
    <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
            <div
                key={i}
                className={`h-[6px] flex-1 rounded-full transition-all duration-300 ${i < history.length
                        ? history[i] ? 'bg-emerald-500' : 'bg-orange-600'
                        : i === history.length
                            ? 'bg-violet-500 animate-pulse'
                            : 'bg-white/10'
                    }`}
            />
        ))}
    </div>
)