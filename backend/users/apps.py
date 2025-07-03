from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # (if you have this line, keep it)
    name = 'backend.users'