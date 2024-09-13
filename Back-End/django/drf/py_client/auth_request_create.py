
import requests
from getpass import getpass

auth_endpoint = "http://localhost:8000/api/auth/"
password = getpass()

auth_response = requests.post(auth_endpoint, json={"username": 'drf', "password": password})
data = [
    {"title": "Python's Object-Oriented Programming Concepts",
     "content": "A deep dive into classes, objects, inheritance, and polymorphism in Python.",
     "price": "79.99"},
    {"title": "Advanced Data Structures in Python: Beyond Lists and Dictionaries",
     "content": "Explore advanced data structures like heaps, stacks, queues, and trees.",
     "price": "129.99"},
    {"title": "Web Scraping with Python: A Practical Guide",
     "content": "Learn how to extract data from websites using libraries like BeautifulSoup and Scrapy.",
     "price": "149.99"},
    {"title": "Machine Learning Fundamentals in Python",
     "content": "Introduction to machine learning concepts, algorithms, and implementation in Python.",
     "price": "199.99"},
    {"title": "Natural Language Processing with Python",
     "content": "Explore techniques for working with text data, including sentiment analysis and text classification.",
     "price": "249.99"},
    {"title": "Building Web Applications with Django",
     "content": "A comprehensive guide to creating web applications using the Django framework.",
     "price": "179.99"},
    {"title": "Data Visualization with Python: Matplotlib and Seaborn",
     "content": "Learn how to create informative and visually appealing data visualizations.",
     "price": "99.99"},
    {"title": "Python for Data Science: A Hands-On Approach",
     "content": "A practical introduction to data science using Python libraries like NumPy, Pandas, and Scikit-learn.",
     "price": "229.99"},
    {"title": "Introduction to Python Testing: Unit, Integration, and Functional Tests",
     "content": "Learn best practices for writing effective tests in Python.",
     "price": "59.99"},
    {"title": "Python for Automation: Scripting and Task Automation",
     "content": "Discover how to automate repetitive tasks using Python scripts.",
     "price": "79.99"}
]
dt = {"title": "What is the purpose of Polymorphism",
        "content": "Updated content goes here oiefhiuf iuefheiurf h4uihf fuefhef heufhef",
        "price": "500.00"}
if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        "Authorization": f"Bearer {token}"
    }
    endpoint = "http://localhost:8000/api/products/"

    for d in data:
        get_response = requests.post(endpoint, data=d, headers=headers)
        if get_response.status_code == 200:
           print(get_response.json())