"""
URL configuration for martialmind project.

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
from django.contrib import admin
from django.urls import path
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('profile/', views.profile, name='profile'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.signout, name='logout'),
    # Tipo de Documento
    path('tipo_documento/', views.tipo_documento, name='tipo_documento'),
    path('tipo_documento/agregar/', views.tipo_documento_agregar, name='tipo_documento_agregar'),
    path('tipo_documento/ver/', views.tipo_documento_ver, name='tipo_documento_ver'),
    path('tipo_documento/editar/', views.tipo_documento_editar, name='tipo_documento_editar'),
    path('tipo_documento/borrar/', views.tipo_documento_borrar, name='tipo_documento_borrar'),
    # Pais
    path('pais/', views.pais, name='pais'),
    path('pais/agregar/', views.pais_agregar, name='pais_agregar'),
    path('pais/ver/', views.pais_ver, name='pais_ver'),
    path('pais/editar/', views.pais_editar, name='pais_editar'),
    path('pais/borrar/', views.pais_borrar, name='pais_borrar'),
    # Departamento
    path('departamento/', views.departamento, name='departamento'),
    path('departamento/agregar/', views.departamento_agregar, name='departamento_agregar'),
    path('departamento/ver/', views.departamento_ver, name='departamento_ver'),
    path('departamento/editar/', views.departamento_editar, name='departamento_editar'),
    path('departamento/borrar/', views.departamento_borrar, name='departamento_borrar'),
    # Municipio
    path('municipio/', views.municipio, name='municipio'),
    path('municipio/agregar/', views.municipio_agregar, name='municipio_agregar'),
    path('municipio/ver/', views.municipio_ver, name='municipio_ver'),
    path('municipio/editar/', views.municipio_editar, name='municipio_editar'),
    path('municipio/borrar/', views.municipio_borrar, name='municipio_borrar'),
]
