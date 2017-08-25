# frozen_string_literal: true

require 'csv'

# Reads in CSV records for traject
class CsvReader
  # @param input_stream [File]
  # @param settings [Traject::Indexer::Settings]
  def initialize(input_stream, settings)
    @settings = Traject::Indexer::Settings.new settings
    @input_stream = input_stream
    @csv = CSV.parse(input_stream, headers: true)
  end

  delegate :each, to: :csv

  attr_reader :csv
end
