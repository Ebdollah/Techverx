
from django.shortcuts import render, redirect, get_object_or_404
from .forms import LeadForm, LeadModelForm, CustomUserCreationForm
from .models import Lead, Agent
from django.shortcuts import reverse
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
# Create your views here.

def signup_page(request):
    form = CustomUserCreationForm()
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
           form.save()
           return redirect('login')
    context = {
        'form' : form
    }
    return render(request, 'registration/signup.html', context)

@login_required
def landing_page(request):
    return render(request, "lead_landing.html")

@login_required
def lead_list(request):
    leads = Lead.objects.all()
    context = {
        "leads" : leads
    }
    return render(request, 'leads/lead_list.html', context)

@login_required
def lead_detail(request, pk):
    print(pk)
    lead = Lead.objects.get(id = pk)
    context = {
        'lead' : lead
    }
    return render(request, 'leads/lead_detail.html', context)

@login_required
def lead_create(request):
    form = LeadModelForm()
    if request.method == 'POST':
        print('Got POST data')
        form = LeadModelForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            send_mail(
                subject="Urgent leave",
                message="lorem ipsum lorem need for water",
                from_email="me@gmail.com",
                recipient_list=["ebdollah@gmail.com"]
            )
            form.save()
            # Lead.objects.create(**form.cleaned_data)
            return redirect('leads:lead_list')  # Add 'return' here
    context = {
        'form': form
    }
    return render(request, 'leads/lead_create.html', context)

@login_required
def lead_update(request, pk):
    lead = get_object_or_404(Lead, id=pk)

    if request.method == 'POST':
        form = LeadModelForm(request.POST, instance=lead)
        if form.is_valid():
            form.save()  # Automatically saves the lead instance
            return redirect('leads:lead_list')
    else:
        form = LeadModelForm(instance=lead)  # Pre-fill with existing data

    context = {
        'lead': lead,
        'form': form
    }
    return render(request, 'leads/lead_update.html', context)

@login_required
def lead_delete(request, pk):
    lead = Lead.objects.get(id=pk)
    # lead = get_object_or_404(Lead, id=pk)
    print(lead)
    lead.delete()
    return redirect('leads:lead_list')

