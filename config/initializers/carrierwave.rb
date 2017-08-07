if Settings.s3.upload_bucket
  CarrierWave.configure do |config|
    config.storage = :aws
    config.aws_bucket = Settings.s3.upload_bucket
    config.aws_acl = 'bucket-owner-full-control'
  end

  Spotlight::Engine.config.uploader_storage = :aws
end
