FROM denoland/deno

EXPOSE 8000
WORKDIR /app
ADD . /app

RUN deno cache main.js
CMD ["task", "run"]
