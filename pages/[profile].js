import ProfileFeed from "../components/profileFeed";
import SlideBar from "../components/slidebar";
import Widget from "../components/widget";

import { useAuthContext } from "../context/authContext";

import { ThreeDots } from "react-loader-spinner";
export default function Profile({ newsResult }) {
  const { user, Logout } = useAuthContext();

  return (
    <div>
      <main className="flex min-h-screen mx-auto ">
        <SlideBar user={user} />

        {user ? (
          <ProfileFeed user={user} Logout={Logout} />
        ) : (
          <div className="xl:ml-[375px] border-l border-r xl:min-w-[576px] border-gray-200 sm:ml-[73px] flex-grow max-w-xl">
            <div className="flex justify-center items-center h-screen">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          </div>
        )}

        <Widget newsResult={newsResult.articles} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const newsResult = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json"
  ).then((res) => res.json());

  return {
    props: { newsResult },
  };
}
