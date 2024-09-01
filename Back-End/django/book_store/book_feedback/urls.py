from django.urls import path
from book_feedback import views

urlpatterns = [
    path('', views.review, name='review'),
    path('submitted-data', views.review_detail, name='review-detail'),
]