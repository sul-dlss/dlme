# frozen_string_literal: true

# Imports the MODS files from the github directory configured in +Settings.import.directory.museum+
class MetCsvImportJob < GithubImportJob
  self.import_directory = Settings.import.directory.metcsv
  self.pipeline = Pipeline.for('met_csv')
end
