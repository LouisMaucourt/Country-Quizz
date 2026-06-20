import { Link } from "react-router-dom";

interface Props {
    score: number
    total: number
    onRestart: () => void
}

export const QuizzEndScreen = ({ score, total, onRestart }: Props) => (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6  px-6">
        <p className="text-neutral-400 text-sm uppercase tracking-widest">Quiz terminé</p>

        <p className="text-5xl font-bold text-white">
            {score} <span className="text-neutral-500 text-2xl">/ {total}</span>
        </p>

        <button
            onClick={onRestart}
            className="px-6 py-3 rounded-2xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 active:scale-[0.97] transition-all duration-150 cursor-pointer"
        >
            Recommencer
        </button>
        <Link to="/">Revenir</Link>
    </div>
)