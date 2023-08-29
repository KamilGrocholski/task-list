import { forwardRef } from 'react'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const { ...rest } = props

    return (
        <input
            type="checkbox"
            className="base-transition base-transition peer relative h-8 w-8 appearance-none rounded-full border-2 border-rosePine-iris bg-rosePine-highlightLow after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-2xl after:text-rosePine-surface after:opacity-0 after:transition-all after:content-['\2713'] checked:border-0 checked:bg-rosePine-iris checked:after:opacity-100 hover:bg-rosePine-iris/20 focus:outline-none focus:ring-1 focus:ring-rosePine-iris focus:ring-offset-0"
            {...rest}
            ref={ref}
        />
    )
})
Checkbox.displayName = 'Checkbox'

export default Checkbox
