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
    <Watermark content="">
      <div
        className="page"
        style={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0",
        }}
      >
        {showHeader ? <Header /> : <span />}
        <main style={{ padding: "0 20px" }}>
          <Card
            title={loading ? <Skeleton.Input active={loading} /> : pageTitle || "Página"}
            extra={loading ? <Skeleton.Button active={loading} /> : pageExtra}
            bordered={false}
            headStyle={{ background: "#799ff94c" }}
            bodyStyle={{ background: "#799ff93d" }}
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

        {showFooter ? <Footer /> : <span />}

      </div>  
    </Watermark>
  );
}
