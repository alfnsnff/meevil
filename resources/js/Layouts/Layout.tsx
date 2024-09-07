import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:block w-72 bg-secondary text-secondary-foreground p-4 sticky top-0 h-screen text-xl justify-between">
        <nav className="flex flex-col h-full justify-between">
          <ul>
            <li className="py-2 px-4 hover:bg-secondary/80 cursor-pointer font-bold"><FontAwesomeIcon icon={faHouse} /> Home</li>
            <li className="py-2 px-4 hover:bg-secondary/80 cursor-pointer"><FontAwesomeIcon icon={faMagnifyingGlass} /> Explore</li>
            <li className="py-2 px-4 hover:bg-secondary/80 cursor-pointer"><FontAwesomeIcon icon={faBell} /> Notifications</li>
          </ul>
        <div className='flex items-center'>
          <Avatar className='mr-2'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2>John Doe</h2>
            <h5 className='text-sm'>@Doe</h5>
          </div>
        </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl bg-muted h-screen">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-72 bg-accent text-accent-foreground p-4 sticky top-0 h-screen">
        <div className="mb-4">
          <Input
            type="text"
            className="w-full p-2 border border-input rounded-lg bg-background text-foreground"
            placeholder="Search Twitter"
          />
        </div>
        <div className='border rounded-lg p-4'>
          <h2 className="text-xl font-bold">Trending</h2>
          <div className='flex space-x-1'>
            <a className="py-2"><Badge>Nextjs</Badge></a>
            <a className="py-2"><Badge>Nextjs</Badge></a>
            <a className="py-2"><Badge>Nextjs</Badge></a>
          </div>
        </div>
      </aside>
    </div>

  );

}
