import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "GreenVision App",
  description: "Learn in a fun and interactive way",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        {/* Navbar */}
  

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
      // <nav className="flex items-center justify-between px-8 py-4 shadow-sm">
      //     {/* Left: Logo */}
      //     <Link href="/" className="flex items-center gap-2">
      //       <div className="w-8 h-8 bg-green-500 rounded-full"></div>
      //       <span className="font-bold text-xl">Gameified</span>
      //     </Link>

      //     {/* Right: Language selector */}
      //     <div className="text-sm text-gray-500 flex items-center gap-1 cursor-pointer hover:text-gray-700">
      //       <span>Site Language:</span>
      //       <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
      //         <option>English</option>
      //         <option>Hindi</option>
      //         <option>Telugu</option>
      //         <option>Tamil</option>
      //       </select>
      //     </div>
      //   </nav>
