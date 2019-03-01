# frozen_string_literal: true

# AWS is sending 'Content-type: text/plain', but it's a json body.
# This allows Rails to deserialize the method body properly
# See https://forums.aws.amazon.com/thread.jspa?threadID=69413
class FixSnsJsonMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    env['CONTENT_TYPE'] = 'application/json' if env['PATH_INFO'] == '/transform_result' && env['REQUEST_METHOD'] == 'POST'
    @app.call(env)
  end
end
