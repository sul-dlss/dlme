# frozen_string_literal: true

# Sends SNS messge that says a transform was requested
class TransformNotification
  def self.publish
    new.publish
  end

  def publish
    client.publish(
      topic_arn: Settings.sns.topic_arn,
      message: message
    )
  end

  private

  # Currently just an empty object, but we could expand this if we want to give
  # more information to the transformer
  def message
    '{}'
  end

  def client
    Aws::SNS::Client.new
  end
end
