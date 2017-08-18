# frozen_string_literal: true

# Imports the MODS files from the github directory configured in +Settings.import.directory.museum+
class MetCsvImportJob < GithubImportJob
  private

  # This is called once for each file in the directory
  def process_file(filename, met_csv)
    identifier = "met_museum_records_#{filename.sub('.csv', '')}"
    MetCsvTransformJob.perform_later(identifier, met_csv)
  end

  def import_directory
    Settings.import.directory.metcsv
  end
end
