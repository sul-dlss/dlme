# Compiling assets takes a long time, so be generous in dev and test environments
Slowpoke.timeout = 60 if Rails.env.development? or Rails.env.test?
