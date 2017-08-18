# frozen_string_literal: true

# Imports the TEI files from the github directory configured in +Settings.import.directory.penn+
class PennImportJob < GithubImportJob
  self.import_directory = Settings.import.directory.penn
  self.pipeline = Pipeline.for('penn_tei')
end
