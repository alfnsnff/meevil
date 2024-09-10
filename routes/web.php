<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/explore', function () {
    return Inertia::render('Explore');
})->middleware(['auth', 'verified'])->name('Explore');

Route::get('/favorites', function () {
    return Inertia::render('favorite');
})->middleware(['auth', 'verified'])->name('Favorites');

Route::middleware('auth')->group(function () {
    Route::get('/post', [PostController::class, 'index'])->name('post.index'); // Adjust as needed
    Route::post('/post', [PostController::class, 'store'])->name('post.store'); // Route for creating a post
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
