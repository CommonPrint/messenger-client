export const Input = ({id, type, name, placeholder, className, onChange}) => {
    return <input 
                id={id} 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                className={className}
                onChange={onChange}
            />
}