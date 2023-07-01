import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export default function Header({ logoutButtom = true }) {
  return (
    <div className=" relative mb-4 flex rounded-2xl bg-white px-8 pb-8 pl-4 pt-6 text-center text-4xl shadow-md">
      <h1 className="flex-1 text-center">Agenda de Contatos</h1>
      {logoutButtom && (
        <Link to={"/"}>
          <button
            className="focus:shadow-outline absolute right-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={logout}
          >
            Logout
          </button>
        </Link>
      )}
    </div>
  );
}
