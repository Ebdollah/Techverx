from django.shortcuts import render, get_object_or_404
from .models import Book
from django.db.models import Avg
from django.http import Http404

# Create your views here.

def index(request):
    all_books = Book.objects.all()
    no_of_books = all_books.count()
    avg_rating = all_books.aggregate(Avg('rating'))
    return render(request, 'book_outlet/index.html',{
        'books' : all_books,
        'no_of_books' : no_of_books,
        'avg_rating' : avg_rating
    })

def book_detail(request, book_id):
    # try:
    #    book = Book.objects.get(pk=book_id)
    # except:
    #     raise Http404()
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'book_outlet/book_detail.html',{
        'title' : book.title,
        'author' : book.author,
        'rating' : book.rating,
        'best_selling' : book.is_bestselling,
    })