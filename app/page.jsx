
import DashboardRouter from "./dashboard/page";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <DashboardRouter />
    </main>
  );
}
