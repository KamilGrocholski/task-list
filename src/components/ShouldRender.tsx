const ShouldRender: React.FC<{ children?: React.ReactNode; if: unknown }> = ({
    children,
    if: condition,
}) => {
    if (condition) return children
    return
}

export default ShouldRender
