import { Button, Result } from "antd";
import { Page } from "../components/Page";

export function NotFound() {
  return (
    <Page>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, não encontramos essa página..."
        extra={<Button type="primary">Volte para o começo</Button>}
      />
    </Page>
  );
}
