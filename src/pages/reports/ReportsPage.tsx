import { Card } from "../../components/Card";

export const pageMeta = {
  path: "/reports",
  label: "Relatórios",
  roles: ["manager"],
  group: "Relatórios",
  order: 3
}

export function ReportsPage() {
    const reports: unknown[] = []

    return (<section className="page reports">
        <div className="page__header">
            <div>
                <h1 className="page__title">Relatórios</h1>
                <p className="page__description">Gestão de relatórios com fluxo básico de listagem e formulário.</p>
            </div>
        </div>
        <div className="page__content">
            <Card>
                <div className="card-header">
                    <h2 className="card-title">Lista de relatórios</h2>
                    <span className="card-subtitle">{reports.length} registros</span>
                </div>
            </Card>
        </div>
    </section>)
  }