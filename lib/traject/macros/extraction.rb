# frozen_string_literal: true

module Macros
  # DLME helpers for traject mappings
  module Extraction
    def self.apply_extraction_options(result, options = {})
      TransformPipeline.new(options).transform(result)
    end
    
    def self.traject_step(&block)
      TrajectStep.new(&block)
    end
    
    class TrajectStep
      attr_reader :block

      def initialize(&block)
        @block = block
      end
      
      def call(*args)
        block.call(*args)
      end
      
      def arity(*args)
        block.arity(*args)
      end
      
      def >(other)
        TrajectPipeline.new(self, wrap_lambda(other))
      end
      
      def |(other)
        TrajectPipeline.new(self, wrap_lambda(other))
      end

      private
      
      def wrap_lambda(other)
        if other.is_a? TrajectStep
          other
        else
          TrajectStep.new(&other)
        end
      end
    end
    
    class TrajectPipeline
      attr_reader :steps
      def initialize(*steps)
        @steps = steps
      end
      
      def call(record, accumulator, context)
        steps.inject(accumulator) { |acc, step| step.call(record, acc, context); acc }
      end
      
      def arity(*args)
        return method(:call).arity(*args)
      end

      def >(other)
        TrajectPipeline.new(self, other)
      end
      
      def |(other)
        TrajectPipeline.new(self, other)
      end
    end

    # Pipeline for transforming extracted values into normalized values
    class TransformPipeline
      attr_reader :options

      def initialize(options)
        @options = options
      end

      def transform(values)
        options.inject(values) { |memo, (step, params)| public_send(step, memo, params) }
      end

      def split(values, splitter)
        values.flat_map do |v|
          v.split(splitter)
        end
      end

      def trim(values, _)
        values.map(&:strip)
      end

      def translation_map(values, maps)
        translation_map = Traject::TranslationMap.new(*Array(maps))
        # without overwriting (further) translation map, could add
        # fuzzy match method here after pulling array out of TM
        values = Array(values).map(&:downcase)
        translation_map.translate_array values
      end

      def default(values, default_value)
        if values.present?
          values
        else
          default_value
        end
      end
    end
  end
end
