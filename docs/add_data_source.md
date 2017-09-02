# How-To Add a Data Provider

When adding a new data provider and input structure, there are several areas of the system
that must be updated. The system [settings.yml](../config/settings.yml) file must be updated
to include your new provider in the harvester jobs. A [configuration file](#config) must be written, and
optionally a [traject macro](#macro).

## Steps

1. [Add source to](#settings) [settings.yml](../config/settings.yml)
2. [Establish data mapping](#mapping)
3. [Write spec to test data mapping and provide fixture data for testing](#test)
4. [Write mapping configuration](#config)
5. [[Optional] Write mapping macro for data transformations](#macro)

### Settings <a name="settings" />

1. At the end of the sources section, add your new source.
2. Give it a meaningful id (see existing examples): `my_new_source`
3. Assign the directory within the repository that data files will be located (see: [dlme-metadata](https://github.com/waynegraham/dlme-metadata))
4. If a single file will exists (i.e. for a large CSV file) set the `only` setting. Example: `only: !ruby/regexp '/egyptian-20170820.csv/'`
5. Assign the traject configuration file: `traject_file: my_new_source_config`
6. Assign any appropriate properties. Example:
```
`agg_provider`: [NAME OF DATA PROVIDER]
`inst_id`: short id prefix [i.e. `my_source`]
```

#### Example configuration

```
# data source name; required, unique
stanford_mods:
  # The directory for the data in GitHub repo ; required
  directory: # e.g. maps/records/stanford
  # Regex for what file to pull from source GH directory ; optional
  only: # e.g. !ruby/regexp '/met_museum_records.csv/'
  # Traject Mapping config file found in lib/traject ; required
  traject_file: # e.g. stanford_mods_config
  # Settings for the data import source ; required
  properties:
    # Who delivered the data directly to DLME ; required
      agg_provider: # e.g. Stanford Libraries
      # Who created the data originally ; optional
      agg_data_provider: # e.g. Stanford Libraries
      # Prefixes the solr document ID ; optional
      inst_id: # e.g. stanford
```

### Data mapping <a name="mapping" />

Review the [application profile](application_profile.md) to determine available and required fields.
These are the field names that will be used in your configuration mapping.

### Test data mapping <a name="test" />

Add a `my_new_source_spec.rb` file to `spec/import`.

#### Required test structure

```
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming My New Data Source file' do
  let(:indexer) { Pipeline.for('[MY_ID_USED_IN_SETTINGS]').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'csv/[my_new_fixture file]') }
  let(:data) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    indexer.settings['exhibit_slug'] = slug
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
      dlme = JSON.parse(json)
      expect(dlme['agg_provider']).to eq 'EXPECTED VALUE FROM FIXTURE'
      ..repeat for all fields to test..
    end
  end
end
```

### Mapping configuration <a name="config" />

The following instructions are based on the original documentation for the [Traject Project](https://github.com/traject/traject).

Start by creating a new file in `lib/traject` named for the source: `my_new_source_config.rb`.

#### Mapping CSV Data

CSV configurations have the following requirements that must be included at the begining of
your configuration file:

```
require_relative 'csv_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/extraction'
require_relative 'macros/csv'
extend Macros::DLME
extend Macros::Csv

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'CsvReader'
end
```

Then, for each field in your mapping, a `to_field` command is required:

`to_field('output field name'), column('csv_column_name', [OPTIONS])`

#### Mapping XML Data

XML configurations have the following requirements that must be included at the beginning of
your configuration file:

```
equire_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/extraction'
require_relative 'macros/xml'
extend Macros::DLME
extend Macros::Xml

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
end
```
Then, for each field in your mapping, a `to_field` command is required:

`to_field('output field name'), extract_xml(xpath)`

### Mapping macro <a name="macro" />

This step is entirely optional and dependent on the needs of the particular data
to be translated.

Traject macros provide a facility for more complex data transformation. These are
advanced settings, [review existing macros](../lib/traject/macros) for examples of
macro structure.

#### transform_values

One important macro to be aware of is the provided `tranform_values` macro that is
use for complex/hierarchical data structures, namely for the `agg_is_shown_at` and `agg_is_shown_by`
fields.

Example:

```
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('URI')])
end
```

## Testing configuration

Run your import spec:

`rspec spec/import/my_new_source_spec.rb`

## Verifying data file mapping

```
bundle exec traject -c config/traject.rb -c lib/traject/my_new_source_config.rb -s source='my_source' -w DebugWriter
[PATH TO COMPLETE DATA FILE]
```
