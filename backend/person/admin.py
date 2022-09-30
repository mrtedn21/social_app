from django.contrib import admin

from person.models import Person, Gender, City, Country, Language


admin.site.register(Person)
admin.site.register(Gender)
admin.site.register(City)
admin.site.register(Country)
admin.site.register(Language)
