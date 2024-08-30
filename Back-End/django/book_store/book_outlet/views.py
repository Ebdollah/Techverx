from django.shortcuts import render, get_object_or_404
from .models import Book
from django.http import Http404

# Create your views here.

def index(request):
    all_books = Book.objects.all()
    return render(request, 'book_outlet/index.html',{
        'books' : all_books
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