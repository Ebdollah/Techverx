from django.db import models

# Create your models here.

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    enrollment_date = models.DateField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publication_date = models.DateField()

    def __str__(self):
        return f'{self.title} {self.author}'

class Course(models.Model):
    course_name = models.CharField(max_length=255)
    course_description = models.TextField()
    books = models.ManyToManyField(Book, related_name='courses')

    def __str__(self):
        return f'{self.course_name}'

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField()
    grade = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f'{self.student} {self.course} {self.grade}'

