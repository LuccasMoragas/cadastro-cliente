import Header from "../components/Header";
import { Auth } from "../components/Auth";

export default function Home() {
  return (
    <div className="Home">
      <Header logoutButtom={false} />
      <Auth />
    </div>
  );
}
