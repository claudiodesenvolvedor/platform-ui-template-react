import '../../styles/dashboard.css'

export const pageMeta = {
  path: "/",
  label: "Dashboard",
  roles: ["admin", "manager", "viewer"],
  order: 1
}

export const DashboardPage = () => {
  return (
    <section className="page dashboard">
      <div className="page__header">
        <h1 className="page__title">Dashboard</h1>
        <p className="page__description">
          Visão geral dos indicadores e operações mais recentes.
        </p>
      </div>

      <div className="dashboard-kpis">
        <article className="dashboard-card">
          <p className="dashboard-card__label">Receita mensal</p>
          <h2 className="dashboard-card__value">R$ 428.560</h2>
          <span className="dashboard-card__delta dashboard-card__delta--positive">
            +12% vs. mês anterior
          </span>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__label">Pedidos ativos</p>
          <h2 className="dashboard-card__value">1.248</h2>
          <span className="dashboard-card__delta dashboard-card__delta--neutral">
            +3% vs. semana anterior
          </span>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__label">SLA atendido</p>
          <h2 className="dashboard-card__value">96,4%</h2>
          <span className="dashboard-card__delta dashboard-card__delta--positive">
            +1,8 p.p.
          </span>
        </article>

        <article className="dashboard-card">
          <p className="dashboard-card__label">Alertas críticos</p>
          <h2 className="dashboard-card__value">7</h2>
          <span className="dashboard-card__delta dashboard-card__delta--negative">
            -2 vs. ontem
          </span>
        </article>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-panel">
          <header className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Tendência operacional</h3>
            <span className="dashboard-panel__tag">Últimos 30 dias</span>
          </header>
          <div className="dashboard-chart">
            <div className="dashboard-chart__placeholder">
              Área reservada para gráfico
            </div>
          </div>
        </article>

        <article className="dashboard-panel">
          <header className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Últimas atividades</h3>
            <span className="dashboard-panel__tag">Hoje</span>
          </header>
          <div className="dashboard-table">
            <div className="dashboard-table__row dashboard-table__row--head">
              <span>Time</span>
              <span>Status</span>
              <span>Responsável</span>
            </div>
            <div className="dashboard-table__row">
              <span>Suprimentos</span>
              <span className="status status--success">Concluído</span>
              <span>Marina</span>
            </div>
            <div className="dashboard-table__row">
              <span>TI</span>
              <span className="status status--warning">Em validação</span>
              <span>Rodrigo</span>
            </div>
            <div className="dashboard-table__row">
              <span>Operações</span>
              <span className="status status--danger">Atrasado</span>
              <span>Fernanda</span>
            </div>
            <div className="dashboard-table__row">
              <span>Financeiro</span>
              <span className="status status--success">Concluído</span>
              <span>Caio</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
