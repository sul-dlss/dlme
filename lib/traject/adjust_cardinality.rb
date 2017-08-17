# frozen_string_literal: true

# Given a data structure from traject, transform it into a valid IR by changing
# some values from arrays to scalars
class AdjustCardinality
  def self.call(attributes)
    new(attributes).call
  end

  def initialize(attributes)
    # %w(id agg_data_provider agg_provider agg_is_shown_at agg_is_shown_by agg_preview)
    @source = attributes
  end

  attr_reader :source

  def call
    flatten_web_resources(flatten_top_level(source))
  end

  def flatten_top_level(attributes)
    flatten = %w[id agg_data_provider agg_provider agg_is_shown_at agg_is_shown_by agg_preview]
    attributes.except(*flatten).tap do |output|
      flatten.each do |field|
        next unless attributes.key?(field)
        value = attributes.fetch(field).first
        output[field] = value
      end
    end
  end

  def flatten_web_resources(attributes)
    flatten = %w[agg_is_shown_at agg_is_shown_by agg_preview]
    attributes.except(*flatten).tap do |output|
      flatten.each do |field|
        next unless attributes.key?(field)
        output[field] = process_web_resource(attributes.fetch(field))
      end
    end
  end

  def process_web_resource(wr)
    res = process_node(wr, %w[wr_id])
    res.except('wr_has_service').tap do |resource|
      resource['wr_has_service'] = flatten_services(res.fetch('wr_has_service')) if res.key?('wr_has_service')
    end
  end

  def flatten_services(services)
    services.map { |svc| process_service(svc) }
  end

  def process_service(service)
    process_node(service, %w[service_id service_implements])
  end

  def process_node(original, fields)
    original.except(*fields).tap do |corrected|
      fields.each do |field|
        corrected[field] = original.fetch(field).first
      end
    end
  end
end
