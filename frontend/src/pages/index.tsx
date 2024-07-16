import Head from "next/head";
import DataTable from "../components/DataTable";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Real-Time Stock/Crypto Prices</title>
      </Head>
      <main>
        <h1>Real-Time Stock/Crypto Prices</h1>
        <DataTable />
      </main>
    </div>
  );
}
