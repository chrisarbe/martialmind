web: gunicorn martialmind.wsgi:application --bind 0.0.0.0:9000 --preload
postdeploy: python manage.py collectstatic --noinput