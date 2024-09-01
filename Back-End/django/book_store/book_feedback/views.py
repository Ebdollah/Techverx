from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import ReviewForm
from .models import Feedback


# Create your views here.

def review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)

        if form.is_valid():
            print(form.cleaned_data)
            feedback = Feedback(
                user_name= form.cleaned_data['user_name'],
                review_text = form.cleaned_data['review_text'],
                rating = form.cleaned_data['rating'],
            )
            feedback.save()
            return HttpResponseRedirect("/submitted-data")

    else:
        form = ReviewForm()

    return render(request, "book_feedback/review.html", {
        "form": form
    })


# render(request, 'book_feedback/review.html')

def review_detail(request):
    return render(request, 'book_feedback/submitted.html')