import { Card, Skeleton } from "antd";
import { Footer } from "./Footer";
import { Header } from "./Header";

export interface PageProps {
  showHeader?: boolean;
  showFooter?: boolean;
  pageTitle?: string;
  pageExtra?: React.ReactNode | string;
  loading?: boolean;
  children: React.ReactNode;
}

export function Page({
  showHeader = true,
  showFooter = true,
  loading = false,
  pageTitle,
  pageExtra,
  children,
}: PageProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        padding: "0 2rem",
      }}
    >
      {showHeader ? <Header /> : <span />}

      <Card
        title={loading ? <Skeleton.Input active={loading} /> : pageTitle || "Página"}
        extra={pageExtra}
        bordered={false}
        style={{ flexGrow: 1 }}
      >
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          children
        )}
      </Card>

      {showFooter ? <Footer /> : <span />}
    </div>
  );
}
