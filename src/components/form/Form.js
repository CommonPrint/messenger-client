

export const Form = ({className, onSubmit, children}) => {
    return <form action="#" onSubmit={onSubmit} className={className}>
        {children}
    </form>
}