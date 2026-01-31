import '../styles/components.css'

type InputProps = {
  label: string
  value: string
  placeholder?: string
  type?: string
  onChange: (value: string) => void
}

export const Input = ({
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
}: InputProps) => {
  return (
    <label className="input-field">
      <span className="input-field__label">{label}</span>
      <input
        className="input-field__control"
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
