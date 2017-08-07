# frozen_string_literal: true

# Retrieve all the files from a directory within Github
class GithubImporter
  def initialize(oauth_token, user, repo)
    @gh = Github.new(oauth_token: oauth_token)
    @user = user
    @repo = repo
  end

  # Yields to the block once for each file in the directory
  # @yield [path, file] Gives the filename and filecontents to the block for
  def import(path)
    directory_list(path).each do |file_ref|
      yield(file_ref.path, retrieve_file(file_ref.sha))
    end
  end

  private

  attr_reader :gh, :user, :repo

  def retrieve_file(file_sha)
    blob = gh.git_data.blobs.get(user, repo, file_sha)
    Base64.decode64(blob.content)
  end

  # Return the SHA of the directory given by the path argument
  def directory_list_sha(base: tree_sha, path:)
    first, *rest = *path
    return find_dir_url(base, first) if rest.empty?
    directory_list_sha(base: find_dir_url(base, first), path: rest)
  end

  def directory_list(path)
    gh.git_data.trees.get(user, repo, directory_list_sha(path: path.split('/'))).tree
  end

  def tree_sha
    master = gh.repos.branches.get(user: user, repo: repo, branch: 'master')
    master.commit.commit.tree.sha
  end

  def find_dir_url(base_sha, name)
    gd = gh.git_data.trees.get(user, repo, base_sha)
    gd.tree.find { |n| n.path == name }.sha
  end
end
