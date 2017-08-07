if Settings.s3.upload_bucket
  Riiif::Image.file_resolver = Riiif::HTTPFileResolver.new
  Riiif::Image.file_resolver.id_to_uri = lambda do |id|
    aws_file = Spotlight::FeaturedImage.find(id).image.file
    raise Riiif::ImageNotFoundError, "unable to find file for #{id}" if aws_file.nil?

    aws_file.file.presigned_url('GET')
  end
else
  Riiif::Image.file_resolver = Spotlight::CarrierwaveFileResolver.new
end
# Riiif::Image.authorization_service = IIIFAuthorizationService

# Riiif.not_found_image = 'app/assets/images/us_404.svg'
#
Riiif::Engine.config.cache_duration_in_days = 365
