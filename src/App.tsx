import "./index.css";
import { useCountry } from "./hooks/useCountry";
import { BtnGame } from "./components/ui/BtnGame";
import { Flag, Users } from "lucide-react";

export function App() {
  const { error, data, loading } = useCountry()

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-10 bg-neutral-950 px-6">
      <div className="text-center">
        <p className="text-neutral-400 text-sm uppercase tracking-widest">Quiz</p>
        <h1 className="text-3xl font-bold text-white mt-1">Choisis un mode</h1>
      </div>

      {loading && (
        <p className="text-neutral-400 text-sm">Chargement des données...</p>
      )}

      {error && (
        <p className="text-red-500 text-sm">Erreur : {error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        <BtnGame
          to="/flags"
          icon={<Flag />}
          title="Drapeaux"
          description="Reconnais le drapeau du bon pays"
          disabled={loading || !!error}
        />
        <BtnGame
          to="/population"
          icon={<Users />}
          title="Population"
          description="Trouve le pays le plus peuplé"
          disabled={loading || !!error}
        />
      </div>
    </div>
  );
}

export default App;