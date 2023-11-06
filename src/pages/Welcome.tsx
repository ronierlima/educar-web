import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { Page } from "../components/Page";

export function Welcome() {
  return (
    <Page>
      <Result icon={<SmileOutlined />} title="Seja Bem-vindo !" />
    </Page>
  );
}
