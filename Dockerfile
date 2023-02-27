FROM node:18.14.2

# Need chrome for headless browser tests. However, this build will fail on M1
# Macs because Chrome does not ship with ARM compatibility. Furthermore, the
# unit tests do not run and there are currently no instructions to run the test.
# Therefore, revisit this at a later time to install an ARM-compatible headless
# browser and get the tests running again.

ENV PUPPETEER_SKIP_DOWNLOAD true

# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# Need firebase
RUN npm i -g firebase-tools @angular/cli

# Install dependencies
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
WORKDIR /code
RUN npm ci

# Build angular app
COPY . /code
RUN ng build

# Run the app
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
