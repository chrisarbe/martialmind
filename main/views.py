from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from datetime import datetime, date

# Create your views here.
def home(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        return render(request, 'login.html')
    
def dashboard(request):
    if request.user.is_authenticated:
        lista = Estudiante.objects.all()
        return render(request, 'dashboard.html', {
            'title':'Estudiante',
            'subtitle':'Administración de Estudiantes',
            'lista':lista,
            'title':'Dashboard',
            'subtitle':'Resumen de tu Sistema de Información'
        })
    else:
        return render(request, 'login.html')
    
def profile(request):
    if request.user.is_authenticated:
        return render(request, 'profile.html', {
            'title':'Mi Perfil',
            'subtitle':'Vista completa de tu Perfil'
            })
    else:
        return render(request, 'login.html')
    
def profile_user(request):
    item = Estudiante.objects.filter(usuario_id=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def asistencia(request):
    if request.user.is_authenticated:
        return render(request, 'asistencia.html', {
            'title':'Asistencia',
            'subtitle':'Módulo de Asistencias'
            })
    else:
        return render(request, 'login.html')
    
def asistencia_agregar(request):
    if request.method == 'GET':
        return render(request, 'asistencia.html', {
            'mesage':'Formulario Asistencia',
            'code':'1'
            })
    else:
        try:
            item = Estudiante.objects.filter(codigo_carnet=request.POST['estudiante'])
            estudiante_id = item[0].id
            documento_validar = Asistencia.objects.filter(fecha=date.today(), estudiante=item[0].id)
            if documento_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro de Asistencia HOY para el Estudiante: ' + item[0].nombre}, status=200)
            elif item[0].aldia == False:
                return JsonResponse({'message' : 'El Estudiante ' + item[0].nombre + ' no está al día con el pago', 'status' : '0'}, status=200)
            else:
                documento = Asistencia()
                documento.fecha = date.today()
                documento.hora = datetime.now().strftime("%H:%M:%S")
                documento.estudiante = Estudiante.objects.get(pk = estudiante_id)
                documento.save()
                return JsonResponse({'message' : 'Hola, Bienvenid@ ' + item[0].nombre, 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'asistencia.html', {
                'mesage':'Error',
                'code':'3'
                })
    
def estudiante_asistencia_traer(request):
    item = Estudiante.objects.filter(codigo_carnet=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def asistencia_adm(request):
    if request.user.is_authenticated:
        return render(request, 'asistencia_adm.html', {
            'title':'Administración de Asistencias',
            'subtitle':'Módulo de Administración de Asistencias'
            })
    else:
        return render(request, 'login.html')


def login_user(request):
    if request.method == 'GET':
        return render(request, 'login.html', {
            'mesage':'Bienvenido',
            'code':'1'
            })
    else:
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'login.html', {
                'mesage':'Usuario o Clave no válidos',
                'code':'2'
                })
        else:
            login(request, user)
            return redirect('dashboard')
        
def signout(request):
    logout(request)
    return redirect('login')

#----- Tipo de Documento -----#  
def tipo_documento(request):
    if request.user.is_authenticated:
        lista = TipoDocumento.objects.all()
        return render(request, 'tipo_documento.html', {
            'title':'Tipo de Documento',
            'subtitle':'Administración de Tipo de Documentos',
            'lista':lista
        })
    else:
        return render(request, 'login.html')

def tipo_documento_agregar(request):
    if request.method == 'GET':
        return render(request, 'tipo_documento.html', {
            'mesage':'Formulario Tipo de Documento',
            'code':'1'
            })
    else:
        try:
            nombre_validar = TipoDocumento.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Documento: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = TipoDocumento(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
            """return render(request, 'tipo_documento.html', {
                'mesage':'Guardado con Éxito',
                'code':'2'
                })"""
            #return redirect('/tipo_documento/', {'mesage': 'Registro Guardado con Éxito', 'code':'2'})
        except ValueError:
            return render(request, 'tipo_documento.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def tipo_documento_ver(request):
    item = TipoDocumento.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def tipo_documento_editar(request):
    if request.method == 'GET':
        return render(request, 'tipo_documento.html', {
            'mesage':'Formulario Tipo de Documento',
            'code':'1'
            })
    else:
        try:
            nombre_validar = TipoDocumento.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Documento: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = TipoDocumento.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                #return redirect('/tipo_documento/', {'mesage': 'Registro Actualizado con Éxito', 'code':'2'})
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def tipo_documento_borrar(request):
    try:
        item = TipoDocumento.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
        #return redirect('/tipo_documento/', {'mesage': 'Registro Borrado con Éxito', 'code':'2'})
    except ValueError:
        return render(request, 'tipo_documento.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Pais -----#
def pais(request):
    if request.user.is_authenticated:
        lista = Pais.objects.all()
        return render(request, 'pais.html', {
            'title':'País',
            'subtitle':'Administración de Paises',
            'lista':lista
        })
    else:
        return render(request, 'login.html')
    
def pais_agregar(request):
    if request.method == 'GET':
        return render(request, 'pais.html', {
            'mesage':'Formulario Pais',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Pais.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Pais: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            
            else:
                documento = Pais(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'pais.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def pais_editar(request):
    if request.method == 'GET':
        return render(request, 'pais.html', {
            'mesage':'Formulario Pais',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Pais.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Pais: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Pais.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def pais_ver(request):
    item = Pais.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def pais_borrar(request):
    try:
        item = Pais.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'pais.html', {
                'mesage':'Error',
                'code':'3'
                })

#----- Departamento -----#
def departamento(request):
    if request.user.is_authenticated:
        lista = Departamento.objects.all()
        paises = Pais.objects.all()
        print(paises)
        return render(request, 'departamento.html', {
            'title':'Departamento',
            'subtitle':'Administración de Departamentos',
            'lista':lista,
            'paises':paises
        })
    else:
        return render(request, 'login.html')

def departamento_agregar(request):
    if request.method == 'GET':
        return render(request, 'departamento.html', {
            'mesage':'Formulario Pais',
            'code':'1'
            })
    else:
        print("Este es ")
        print(dict(request.POST))
        try:
            nombre_validar = Departamento.objects.filter(nombre=request.POST['nombre'], pais=request.POST['pais'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Departamento: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Departamento()
                documento.nombre = request.POST['nombre']
                documento.pais = Pais.objects.get(pk = request.POST['pais'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def departamento_ver(request):
    item = Departamento.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def departamento_editar(request):
    if request.method == 'GET':
        return render(request, 'departamento.html', {
            'mesage':'Formulario Departamento',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Departamento.objects.filter(nombre=request.POST['nombre_editar'], pais=request.POST['pais_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Departamento: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Departamento.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.pais = Pais.objects.get(pk = request.POST['pais_editar'])
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)

def departamento_borrar(request):
    try:
        item = Departamento.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'departamento.html', {
                'mesage':'Error',
                'code':'3'
                })

#----- Municipio -----#
def municipio(request):
    if request.user.is_authenticated:
        lista = Municipio.objects.all()
        departamentos = Departamento.objects.all()
        return render(request, 'municipio.html', {
            'title':'Municipio',
            'subtitle':'Administración de Municipios',
            'lista':lista,
            'departamentos':departamentos
        })
    else:
        return render(request, 'login.html')

def municipio_agregar(request):
    if request.method == 'GET':
        return render(request, 'municipio.html', {
            'mesage':'Formulario Municipio',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Municipio.objects.filter(nombre=request.POST['nombre'], departamento=request.POST['departamento'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Municipio: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Municipio()
                documento.nombre = request.POST['nombre']
                documento.departamento = Departamento.objects.get(pk = request.POST['departamento'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def municipio_ver(request):
    item = Municipio.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def municipio_editar(request):
    if request.method == 'GET':
        return render(request, 'municipio.html', {
            'mesage':'Formulario Municipio',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Municipio.objects.filter(nombre=request.POST['nombre_editar'], departamento=request.POST['departamento_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Municipio: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Municipio.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.departamento = Departamento.objects.get(pk = request.POST['departamento_editar'])
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def municipio_borrar(request):
    try:
        item = Municipio.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'municipio.html', {
                'mesage':'Error',
                'code':'3'
                })

#----- EPS -----#  
def eps(request):
    if request.user.is_authenticated:
        lista = EntidadPromotoraSalud.objects.all()
        return render(request, 'eps.html', {
            'title':'Entidad Promotora de Salud',
            'subtitle':'Administración de Entidades Promotoras de Salud',
            'lista':lista
        })
    else:
        return render(request, 'login.html')

def eps_agregar(request):
    if request.method == 'GET':
        return render(request, 'eps.html', {
            'mesage':'Formulario Entidad Promotora de Salud',
            'code':'1'
            })
    else:
        try:
            nombre_validar = EntidadPromotoraSalud.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de EPS: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = EntidadPromotoraSalud(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'eps.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def eps_ver(request):
    item = EntidadPromotoraSalud.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def eps_editar(request):
    if request.method == 'GET':
        return render(request, 'eps.html', {
            'mesage':'Formulario Entidad Promotora de Salud',
            'code':'1'
            })
    else:
        try:
            nombre_validar = EntidadPromotoraSalud.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de EPS: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = EntidadPromotoraSalud.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def eps_borrar(request):
    try:
        item = EntidadPromotoraSalud.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'eps.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Profesion -----#
def profesion(request):
    if request.user.is_authenticated:
        lista = Profesion.objects.all()
        return render(request, 'profesion.html', {
            'title':'Profesión',
            'subtitle':'Administración de Profesiones',
            'lista':lista
        })
    else:
        return render(request, 'login.html')
    
def profesion_agregar(request):
    if request.method == 'GET':
        return render(request, 'profesion.html', {
            'mesage':'Formulario Profesión',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Profesion.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Profesión: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Profesion(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'profesion.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def profesion_ver(request):
    item = Profesion.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def profesion_editar(request):
    if request.method == 'GET':
        return render(request, 'profesion.html', {
            'mesage':'Formulario Profesión',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Profesion.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Profesión: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Profesion.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def profesion_borrar(request):
    try:
        item = Profesion.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'profesion.html', {
                'mesage':'Error',
                'code':'3'
                })

#----- Cinturon -----#
def cinturon(request):
    if request.user.is_authenticated:
        lista = Cinturon.objects.all()
        return render(request, 'cinturon.html', {
            'title':'Cinturón',
            'subtitle':'Administración de Cinturones',
            'lista':lista
        })
    else:
        return render(request, 'login.html')

def cinturon_agregar(request):
    if request.method == 'GET':
        return render(request, 'cinturon.html', {
            'mesage':'Formulario Cinturón',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Cinturon.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Cinturón: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Cinturon(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'cinturon.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def cinturon_ver(request):
    item = Cinturon.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def cinturon_editar(request):
    if request.method == 'GET':
        return render(request, 'cinturon.html', {
            'mesage':'Formulario Cinturón',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Cinturon.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Cinturón: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Cinturon.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def cinturon_borrar(request):
    try:
        item = Cinturon.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'cinturon.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Kwan -----#
def kwan(request):
    if request.user.is_authenticated:
        lista = Kwan.objects.all()
        return render(request, 'kwan.html', {
            'title':'Kwan',
            'subtitle':'Administración de Kwanes',
            'lista':lista
        })
    else:
        return render(request, 'login.html')
    
def kwan_agregar(request):
    if request.method == 'GET':
        return render(request, 'kwan.html', {
            'mesage':'Formulario Kwan',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Kwan.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Kwan: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Kwan(nombre=request.POST['nombre'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'kwan.html', {
                'mesage':'Error',
                'code':'3'
                })

def kwan_ver(request):
    item = Kwan.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def kwan_editar(request):
    if request.method == 'GET':
        return render(request, 'kwan.html', {
            'mesage':'Formulario Kwan',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Kwan.objects.filter(nombre=request.POST['nombre_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Kwan: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Kwan.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)

def kwan_borrar(request):
    try:
        item = Kwan.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'kwan.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Academia -----#
def academia(request):
    if request.user.is_authenticated:
        lista = Academia.objects.all()
        kwanes = Kwan.objects.all()
        municipios = Municipio.objects.all()
        return render(request, 'academia.html', {
            'title':'Academia',
            'subtitle':'Administración de Academias',
            'lista':lista,
            'kwanes':kwanes,
            'municipios':municipios
        })
    else:
        return render(request, 'login.html')
    
def academia_agregar(request):
    if request.method == 'GET':
        return render(request, 'academia.html', {
            'mesage':'Formulario Academia',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Academia.objects.filter(nombre=request.POST['nombre'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Academia: ' + str(request.POST['nombre']), 'status' : '0'}, status=200)
            else:
                documento = Academia()
                documento.nombre = request.POST['nombre']
                documento.kwan = Kwan.objects.get(pk = request.POST['kwan'])
                documento.direccion = request.POST['direccion']
                documento.telefono = request.POST['telefono']
                documento.correo = request.POST['correo']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'academia.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def academia_ver(request):
    item = Academia.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def academia_editar(request):
    if request.method == 'GET':
        return render(request, 'academia.html', {
            'mesage':'Formulario Academia',
            'code':'1'
            })
    else:
        try:
            nombre_validar = Academia.objects.filter(nombre=request.POST['nombre_editar'], kwan=request.POST['kwan_editar'])
            if nombre_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el nombre de Academia: ' + str(request.POST['nombre_editar']), 'status' : '0'}, status=200)
            else:
                documento = Academia.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.kwan = Kwan.objects.get(pk = request.POST['kwan_editar'])
                documento.direccion = request.POST['direccion_editar']
                documento.telefono = request.POST['telefono_editar']
                documento.correo = request.POST['correo_editar']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio_editar'])
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)

def academia_borrar(request):
    try:
        item = Academia.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'academia.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Acudiente -----#
def acudiente(request):
    if request.user.is_authenticated:
        lista = Acudiente.objects.all()
        tipo_documentos = TipoDocumento.objects.all()
        municipios = Municipio.objects.all()
        return render(request, 'acudiente.html', {
            'title':'Acudiente',
            'subtitle':'Administración de Acudientes',
            'lista':lista,
            'tipo_documentos':tipo_documentos,
            'municipios':municipios
        })
    else:
        return render(request, 'login.html')

def acudiente_agregar(request):
    if request.method == 'GET':
        return render(request, 'acudiente.html', {
            'mesage':'Formulario Acudiente',
            'code':'1'
            })
    else:
        try:
            documento_validar = Acudiente.objects.filter(documento=request.POST['documento'])
            if documento_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el Documento de Acudiente: ' + str(request.POST['nombre'] + ' ' + request.POST['apellido']), 'status' : '0'}, status=200)
            else:
                documento = Acudiente()
                documento.nombre = request.POST['nombre']
                documento.apellido = request.POST['apellido']
                documento.tipo_documento = TipoDocumento.objects.get(pk = request.POST['tipo_documento'])
                documento.documento = request.POST['documento']
                documento.direccion = request.POST['direccion']
                documento.telefono = request.POST['telefono']
                documento.correo = request.POST['correo']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'acudiente.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def acudiente_ver(request):
    item = Acudiente.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def acudiente_editar(request):
    if request.method == 'GET':
        return render(request, 'acudiente.html', {
            'mesage':'Formulario Acudiente',
            'code':'1'
            })
    else:
        try:
            documento_validar = Acudiente.objects.filter(documento=request.POST['documento_editar'])
            if documento_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el Documento de Acudiente: ' + str(request.POST['nombre_editar'] + ' ' + request.POST['apellido_editar']), 'status' : '0'}, status=200)
            else:
                documento = Acudiente.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.apellido = request.POST['apellido_editar']
                documento.tipo_documento = TipoDocumento.objects.get(pk = request.POST['tipo_documento_editar'])
                documento.documento = request.POST['documento_editar']
                documento.direccion = request.POST['direccion_editar']
                documento.telefono = request.POST['telefono_editar']
                documento.correo = request.POST['correo_editar']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio_editar'])
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def acudiente_borrar(request):
    try:
        item = Acudiente.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'acudiente.html', {
                'mesage':'Error',
                'code':'3'
                })

#----- Fecha de Pago -----#
def fecha_pago(request):
    if request.user.is_authenticated:
        lista = FechaPago.objects.all()
        return render(request, 'fecha_pago.html', {
            'title':'Fecha de Pago',
            'subtitle':'Administración de Fechas de Pago',
            'lista':lista
        })
    else:
        return render(request, 'login.html')
    
def fecha_pago_agregar(request):
    if request.method == 'GET':
        return render(request, 'fecha_pago.html', {
            'mesage':'Formulario Fecha de Pago',
            'code':'1'
            })
    else:
        try:
            valor_validar = FechaPago.objects.filter(valor=request.POST['valor'])
            if valor_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el valor de Fecha de Pago: ' + str(request.POST['valor']), 'status' : '0'}, status=200)
            else:
                documento = FechaPago(valor=request.POST['valor'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'fecha_pago.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def fecha_pago_ver(request):
    item = FechaPago.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def fecha_pago_editar(request):
    if request.method == 'GET':
        return render(request, 'fecha_pago.html', {
            'mesage':'Formulario Fecha de Pago',
            'code':'1'
            })
    else:
        try:
            valor_validar = FechaPago.objects.filter(valor=request.POST['valor_editar'])
            if valor_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el valor de Fecha de Pago: ' + str(request.POST['valor_editar']), 'status' : '0'}, status=200)
            else:
                documento = FechaPago.objects.get(pk=request.POST['pk_editar'])
                documento.valor = request.POST['valor_editar']
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def fecha_pago_borrar(request):
    try:
        item = FechaPago.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'fecha_pago.html', {
                'mesage':'Error',
                'code':'3'
                })
    
#----- Estudiante -----#
def estudiante(request):
    if request.user.is_authenticated:
        lista = Estudiante.objects.all()
        tipo_documentos = TipoDocumento.objects.all()
        municipios = Municipio.objects.all()
        profesiones = Profesion.objects.all()
        acudientes = Acudiente.objects.all()
        academias = Academia.objects.all()
        cinturones = Cinturon.objects.all()
        eps = EntidadPromotoraSalud.objects.all()
        fecha_pagos = FechaPago.objects.all()
        usuario = User.objects.all()
        return render(request, 'estudiante.html', {
            'title':'Estudiante',
            'subtitle':'Administración de Estudiantes',
            'lista':lista,
            'tipo_documentos':tipo_documentos,
            'municipios':municipios,
            'profesiones':profesiones,
            'acudientes':acudientes,
            'academias':academias,
            'cinturones':cinturones,
            'eps':eps,
            'fecha_pagos':fecha_pagos,
            'usuarios':usuario
        })
    else:
        return render(request, 'login.html')
    
def estudiante_agregar(request):
    if request.method == 'GET':
        return render(request, 'estudiante.html', {
            'mesage':'Formulario Estudiante',
            'code':'1'
            })
    else:
        try:
            documento_validar = Estudiante.objects.filter(documento=request.POST['documento'])
            if documento_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el Documento de Estudiante: ' + str(request.POST['nombre'] + ' ' + request.POST['apellido']), 'status' : '0'}, status=200)
            else:
                documento = Estudiante()
                documento.nombre = request.POST['nombre']
                documento.apellido = request.POST['apellido']
                documento.tipo_documento = TipoDocumento.objects.get(pk = request.POST['tipo_documento'])
                documento.documento = request.POST['documento']
                documento.fecha_nacimiento = request.POST['fecha_nacimiento']
                documento.direccion = request.POST['direccion']
                documento.telefono = request.POST['telefono']
                documento.correo = request.POST['correo']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio'])
                documento.acudiente = Acudiente.objects.get(pk = request.POST['acudiente'])
                documento.academia = Academia.objects.get(pk = request.POST['academia'])
                documento.cinturon = Cinturon.objects.get(pk = request.POST['cinturon'])
                documento.eps = EntidadPromotoraSalud.objects.get(pk = request.POST['eps'])
                documento.profesion = Profesion.objects.get(pk = request.POST['profesion'])
                documento.codigo_carnet = request.POST['codigo_carnet']
                documento.fecha_pago = FechaPago.objects.get(pk = request.POST['fecha_pago'])
                documento.usuario = User.objects.get(pk = request.POST['usuario'])
                documento.save()
                return JsonResponse({'message' : 'Registro Agregado con Éxito', 'status' : '1'}, status=200)
        except ValueError:
            return render(request, 'estudiante.html', {
                'mesage':'Error',
                'code':'3'
                })
        
def estudiante_ver(request):
    item = Estudiante.objects.filter(pk=request.POST['dato'])
    response = serializers.serialize("json", item)
    return HttpResponse(response, content_type='application/json')

def estudiante_editar(request):
    if request.method == 'GET':
        return render(request, 'estudiante.html', {
            'mesage':'Formulario Estudiante',
            'code':'1'
            })
    else:
        try:
            documento_validar = Estudiante.objects.filter(documento=request.POST['documento_editar'])
            if documento_validar.exists():
                return JsonResponse({'message' : 'Ya existe un registro con el Documento de Estudiante: ' + str(request.POST['nombre_editar'] + ' ' + request.POST['apellido_editar']), 'status' : '0'}, status=200)
            else:
                documento = Estudiante.objects.get(pk=request.POST['pk_editar'])
                documento.nombre = request.POST['nombre_editar']
                documento.apellido = request.POST['apellido_editar']
                documento.tipo_documento = TipoDocumento.objects.get(pk = request.POST['tipo_documento_editar'])
                documento.documento = request.POST['documento_editar']
                documento.fecha_nacimiento = request.POST['fecha_nacimiento_editar']
                documento.direccion = request.POST['direccion_editar']
                documento.telefono = request.POST['telefono_editar']
                documento.correo = request.POST['correo_editar']
                documento.municipio = Municipio.objects.get(pk = request.POST['municipio_editar'])
                documento.profesion = Profesion.objects.get(pk = request.POST['profesion_editar'])
                documento.acudiente = Acudiente.objects.get(pk = request.POST['acudiente_editar'])
                documento.academia = Academia.objects.get(pk = request.POST['academia_editar'])
                documento.cinturon = Cinturon.objects.get(pk = request.POST['cinturon_editar'])
                documento.eps = EntidadPromotoraSalud.objects.get(pk = request.POST['eps_editar'])
                documento.codigo_carnet = request.POST['codigo_carnet_editar']
                documento.fecha_pago = FechaPago.objects.get(pk = request.POST['fecha_pago_editar'])
                documento.usuario = User.objects.get(pk = request.POST['usuario_editar'])
                documento.save()
                return JsonResponse({'message' : 'Registro Actualizado con exito', 'status' : '1'}, status=200)
        except ValueError:
            return JsonResponse({'message' : 'Error', 'status' : '2'}, status=200)
        
def estudiante_borrar(request):
    try:
        item = Estudiante.objects.get(pk=request.POST['dato'])
        item.delete()
        return JsonResponse({'message' : 'Registro eliminado con exito', 'status' : '1'}, status=200)
    except ValueError:
        return render(request, 'estudiante.html', {
                'mesage':'Error',
                'code':'3'
                })

