import { Card } from "../../components/Card"

export const pageMeta = {
    path: "/audit",
    label: "Audit",
    roles: ["admin"],
    group: "Administração",
    order: 1
  }

  export function AuditPage() {
    return (<section className="page audit">
        <div className="page__header">
            <h1 className="page__title">Audit</h1>
        </div>
        <div className="page__content">
            <Card>
                <div className="card-header">
                    <h2 className="card-title">Lista de audit</h2>
                </div>
            </Card>
        </div>
    </section>)
  }