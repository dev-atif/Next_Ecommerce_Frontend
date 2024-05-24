import Image from "next/image";
import Category_Tabs from "./components/Category_Tabs";

export default function Home() {
  return (
    <main>
      <div className="py-4 px-8">
        <Category_Tabs/>
      </div>
    </main>
  );
}
