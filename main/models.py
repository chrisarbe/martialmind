from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class TipoDocumento(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class EntidadPromotoraSalud(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class Profesion(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class Cinturon(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class Kwan(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class Pais(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Departamento(models.Model):
    nombre=models.CharField(max_length=100)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Municipio(models.Model):
    nombre=models.CharField(max_length=100)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
class Academia(models.Model):
    nombre=models.CharField(max_length=100)
    kwan=models.ForeignKey(Kwan, on_delete=models.CASCADE)
    direccion=models.CharField(max_length=100)
    telefono=models.CharField(max_length=100)
    correo=models.EmailField()
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
class Acudiente(models.Model):
    nombre=models.CharField(max_length=100)
    apellido=models.CharField(max_length=100)
    tipo_documento=models.ForeignKey(TipoDocumento, on_delete=models.CASCADE)
    documento=models.CharField(max_length=20)
    telefono=models.CharField(max_length=20)
    correo=models.EmailField()
    direccion=models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
class FechaPago(models.Model):
    valor=models.CharField(max_length=7)

    def __str__(self):
        return self.valor
    
class Estudiante(models.Model):
    nombre=models.CharField(max_length=100)
    apellido=models.CharField(max_length=100)
    tipo_documento=models.ForeignKey(TipoDocumento, on_delete=models.CASCADE)
    documento=models.CharField(max_length=20)
    fecha_nacimiento=models.DateField()
    telefono=models.CharField(max_length=20)
    correo=models.EmailField()
    direccion=models.CharField(max_length=100)
    municipio = models.ForeignKey(Municipio, on_delete=models.CASCADE)
    eps = models.ForeignKey(EntidadPromotoraSalud, on_delete=models.CASCADE)
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE)
    cinturon = models.ForeignKey(Cinturon, on_delete=models.CASCADE)
    acudiente = models.ForeignKey(Acudiente, on_delete=models.CASCADE, null=True, blank=True)
    academia = models.ForeignKey(Academia, on_delete=models.CASCADE)
    codigo_carnet=models.CharField(max_length=8)
    fecha_pago = models.ForeignKey(FechaPago, on_delete=models.CASCADE)
    usuario=models.ForeignKey(User, on_delete=models.CASCADE, default='1', null=True, blank=True)
    aldia=models.BooleanField(default=False)

    def __str__(self):
        return self.nombre
    
    def monitorias_requeridas(self):
        # Cinturones que deben hacer 30 monitorías
        cinturones_30 = ["Verde", "Azul", "Violeta"]
        # Cinturones que deben hacer 60 monitorías
        cinturones_60 = ["Rojo", "Rojo Café", "Café", "Café Negro"]

        if self.cinturon.nombre in cinturones_30:
            return 30
        elif self.cinturon.nombre in cinturones_60:
            return 60
        return 0
    
class Asistencia(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    fecha=models.DateField()
    hora=models.TimeField()

    def __str__(self):
        return self.estudiante.nombre

class Monitoria(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    fecha=models.DateField()

    def __str__(self):
        return self.estudiante.nombre