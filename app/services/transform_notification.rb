# frozen_string_literal: true

# Sends SNS messge that says a transform was requested
class TransformNotification
  def self.publish(data_dir)
    new.publish(data_dir)
  end

  def publish(data_dir)
    client.publish(
      topic_arn: Settings.sns.topic_arn,
      message: message(data_dir)
    )
  end

  private

  def client
    Aws::SNS::Client.new
  end

  def message(data_dir)
    JSON.generate(data_dir: data_dir)
  end
end
