from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login as auth_login
from django.conf import settings as conf_settings

def login(request):
    if request.user.is_authenticated:
        return redirect(conf_settings.LOGIN_REDIRECT_URL)
    
    form = None
    if request.method == 'POST':
        form = AuthenticationForm(data = request.POST)
        if form.is_valid():
            user = authenticate(
                username = form.cleaned_data['username'],
                password = form.cleaned_data['password'])
            auth_login(request, user)
            return redirect(conf_settings.LOGIN_REDIRECT_URL)
    if form == None:
        form = AuthenticationForm()
    context = { 'form' : form }
    return render(request, 'registration/login.html', context)

def register(request):
    if request.user.is_authenticated:
        return redirect(conf_settings.LOGIN_REDIRECT_URL)
    
    form = None
    if request.method == 'POST':
        form = UserCreationForm(data = request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(
                username = form.cleaned_data['username'],
                password = form.cleaned_data['password'])
            auth_login(request, user)
            return redirect(conf_settings.LOGIN_REDIRECT_URL)
    if form == None:
        form = UserCreationForm()
    context = { 'form' : form }
    return render(request, 'registration/register.html', context)