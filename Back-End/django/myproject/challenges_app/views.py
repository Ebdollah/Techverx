from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import HttpResponseNotFound
# from django.template.loader import render_to_string
from django.urls import reverse

# Create your views here.

# def jan(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
#
# def feb(request):
#     return HttpResponse("Hello, world. Feb month")
#
# def mar(request):
#     return HttpResponse("Hello, March")

monthly_challenges = {
    "january" : "January month is aazingjwqdij qwuqw",
    "february" : "February month is aazingjwqdij qwuqw",
    "march" : "March month is aazingjwqdij qwuqw",
    "april" : "April month is aazingjwqdij qwuqw",
    "may" : "May month is aazingjwqdij qwuqw",
    "june" : "June month is aazingjwqdij qwuqw",
    "july" : "July month is aazingjwqdij qwuqw",
    "august" : "August month is aazingjwqdij qwuqw",
    "september" : "September month is aazingjwqdij qwuqw",
    "october" : "October month is aazingjwqdij qwuqw",
    "november" : "November month is aazingjwqdij qwuqw",
    "december" : "December month is aazingjwqdij qwuqw",
}

def month_list(request):
    months = list(monthly_challenges.keys())

    return render(request, "challenges/index.html", {
        "months_list": months, #so index.html will have months list which will we loop in file
        #in index file we can see how can we dynamically make url
    })  #so there is no need of below code, just saving it for reference.
    #####################################################################################
    # for month in months:
    #     month_path = reverse("month_challenge", args=[month])
    #     list_items += f"<li><a href=\"{month_path}\">{month}</a></li>"
    # response_data = f"<ul>{list_items}</ul>"
    # return HttpResponse(response_data)

def monthly_challenges_by_number(request, month):
    months = list(monthly_challenges.keys())
    if month > len(months):
        return HttpResponseNotFound("Invalid month")
    redirect_month = months[month - 1]
    redirect_path = reverse("month_challenge", args=[redirect_month])
    return HttpResponseRedirect(redirect_path)
    # return HttpResponseRedirect("/challenges/" + redirect_month)
    # return HttpResponse(monthly_challenges[months[month]])


def monthly_challenge(request, month):
    try:
        challenge_text = monthly_challenges[month]
        return render(request , "challenges/challenges.html",{
            "month_title": month,
            "month_text" : challenge_text, #to use DTL inside HTML file we need to implement this
        }) #we can access text inside html file as you can see in your
    except:
        return HttpResponseNotFound()
    # challenge_text = None
    # if month in monthly_challenges.keys():
    #     challenge_text = f"<h1>{monthly_challenges[month]}</h1>"
    # else:
    #     return "None"
    # return HttpResponse(challenge_text)