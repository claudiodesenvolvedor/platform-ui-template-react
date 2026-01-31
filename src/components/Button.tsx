import '../styles/components.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
