import React, { useEffect } from 'react'

type ToastVariants = "default" | "success" | "fail"

interface ToastProps {
    children: React.ReactNode
    variant?: ToastVariants
    onClose?: () => void
    duration?: number
    className?: string
}

const variantStyles = {
    default: "bg-neutral-900/95 border-white/10",
    success: "bg-neutral-900/95 border-emerald-500/40",
    fail: "bg-neutral-900/95 border-red-500/40"
}

export const Toast = ({className,children,variant = "default", duration = 1500,onClose}: ToastProps) => {

    useEffect(() => {
        if (!onClose) return
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [onClose, duration])

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${className}`}>
            <div
                className={`toast-in pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md text-white text-sm font-medium max-w-sm ${variantStyles[variant]}`}
            >
                <div className="flex items-center gap-2 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    )
}