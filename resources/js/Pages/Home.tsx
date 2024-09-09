import React, { useState, useEffect, useRef, FormEventHandler } from 'react';
import Layout from '../Layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { format } from 'date-fns'; // Importing the format function from date-fns
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Post {
  updated_at: string;
  name: string;
  handle: string;
  content: string;
}

export default function HomePage({ auth }: PageProps) {
  const [posts, setPosts] = useState<Post[]>([]); // Define posts with the Post interface
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/post', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
          },
          credentials: 'include', // Include cookies (for authentication)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // Set new height based on content
    }
  };

  useEffect(() => {
    autoResize(); // Trigger resize on mount to ensure it adjusts if there is initial content
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    content: '',
  });

  const handlePost: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('post.store'), {
      onError: (errors) => {
        console.error('Error creating post:', errors);
        // Handle errors here, e.g., show error messages
      },
    });
  };

  return (
    <Layout
      user={auth.user}>
        <Head title="Home" />
      <div className="z-50 backdrop-blur-sm text-center text-xl font-bold p-4 sticky top-0 border-b">
        Home
      </div>
      <div className="text-card-foreground">
        <div className='flex border-b p-4'>
          <Avatar className='mr-2'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='w-full'>
            <textarea
              ref={textareaRef}
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              onInput={autoResize} // Listen for input changes to adjust height
              className="resize-none w-full text-xl border-0 bg-transparent focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="What's happening?"
              rows={1} // Set minimum rows to 1
            />
            <div className="flex justify-between items-center mt-2 px-3">
              <div>
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={(e) => {
                    // Handle file input change if needed
                    console.log(e.target.files);
                  }}
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <FontAwesomeIcon className='text-xl' icon={faPhotoFilm} />
                </label>
              </div>
              <Button
                onClick={handlePost}
                disabled={processing}
              >
                Post
              </Button>
            </div>
            {errors.content && <div className="text-red-500 mt-2">{errors.content}</div>}
          </div>
        </div>
        {posts.map((post) => (
          <div key={post.updated_at} className='flex border-b p-4 transition hover:bg-background/60'>
            <Avatar className='mr-2'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full'>
              <div className='flex justify-between items-center'>
                <div className='flex space-x-1'>
                  <h2 className="font-bold">{post.name}</h2>
                  <h5>@{post.handle}</h5>
                  <p> ~ {format(new Date(post.updated_at), 'HH:mm dd-MM-yyyy')}</p>
                </div>
                <div>
                  <Button variant='ghost'>
                    <FontAwesomeIcon className='text-xl' icon={faEllipsis} />
                  </Button>
                </div>
              </div>
              <p>{post.content}</p>
              <div className='flex space-x-4 mt-4 text-lg'>
                <FontAwesomeIcon icon={faHeart} className='text-pink-500' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
