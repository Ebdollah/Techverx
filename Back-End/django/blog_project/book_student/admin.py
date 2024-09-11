from django.contrib import admin

from book_student.models import Student, Enrollment, Course, Book

# Register your models here.

admin.site.register(Book)
admin.site.register(Student)
admin.site.register(Enrollment)
admin.site.register(Course)