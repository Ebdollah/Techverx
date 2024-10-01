"""
URL configuration for djcrm project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from tkinter.font import names

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LoginView, LogoutView
from leads.views import landing_page, signup_page

# https://github.com/justdjango/getting-started-with-django/blob/20-static-files/templates/base.html

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', landing_page, name='landing_page'),
    path('leads/', include('leads.urls'), name ="leads"),
    path('agents/', include('agents.urls'), name ="agents"),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name = 'logout'),
    path('signup/', signup_page, name='signup'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# if settings.DEBUG:
#     urlpatterns +=

