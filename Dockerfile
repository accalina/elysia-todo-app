FROM accalina/bun:1.0.0-smallest

WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
CMD ["bun", "start"]
