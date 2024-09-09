import { PropsWithChildren } from 'react';
import { ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Dropdown from '@/Components/Dropdown';
import { User } from '@/types';
// import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
// import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
// import { Link } from '@inertiajs/react';


export default function Layout({ user, children }: PropsWithChildren<{ user: User}>) {
  return (
    <div className="flex justify-center min-h-screen text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:block w-72 bg-accent bg-accent text-accent-foreground p-4 sticky top-0 h-screen justify-between">
        <nav className="flex flex-col h-full text-xl">
        <Dropdown>
            <Dropdown.Trigger>
              <div className='flex items-center rounded-full cursor-pointer hover:bg-gray-200 py-2 px-2'>
                <Avatar className='size-14 mr-4'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='font-bold'>{user.name}</h4>
                  <h5 className='text-sm'>@{user.handle}</h5>
                </div>
              </div>
            </Dropdown.Trigger>

            <Dropdown.Content>
              <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
              <Dropdown.Link href={route('logout')} method="post" as="button">
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
          <ul className='pl-16'>
            {/* <Link href="/home">
              <li className="py-2 transition px-4 hover:bg-gray-200 cursor-pointer rounded-full font-bold">
                <FontAwesomeIcon icon={faHouse} className='mr-2' />
                Home
              </li>
            </Link> */}
            {/* <Link href="/explore">
              <li className="py-2 transition px-4 hover:bg-gray-200 cursor-pointer rounded-full ">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-2' />
                Explore
              </li>
            </Link>
            <Link href="/favorites">
              <li className="py-2 transition px-4 hover:bg-gray-200 cursor-pointer rounded-full ">
                <FontAwesomeIcon icon={faBell} className='mr-2' />
                Favorites
              </li>
            </Link> */}
          </ul>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 border bg-white max-w-2xl">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-72 bg-accent text-accent-foreground p-4 sticky top-0 h-screen">
        {/* <div className="mb-4">
          <Input
            type="text"
            className="w-full p-2 border border-input rounded-lg bg-background text-foreground"
            placeholder="Search Twitter"
          />
        </div>
        <div className='border rounded-lg p-4'>
          <h2 className="text-xl font-bold">Trending</h2>
          <div className='flex space-x-1'>
            <a className="py-2 cursor-pointer"><Badge>Nextjs</Badge></a>
            <a className="py-2 cursor-pointer"><Badge>Nextjs</Badge></a>
            <a className="py-2 cursor-pointer"><Badge>Nextjs</Badge></a>
          </div>
        </div> */}
      </aside>
    </div>

  );

}
