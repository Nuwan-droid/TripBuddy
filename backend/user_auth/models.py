from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    """
    Custom manager for the User model.
    """
    def create_user(self, username, email, password=None, role='user', is_active=True):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, role=role, is_active=is_active)
        user.is_staff = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password, role='admin', is_active=True)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model based on the existing users table.
    """
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
        ('guest', 'Guest'),
    )

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Required for admin interface

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def _str_(self):
        return self.username
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'    