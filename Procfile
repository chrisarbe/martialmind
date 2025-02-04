web: gunicorn martialmind.wsgi:application --bind 0.0.0.0:9000 --preload
postdeploy: python manage.py collectstatic && chmod -R 755 staticfiles/ --noinput