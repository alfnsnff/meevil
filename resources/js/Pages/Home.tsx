// pages/index.tsx
import Layout from '../Layouts/Layout';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm, faEllipsis, faBookmark, faHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useEffect, useRef } from 'react';

const HomePage: React.FC = () => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set new height based on content
    }
  };

  useEffect(() => {
    autoResize(); // Trigger resize on mount to ensure it adjusts if there is initial content
  }, []);

  return (
    <Layout>
      <div className="backdrop-blur-sm text-xl bg-card font-bold p-4 sticky top-0 border-b ">
        Home
      </div>
      <div className="bg-card h-full text-card-foreground shadow-lg">
        <div className='flex border-b mb-4 p-4'>
          <Avatar className='mr-2'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='w-full'>
            <textarea
              ref={textareaRef}
              onInput={autoResize} // Listen for input changes to adjust height
              className="resize-none w-full text-xl border-0 bg-transparent focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="What's happening?"
              rows={1} // Set minimum rows to 1
            />
            <div className="flex justify-between items-center mt-2 px-3">
              <div>
                <input type="file" id="file-input" className="hidden" />
                <label htmlFor="file-input" className="cursor-pointer">
                  <FontAwesomeIcon className='text-xl' icon={faPhotoFilm} />
                </label>
              </div>
              <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Tweet
              </Button>
            </div>
          </div>
        </div>
        <div className='flex border-b p-4'>
          <Avatar className='mr-2'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <div className='flex space-x-1'>
                <h2 className="font-bold">John Doe</h2>
                <h5 >@Doe</h5>
              </div>
              <div>
                <Button variant='ghost' className=''>
                  <FontAwesomeIcon className='text-xl' icon={faEllipsis} />
                </Button>
              </div>
            </div>
            <p>Just posted a new project on GitHub! Check it out #NextJS #TypeScript</p>
            <div className='flex space-x-4 mt-4 text-xl'>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faBookmark} />
            <FontAwesomeIcon icon={faShareFromSquare} />
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
