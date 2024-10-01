from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import reverse
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from leads.models import Agent
from .forms import AgentModelForm


@login_required()
def AgentListView(request):
    oraganisation = request.user.userprofile
    agents = Agent.objects.filter(oraganisation = oraganisation)
    print(agents)
    context = {
        'agents' : agents
    }
    return render(request, "agents/agent_list.html", context)

@login_required()
def AgentCreateView(request):
    form = AgentModelForm()
    if request.method == 'POST':
        form = AgentModelForm(request.POST)
        if form.is_valid():
            agent = form.save(commit=False)
            agent.organisation = request.user.userprofile
            agent.save()
            return redirect('agents:agents_list')
    context = {
        'form' : form
    }
    return render(request, "agents/agent_create.html", context)


@login_required()
def AgentDetailView(request, pk):
    # oraganisation = request.user.userprofile
    # agent = Agent.objects.filter(oraganisation=oraganisation)
    agent = Agent.objects.get(id = pk)
    context = {
        'agent' : agent
    }
    return render(request, 'agents/agent_detail.html', context)

@login_required()
def AgentUpdateView(request, pk):
    agent = get_object_or_404(Agent, id=pk)
    if request.method == 'POST':
        form = AgentModelForm(request.POST, instance=agent)
        form.save()
        return redirect('agents:agents_list')
    else:
        form = AgentModelForm(instance=agent)

    return render(request, 'agents/agent_update.html',{'form':form, 'agent':agent})

@login_required()
def AgentDeleteView(request, pk):
    agent = Agent.objects.get(id=pk)
    # lead = get_object_or_404(Lead, id=pk)
    print(agent)
    agent.delete()
    return redirect('agents:agents_list')
