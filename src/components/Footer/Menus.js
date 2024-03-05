import Link from "next/link";

export default function Menus() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <div className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Media Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Audio Description
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Investor Relation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Legal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Gift Card
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Company Information
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Media Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Private
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
