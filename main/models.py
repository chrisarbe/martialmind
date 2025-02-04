from django.db import models

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