import Head from "next/head";
import DataTable from "../components/DataTable";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Real-Time Stock/Crypto Prices</title>
      </Head>
      <main style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "2rem" }}>Real-Time Stock/Crypto Prices</h1>
        <DataTable />
      </main>
    </div>
  );
}
