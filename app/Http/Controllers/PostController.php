<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

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
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'name' => Auth::user()->name,
            'handle' => Auth::user()->handle,
            'content' => $request->input('content'),
        ]);

        return redirect()->route('home')->with('success', 'Post created successfully!');
    }
}

