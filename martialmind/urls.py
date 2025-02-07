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
    path('estudiante_profile/ver/', views.profile_user, name='estudiante_profile'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.signout, name='logout'),
    path('asistencia/', views.asistencia, name='asistencia'),
    path('asistencia_estudiante/', views.estudiante_asistencia_traer, name='asistencia_estudiante'),
    path('asistencia/agregar/', views.asistencia_agregar, name='asistencia_agregar'),
    path('asistencia/adm/', views.asistencia_adm, name='asistencia_adm'),
    path('asistencia/traer/', views.asistencia_traer, name='asistencia_traer'),
    path('asistencia/estudiantes/traer/', views.estudiantes_traer, name='estudiantes_traer'),
    # Tipo de Documento
    path('tipo_documento/', views.tipo_documento, name='tipo_documento'),
    path('tipo_documento/agregar/', views.tipo_documento_agregar, name='tipo_documento_agregar'),
    path('tipo_documento/ver/', views.tipo_documento_ver, name='tipo_documento_ver'),
    path('tipo_documento/editar/', views.tipo_documento_editar, name='tipo_documento_editar'),
    path('tipo_documento/borrar/', views.tipo_documento_borrar, name='tipo_documento_borrar'),
    # Entidad Promotora de Salud
    path('eps/', views.eps, name='eps'),
    path('eps/agregar/', views.eps_agregar, name='eps_agregar'),
    path('eps/ver/', views.eps_ver, name='eps_ver'),
    path('eps/editar/', views.eps_editar, name='eps_editar'),
    path('eps/borrar/', views.eps_borrar, name='eps_borrar'),
    # Profesion
    path('profesion/', views.profesion, name='profesion'),
    path('profesion/agregar/', views.profesion_agregar, name='profesion_agregar'),
    path('profesion/ver/', views.profesion_ver, name='profesion_ver'),
    path('profesion/editar/', views.profesion_editar, name='profesion_editar'),
    path('profesion/borrar/', views.profesion_borrar, name='profesion_borrar'),
    # Cinturon
    path('cinturon/', views.cinturon, name='cinturon'),
    path('cinturon/agregar/', views.cinturon_agregar, name='cinturon_agregar'),
    path('cinturon/ver/', views.cinturon_ver, name='cinturon_ver'),
    path('cinturon/editar/', views.cinturon_editar, name='cinturon_editar'),
    path('cinturon/borrar/', views.cinturon_borrar, name='cinturon_borrar'),
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
    # Kwan
    path('kwan/', views.kwan, name='kwan'),
    path('kwan/agregar/', views.kwan_agregar, name='kwan_agregar'),
    path('kwan/ver/', views.kwan_ver, name='kwan_ver'),
    path('kwan/editar/', views.kwan_editar, name='kwan_editar'),
    path('kwan/borrar/', views.kwan_borrar, name='kwan_borrar'),
    # Academia
    path('academia/', views.academia, name='academia'),
    path('academia/agregar/', views.academia_agregar, name='academia_agregar'),
    path('academia/ver/', views.academia_ver, name='academia_ver'),
    path('academia/editar/', views.academia_editar, name='academia_editar'),
    path('academia/borrar/', views.academia_borrar, name='academia_borrar'),
    # Acudiente
    path('acudiente/', views.acudiente, name='acudiente'),
    path('acudiente/agregar/', views.acudiente_agregar, name='acudiente_agregar'),
    path('acudiente/ver/', views.acudiente_ver, name='acudiente_ver'),
    path('acudiente/editar/', views.acudiente_editar, name='acudiente_editar'),
    path('acudiente/borrar/', views.acudiente_borrar, name='acudiente_borrar'),
    # Fecha de Pago
    path('fecha_pago/', views.fecha_pago, name='fecha_pago'),
    path('fecha_pago/agregar/', views.fecha_pago_agregar, name='fecha_pago_agregar'),
    path('fecha_pago/ver/', views.fecha_pago_ver, name='fecha_pago_ver'),
    path('fecha_pago/editar/', views.fecha_pago_editar, name='fecha_pago_editar'),
    path('fecha_pago/borrar/', views.fecha_pago_borrar, name='fecha_pago_borrar'),
    # Estudiante
    path('estudiante/', views.estudiante, name='estudiante'),
    path('estudiante/agregar/', views.estudiante_agregar, name='estudiante_agregar'),
    path('estudiante/ver/', views.estudiante_ver, name='estudiante_ver'),
    path('estudiante/editar/', views.estudiante_editar, name='estudiante_editar'),
    path('estudiante/borrar/', views.estudiante_borrar, name='estudiante_borrar'),
]
