import { forwardRef } from 'react'

import clsx from 'clsx'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants
    size?: keyof typeof sizes
    shape?: keyof typeof shapes
    loading?: boolean
    disabled?: boolean
}

const variants = {
    primary:
        'bg-rosePine-pine hover:bg-rosePineMoon-pine hover:text-rosePine-surface',
    void: '',
} as const

const sizes = {
    sm: 'px-1.5 py-0.5 text-sm',
    base: 'px-3 py-2 text-base',
} as const

const shapes = {
    square: '',
    round: 'rounded-lg',
} as const

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        children,
        size = 'base',
        shape = 'round',
        variant = 'primary',
        className,
        loading,
        disabled,
        type = 'button',
        ...rest
    } = props

    const composedClassName = clsx(
        'base-transition',
        sizes[size],
        variants[variant],
        shapes[shape],
        className,
    )

    const isDisabled = disabled || loading

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            className={composedClassName}
            {...rest}
            ref={ref}
        >
            {loading ? <span>Loading</span> : children}
        </button>
    )
})
Button.displayName = 'Button'

export default Button
