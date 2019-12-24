FROM gdml/nuxt-base:2.0.0

ADD . /srv
RUN yarn build

ENV NODE_ENV production

HEALTHCHECK CMD yarn healthcheck