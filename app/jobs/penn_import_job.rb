# frozen_string_literal: true

# Imports the TEI files from the github directory configured in +Settings.import.directory.penn+
class PennImportJob < GithubImportJob
  private

  def process_file(filename, tei)
    identifier = "penn_#{filename.sub('.xml', '')}"
    process_tei(identifier, tei)
  end

  def import_directory
    Settings.import.directory.penn
  end

  def process_tei(identifier, tei)
    indexer = Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => Settings.import.slug)
    indexer.load_config_file('lib/traject/tei_config.rb')
    indexer.process(tei)
  end
end
