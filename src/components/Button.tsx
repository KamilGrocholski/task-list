import { forwardRef } from 'react'

import clsx from 'clsx'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants
    size?: keyof typeof sizes
    loading?: boolean
    disabled?: boolean
}

const variants = {
    primary: 'bg-rosePine-pine',
    text: '',
} as const

const sizes = {
    base: 'px-3 py-2',
} as const

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        children,
        size = 'base',
        variant = 'primary',
        className,
        loading,
        disabled,
        type = 'button',
        ...rest
    } = props

    const composedClassName = clsx(
        'rounded-md',
        sizes[size],
        variants[variant],
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
