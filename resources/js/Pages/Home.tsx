import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Post } from '@/types/pop';

export default function HomePage({ auth }: PageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/post', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
          },
          credentials: 'include',
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
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [content]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file in state
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    const formData = new FormData();
    formData.append('content', content);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await fetch(route('post.store'), {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      console.log('Post created successfully');
      setContent(''); // Clear the form content
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout user={auth.user}>
      <Head title="Home" />
      <div className="z-50 backdrop-blur-sm text-center text-xl font-bold p-4 sticky top-0 border-b">
        Home
      </div>
      <div className="text-card-foreground">
        <form onSubmit={handlePost}>
          <div className='flex border-b p-4'>
            <Avatar className='mr-2'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='w-full'>
              <div className='border-b'>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onInput={autoResize}
                  className="resize-none w-full text-xl border-0 bg-transparent focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="What's happening?"
                  rows={1}
                />

                {/* Preview the selected image or video */}
                {selectedFile && (
                  <div className="mt-4">
                    {selectedFile.type.startsWith('image') ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className="w-full h-auto rounded"
                      />
                    ) : selectedFile.type.startsWith('video') ? (
                      <video controls className="w-full rounded">
                        <source src={URL.createObjectURL(selectedFile)} />
                      </video>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-2 px-3">
                <div>
                  <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    accept="image/*,video/*" // Allow image and video files
                    onChange={handleFileChange} // Handle file selection
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <FontAwesomeIcon className='text-xl' icon={faPhotoFilm} />
                  </label>
                </div>
                <Button type="submit" disabled={processing} className='rounded-full'>
                  Post
                </Button>
              </div>
              {errors.content && <div className="text-red-500 mt-2">{errors.content}</div>}
            </div>
          </div>
        </form>

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
                  <Button className='rounded-full' variant='ghost'>
                    <FontAwesomeIcon className='text-xl' icon={faEllipsis} />
                  </Button>
                </div>
              </div>
              <p>{post.content}</p>
              {post.file_path && (
                <div className="mt-4">
                  {post.file_path.endsWith('.mp4') ? (
                    <video controls className="w-full rounded">
                      <source src={post.file_path} />
                    </video>
                  ) : (
                    <img
                      src={post.file_path}
                      alt="Uploaded"
                      className="w-full h-auto rounded"
                    />
                  )}
                </div>
              )}
              <div className='flex space-x-4 mt-4 text-lg text-pink-500'>
                <Button className='rounded-full hover:bg-pink-200 space-x-1 items-center' variant='ghost'>
                  <FontAwesomeIcon icon={faHeart} />
                  <h5>13K</h5>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
