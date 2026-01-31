import '../styles/components.css'

type CardProps = {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return <div className="card-container">{children}</div>
}
