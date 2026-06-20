interface Props  {
    score: number,
    history: boolean []
}

export const QuizzSidebar = ({ score, history  }: Props) => (
    <div className="flex-shrink-0">
        <div>score :
            <p>{score}</p>
        </div>
        <div>
            {history.slice(-8).map((ok, i) => (
                <div key={i}
                    className={`size-4 rounded-full transition-all ${ok ? `bg-green-500` : `bg-red-500`}`}>   
                </div>
            ))}
        </div>
    </div>
)