# frozen_string_literal: true

# Retrieve all the files from a directory within Github
class GithubImporter
  def initialize(oauth_token, repo)
    @gh = Octokit::Client.new(access_token: oauth_token)
    @repo = repo
  end

  # Creates a HarvestedResource for each file in the directory
  # Yields to the block once for each file in the directory
  # @yield [HarvestedResource] Gives the harvested resource
  def import(harvest, pipeline)
    gh.contents(repo, path: pipeline.config.directory).each do |resource|
      yield(retrieve_file(resource, harvest, pipeline))
    end
  end

  private

  attr_reader :gh, :repo

  # Creates a HarvestedResource and an ResourceContent if it doesn't already exist
  # for the resource harvested from Github
  # @param path [String] the resource to retrieve
  # @param harvest [Harvest] the harvest instance this resource belongs to
  # @param pipeline [Pipeline] the transformation pipeline this resource belongs to
  # @return [HarvestedResource] the newly created resource from github
  def retrieve_file(source_resource, harvest, pipeline)
    multihash = Multihashes.encode(source_resource.sha, 'sha1')

    resource = harvest.harvested_resources.create!(multihash: multihash,
                                                   url: source_resource.git_url,
                                                   original_filename: source_resource.path,
                                                   pipeline: pipeline)

    ResourceContent.persist(multihash) do
      blob = gh.blob(repo, source_resource.sha)
      decode(blob.content)
    end

    resource
  end

  # @param encoded [String] a Base64 encoded String
  # @return [String] the decoded text with UTF-8 encoding
  def decode(encoded)
    Base64.decode64(encoded).force_encoding('UTF-8')
  end
end
