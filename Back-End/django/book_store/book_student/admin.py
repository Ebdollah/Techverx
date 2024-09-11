from django.contrib import admin

from book_outlet.models import Book
from book_student.models import Student, Enrollment, Course

# Register your models here.

admin.site.register(Book)
admin.site.register(Student)
admin.site.register(Enrollment)
admin.site.register(Course)