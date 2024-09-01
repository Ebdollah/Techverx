from django.db import models

# Create your models here.

class Author(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField()

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.full_name()

class Tag(models.Model):
    caption = models.CharField(max_length=200)

    def __str__(self):
        return self.caption

class Post(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    # image = models.ImageField(upload_to="posts/")
    image_name = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=True)
    slug = models.SlugField(unique=True, db_index=True)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True, related_name='posts')
    posts_tag = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title




