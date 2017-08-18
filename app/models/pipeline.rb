# frozen_string_literal: true

# Represents the differnt types of a processing pipelines that are available
class Pipeline < ApplicationRecord
  def job
    case name
    when 'met_csv'
      MetCsvTransformJob
    when 'stanford_mods'
      ModsTransformJob
    when 'penn_tei'
      TeiTransformJob
    else
      raise "Pipeline '#{name}' does not have a job"
    end
  end

  def self.for(name)
    find_or_create_by(name: name)
  end
end
