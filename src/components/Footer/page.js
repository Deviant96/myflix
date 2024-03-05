import Copyright from "@/components/Footer/Copyright";
import Menus from "@/components/Footer/Menus";
import Socials from "@/components/Footer/Socials";

export default function Footer() {
  return (
    <footer className="pt-12 pb-5 px-6 md:px-14 text-gray-400 [&_a]:text-gray-400">
      <Socials />
      <Menus />
      <Copyright />
    </footer>
  );
}
