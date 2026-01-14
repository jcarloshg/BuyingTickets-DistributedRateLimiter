# 1. Use Node.js LTS (slim) for smaller/faster images
FROM node:20-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Create nodeuser user/nodegroup group. Never run Node as root, even in dev.
RUN addgroup --system nodegroup \
    && adduser --system --ingroup nodegroup nodeuser

# 4. Copy only package.json/lock to leverage Docker layer cache for node_modules
COPY package*.json ./

# 5. Install all (non-prod) dependencies, so dev tools (tsx, types, eslint...) are present
RUN npm ci

# 6. Change ownership of /app to the nodeuser user
RUN chown -R nodeuser:nodegroup /app

# 7. Switch to nodeuser (non-root) user for all following steps
USER nodeuser

# 8. Copy the rest of the source *or* mount it in docker-compose for auto-reload (see below)
COPY --chown=nodeuser:nodegroup . .

# 9. Set environment to development by default in container
ENV NODE_ENV=development
ENV PORT=4000

# 10. Expose main API port and Node.js debugger port for VSCode/etc
EXPOSE 4000 9229

# 11. Recommended CMD for dev mode: tsx live reload, watches changes
CMD [ "npm", "run", "dev" ]

# --------------------------
# Docker Compose recommended for volumes:
#
# version: '3'
# services:
#   app:
#     build:
#       context: .
#       dockerfile: Dockerfile.dev
#     ports:
#       - 4000:4000
#       - 9229:9229
#     volumes:
#       - .:/app
#       - /app/node_modules # Use container node_modules always!
#     env_file:
#       - .env
#
# --------------------------
