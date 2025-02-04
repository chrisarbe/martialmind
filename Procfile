web: gunicorn martialmind.wsgi:application --bind 0.0.0.0:9000 --preload
postdeploy: chmod -R 755 staticfiles/ && python manage.py collectstatic --noinput