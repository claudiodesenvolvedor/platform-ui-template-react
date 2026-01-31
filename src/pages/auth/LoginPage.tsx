import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import '../../styles/auth.css'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      await login(formData)
      showToast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo ao ambiente corporativo.',
        variant: 'success',
      })
      navigate('/', { replace: true })
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Não foi possível autenticar.',
      )
      showToast({
        title: 'Falha no login',
        description: 'Verifique suas credenciais e tente novamente.',
        variant: 'error',
      })
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="auth-screen">
      <Card>
        <form className="auth-form" onSubmit={handleSubmit}>
          <header className="auth-header">
            <h1 className="auth-title">Acesso ao sistema</h1>
            <p className="auth-subtitle">
              Use suas credenciais corporativas para continuar.
            </p>
          </header>

          <div className="auth-fields">
            <Input
              label="E-mail"
              placeholder="email@empresa.com"
              value={formData.email}
              onChange={handleChange('email')}
              type="email"
            />
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange('password')}
              type="password"
            />
          </div>

          {error ? <span className="auth-error">{error}</span> : null}

          <div className="auth-actions">
            <Button variant="primary" type="submit">
              Entrar
            </Button>
            <Button variant="ghost" type="button">
              Esqueci minha senha
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
