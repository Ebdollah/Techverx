from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import HttpResponseNotFound
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

def monthly_challenges_by_number(request, month):
    months = list(monthly_challenges.keys())
    if month > len(months):
        return HttpResponseNotFound("Invalid month")
    redirect_month = months[month - 1]
    redirect_path = reverse("month_challenge", args=[redirect_month])
    return HttpResponseRedirect(redirect_month)
    # return HttpResponseRedirect("/challenges/" + redirect_month)
    # return HttpResponse(monthly_challenges[months[month]])


def monthly_challenge(request, month):
    challenge_text = None
    if month in monthly_challenges.keys():
        challenge_text = monthly_challenges[month]
    else:
        return "None"
    return HttpResponse(challenge_text)