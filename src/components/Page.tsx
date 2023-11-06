import { Card, Skeleton, Watermark } from "antd";
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
      className="page"
      style={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {showHeader ? <Header /> : <span />}
        
      <Watermark content="Ronier Lima">
        <main style={{ padding: "0 20px" }}>
          <Card
            title={loading ? <Skeleton.Input active={loading} /> : pageTitle}
            extra={loading ? <Skeleton.Button active={loading} /> : pageExtra}
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
        </main>
      </Watermark>

      {showFooter ? <Footer /> : <span />}
    </div>
  );
}
