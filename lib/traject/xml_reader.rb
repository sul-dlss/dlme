# frozen_string_literal: true

# Reads in XML records for traject
class XmlReader
  # @param input_stream [File]
  # @param settings [Traject::Indexer::Settings]
  def initialize(input_stream, settings)
    @settings = Traject::Indexer::Settings.new settings
    @input_stream = input_stream
    @xml = Nokogiri::XML(input_stream)
  end

  attr_reader :xml

  def each
    yield(xml)
  end
end
