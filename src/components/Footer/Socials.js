import Link from "next/link";
import TwitterIconSvg from "./TwitterIconSvg";
import FacebookIconSvg from "./FacebookIconSvg";
import TiktokIconSvg from "./TiktokIconSvg";

export default function Socials() {
  return (
    <div className="flex flex-row gap-4">
      <h3 className="text-lg font-medium">Follow Us</h3>
      <div className="flex space-x-4">
        <Link href="#" className="text-gray-300 hover:text-white">
          <FacebookIconSvg />
        </Link>

        <Link href="#" className="text-gray-300 hover:text-white">
          <TwitterIconSvg />
        </Link>

        <Link href="#" className="text-gray-300 hover:text-white">
          <TiktokIconSvg />
        </Link>
      </div>
    </div>
  );
}
