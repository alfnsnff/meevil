import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: PropsWithChildren  ) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Home</li>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Explore</li>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Notifications</li>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Messages</li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 bg-gray-200 p-4">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Search Twitter"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Trending</h2>
          <ul>
            <li className="py-2">#NextJS</li>
            <li className="py-2">#TypeScript</li>
            <li className="py-2">#React</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
