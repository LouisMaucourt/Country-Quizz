interface Props {
    feedback: { msg: string; type: 'success' | 'error' } | null
}

export const QuizzFeedback = ({ feedback }: Props) => (
    <div className={`h-11 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 ${feedback
            ? feedback.type === 'success'
                ? 'opacity-100 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'opacity-100 bg-orange-600/15 text-orange-400 border border-orange-600/30'
            : 'opacity-0'
        }`}>
        {feedback?.msg}
    </div>
)