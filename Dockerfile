FROM oven/bun:1

WORKDIR /

COPY . .

RUN BUN INSTALL

EXPOSE 3000

CMD ["bun", "src/index.tsx"]