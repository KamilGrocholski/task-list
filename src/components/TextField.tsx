import { type InputHTMLAttributes, forwardRef } from 'react'

import clsx from 'clsx'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement>

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const { className, ...rest } = props

    const composedClassName = clsx(
        'w-full bg-rosePine-overlay px-3 py-2 rounded-xl placeholder:text-rosePine-muted',
        className,
    )

    return (
        <input type="text" className={composedClassName} {...rest} ref={ref} />
    )
})
TextField.displayName = 'TextField'

export default TextField
