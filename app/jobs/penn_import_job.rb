# frozen_string_literal: true

# Imports the TEI files from the github directory configured in +Settings.import.directory.penn+
class PennImportJob < GithubImportJob
  private

  # This is called once for each file in the directory
  def process_file(filename, tei)
    identifier = "penn_#{filename.sub('.xml', '')}"
    TeiTransformJob.perform_later(identifier, tei)
  end

  def import_directory
    Settings.import.directory.penn
  end
end
