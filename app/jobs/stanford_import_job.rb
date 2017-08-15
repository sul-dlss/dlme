# frozen_string_literal: true

# Imports the MODS files from the github directory configured in +Settings.import.directory.stanford+
class StanfordImportJob < GithubImportJob
  private

  # This is called once for each file in the directory
  def process_file(filename, mods)
    identifier = "stanford_#{filename.sub('.mods', '')}"
    ModsTransformJob.perform_later(identifier, mods)
  end

  def import_directory
    Settings.import.directory.stanford
  end
end
