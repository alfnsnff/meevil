<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Google\Cloud\Storage\StorageClient;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
// In app/Http/Controllers/PostController.php
    public function index()
    {

        $posts = Post::all(); // Fetch all posts from the database
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'content' => 'required|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,mp4|max:20480',
        ]);
    
        // Create a new post
        $post = new Post();
        $post->user_id = auth()->id();
        $post->name = auth()->user()->name;
        $post->handle = auth()->user()->handle;
        $post->content = $request->input('content');
    
        try {
            // Handle file upload
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                
                // Generate a unique filename and store the file in the 'uploads' folder
                $filePath = 'uploads/' . uniqid() . '.' . $file->getClientOriginalExtension();
                
                // Upload the file to Google Cloud Storage
                $storage = new StorageClient([
                    'keyFilePath' => env('GOOGLE_CLOUD_KEY_FILE'),
                ]);
                $bucket = $storage->bucket(env('GOOGLE_CLOUD_BUCKET'));
    
                $object = $bucket->upload(
                    fopen($file->getRealPath(), 'r'),
                    [
                        'name' => $filePath,
                        // Remove 'predefinedAcl' since uniform bucket-level access is enabled
                    ]
                );
    
                // Get the file URL
                $post->file_path = $object->signedUrl(new \DateTime('+1 hour')); // Adjust expiration as needed
            }
    
            // Save the post
            $post->save();
    
            // Redirect or respond
            return redirect()->route('home');
        } catch (\Exception $e) {
            Log::error('Error uploading file to Google Cloud Storage: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to upload file'], 500);
        }
    }
    


}

