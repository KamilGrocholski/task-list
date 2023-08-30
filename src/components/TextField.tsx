import { forwardRef } from 'react'

import clsx from 'clsx'

export type TextFieldProps = {
    sizeField?: keyof typeof sizes
    shape?: keyof typeof shapes
} & React.InputHTMLAttributes<HTMLInputElement>

const sizes = {
    sm: 'px-1.5 py-0.5 text-sm',
    base: 'px-3 py-2 text-base',
} as const

const shapes = {
    square: '',
    round: 'rounded-lg',
} as const

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const { className, sizeField = 'base', shape = 'round', ...rest } = props

    const composedClassName = clsx(
        'w-full bg-rosePine-overlay placeholder:text-rosePine-muted',
        sizes[sizeField],
        shapes[shape],
        className,
    )

    return (
        <input type="text" className={composedClassName} {...rest} ref={ref} />
    )
})
TextField.displayName = 'TextField'

export default TextField
