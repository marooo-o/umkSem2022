import os

class BaseConfig:
    """Base configuration."""

    # main config
    SECRET_KEY = 'registration_service_key'
    SECURITY_PASSWORD_SALT = 'registration_service_salt'
    DEBUG = os.environ.get('DEBUG', True)
    # SERVER_NAME = 'umksem2022'
    # WTF_CSRF_ENABLED = True
    # DEBUG_TB_ENABLED = False
    # DEBUG_TB_INTERCEPT_REDIRECTS = False
    # APPLICATION_ROOT = '/register-api'

    # mail settings
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    # gmail authentication
    MAIL_USERNAME = 'umksem2022@gmail.com'
    MAIL_PASSWORD = 'dxwoygwovcabsesc'

    # mail accounts
    MAIL_DEFAULT_SENDER = 'umksem2022@gmail.com'

    MONGODB_SETTINGS = {
        'db': 'test_database',
        'host': 'mongodb+srv://umkSem2022:umkSem2022pass@cluster0.9dowp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        'port': 27017
    }
