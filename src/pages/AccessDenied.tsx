import { Button, Result } from "antd";
import { Page } from "../components/Page";

export function AccessDenied() {
  return (
    <Page>
      <Result
        status="403"
        title="403"
        subTitle="Desculpe, Você não tem acesso..."
        extra={<Button type="primary">Volte para o começo</Button>}
      />
    </Page>
  );
}
