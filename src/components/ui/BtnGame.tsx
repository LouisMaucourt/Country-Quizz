import React from 'react'
import { Link } from 'react-router-dom';

interface BtnGameProps { 
    to: string
    icon:React.ReactNode
    title: string,
    description?: string
    disabled: boolean
}

export const BtnGame = ({ to, icon, title, description, disabled=false }:BtnGameProps) => {
  return (
      <Link
          to={to}
          className={`group flex flex-col gap-3 p-6 rounded-3xl bg-neutral-900 border border-white/10 hover:border-white/30 hover:bg-neutral-800 transition-all duration-200
          ${disabled && "pointer-events-none opacity-90"}`}
      >
          <span className="text-4xl">{icon}</span>
          <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="text-sm text-neutral-400">{description}</p>
          </div>
          <span className="text-sm text-neutral-500 group-hover:text-white transition-colors mt-2">
              Jouer →
          </span>
      </Link>
  )
}
