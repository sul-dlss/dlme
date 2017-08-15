# frozen_string_literal: true

# Imports the MODS files from the github directory configured in +Settings.import.directory.stanford+
class StanfordImportJob < GithubImportJob
  private

  def process_file(filename, mods)
    identifier = "stanford_#{filename.sub('.mods', '')}"
    process_mods(identifier, mods)
  end

  def import_directory
    Settings.import.directory.stanford
  end

  def process_mods(identifier, mods)
    indexer = Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => Settings.import.slug)
    indexer.load_config_file('lib/traject/mods_config.rb')
    indexer.process(mods)
  end
end
