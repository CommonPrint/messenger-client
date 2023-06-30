export const Label = ({forName, className, content}) => {

    return <label for={forName} className={className}>
        {content}
    </label>
}