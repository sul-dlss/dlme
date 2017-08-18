# frozen_string_literal: true

# Imports the MODS files from the github directory configured in +Settings.import.directory.stanford+
class StanfordImportJob < GithubImportJob
  self.import_directory = Settings.import.directory.stanford
  self.pipeline = Pipeline.for('stanford_mods')
end
