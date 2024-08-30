from book_outlet.models import Book

harry_potter = Book(title = 'HP-1', rating=5)
harry_potter.save()

lord_of_rings = Book(title = 'Lord of Rings - 2', rating=4)
lord_of_rings.save()

#now if we run this program, we will be able to save
#data in database using save() command
#Now if we want to see no of items in database yet we will:

Book.objects.all()
Book.objects.all()[0].title

#As I have added __str__ method in models file then we should be able
#to see output clearly


#Note:: I don't need to run migrations again as I just added method

#Now I have added new fields so I need to run migrations
#so now storing value in object

harry_potter = Book.objects.all()[0]
harry_potter.title
harry_potter.author = 'JK Rouwling' #it will update the data
harry_potter.save()

#Now lets create several data

Book.objects.create(title='Maze Runner',author='James Dashner', rating=5, is_bestselling=True)
Book.objects.create(title='HxH',author='Yoshihiro Togashi', rating=5, is_bestselling=True)
Book.objects.create(title='Vagabond ',author='Takehiko Inoue', rating=5, is_bestselling=False)

len(Book.objects.all()) #4

Book.objects.get(title="HxH")  #it will only give me one entry, so use that condition which has only 1
# <Book: HxH has 5 ratings, it's author is Yoshihiro Togashi and currently bestselling True>

Book.objects.filter(is_bestselling = True) #to get multiple items from search

#for conditional filtering,
from django.db.models import Q
Book.objects.filter(rating__gt=3)
Book.objects.filter(Q(rating__gt=3) | Q(title__contains='bond'))