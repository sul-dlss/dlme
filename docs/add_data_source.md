# How To Add Data to DLME from a New Provider

When adding data to DLME from a new data provider, there are several areas of multiple codebases that must be updated. In this document, we walk through all the necessary steps and link to examples to help clarify the process.

This process leverages extensions to Traject, a configuration-based MARC to Solr indexer written in Ruby. We have extended it to provide configuration-based conversion from your data source (available as XML, CSV, JSON, or binary MARC21) to the DLME MAP as JSON. Configuration-based conversion means each data from a new provider utilizes a new configuration file to indicate their mappings and some fixed fields. The mappings in the configurations are meant to be as simple as possible to write so that providers don't need to be programmers to write these. To read more about our extensions to Traject for this data pipeline, you can read our [Traject Extensions documentation](extensions_to_traject.md).

## Steps

1. [Load Your Metadata into Our DLME Metadata GitHub Repository](#1-stage-your-metadata)
2. [Create a Branch on This GitHub Repository](#2-create-a-dlme-github-repo-branch)
3. [Add Your Data Source's Settings](#3-add-your-data-source-settings)
4. [Establish data mapping](#4-create-your-data-mapping)
5. [Write mapping configuration](#config)
6. [[Optional] Write mapping macro for data transformations](#macro)
7. [Write spec to test data mapping and provide fixture data for testing](#test-data-mapping)
8. [Create Your Pull Request]()

## 1. Stage Your Metadata

At present, this DLME prototype loads metadata from this DLME Metadata GitHub repository: https://github.com/waynegraham/dlme-metadata. You will need to add your metadata - in the appropriate directory - via a pull request to that DLME Metadata GitHub repository for it to be loaded by our pipeline.

## 2. Create a DLME GitHub Repository Branch

With your metadata staged in the [DLME Metadata GitHub repository](https://github.com/waynegraham/dlme-metadata), you now need prepare a pull request on this DLME application GitHub repository to add the new data source configuration, update the loading settings to load the new metadata, add a data conversion test for your new metadata mapping, and add any other optional code for your new data conversion.

## 3. Add Your Data Source Settings

You need to update the `config/settings.yml` file for this application codebase to include information for the new data source. To do so:

1. At the end of the sources section in [config/settings.yml](../config/settings.yml), following the existing format.
2. Give it a meaningful and unique data source name (see existing examples): `stanford_mods:` or `my_new_source:`.
3. Indicate the directory within the [DLME metadata repository](https://github.com/waynegraham/dlme-metadata) where your metadata files are located.
4. If your metadata is in only 1 file within the DLME Metadata repository directory indicated, used the optional regex lookup `only: !ruby/regexp '/egyptian-20170820.csv/'`
5. Indicate the Traject configuration file that you will be adding in the next step: `traject_file: my_new_source_config`
6. Assign any appropriate, static properties for your metadata. Example:
```
`agg_provider`: Stanford University
`inst_id`: short id prefix [i.e. `my_source` or `stanford_mods`]
```

### Example configuration

```
# example of the settings with comments for clarity
# data source name; required information & needs to be unique:
stanford_mods:
  # The directory for the data in GitHub repo ; required
  directory: maps/records/stanford
  # Regex for what file to pull from source GH directory ; optional
  only: !ruby/regexp '/met_museum_records.csv/'
  # Traject Mapping config file found in lib/traject ; required
  traject_file: stanford_mods_config
  # Settings for the data import source ; required
  properties:
    # Who delivered the data directly to DLME ; required
    agg_provider: Stanford University Libraries
    # Who created the data originally ; optional
    agg_data_provider: Stanford Geospatial Library
    # Prefixes the solr document ID ; optional
    inst_id: stanford_mods
```

## 4. Create Your Data Mapping

Metadata ingested into the DLME needs to be mapped to the DLME Metadata Application Profile (MAP), or the available classes, fields, and definitions (including requirements) for objects described in DLME. You can read more details on the [DLME MAP at this link.](application_profile.md)

After understanding the DLME MAP, you need to provide a metadata mapping from your provided metadata to our DLME MAP. You need to pay special attention to the required fields (identifier, title, language if applicable and URL to view the object). To get started, you can view existing mappings or add your own mapping to our open DLME Mappings Google spreadsheet.](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit) Where possible, make sure to map DLME field names as found in the DLME spreadsheet tab to XPath, Objectpath (for JSON), headers for columns (if CSV), or MARC fields (if MARC) - this will ease the configuration writing process (the next step).

You do not need to add to this mapping spreadsheet, but it can help with writing our your configuration in the next step.

## 5. Create Your Mapping Configuration

The following instructions are based on the original documentation for [Traject](https://github.com/traject/traject), the tool we use and expand in our DLME data pipeline.

Start by creating a new file in `lib/traject` named for the source (e.g. `my_new_source_config.rb` or `stanford_mods.rb` - whatever you put in your addition to `config/settings.yml`).

### Mapping CSV Data

All CSV configurations must have the following at the top of your configuration file:

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

```
to_field('DLME field name'), column('Your CSV column name', [OPTIONS])
```

More help for CSVs:
- [read more about CSV configuration files here](csv_data_transforms.md)
- [look at generic CSV configurations here](basic_config_examples.md#comma-separated-values)
- review [this Metropolitan Museum of Art CSV configuration as an example here](../lib/traject/met_csv_config.rb)

### Mapping XML Data

All XML configurations must have the following at the top of your configuration file:

```
require_relative 'xml_reader'
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
Then, for each field (Xpath) in your mapping, a `to_field` command is required:

`to_field('output field name'), extract_xml(xpath)`

More help for XML files:
- [read more about XML configuration files (including MODS, FGDC, and TEI) here](xml_data_transforms.md)
- [look at generic XML configurations here](basic_config_examples.md#xml)
- review [this MODS configuration as an example here](../lib/traject/mods_config.rb)

### Mapping Binary MARC Data

All binary MARC configurations must have the following at the top of your configuration file:

```
require 'traject/macros/marc21_semantics'
require 'traject/macros/marc_format_classifier'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/dlme_marc'
require_relative 'macros/extraction'

extend Macros::DLME
extend Traject::Macros::Marc21Semantics
extend Traject::Macros::MarcFormats
extend Macros::DlmeMarc

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'MarcReader'
end

to_field 'id', extract_marc('001', first: true) do |_record, accumulator, _context|
  accumulator.collect! { |s| "penn_#{s}" }
end
```
Then, for each MARC field and subfield in your mapping, a `to_field` command is required:

`to_field('output field name'), extract_marc(MARC field and subfield)`

Fields and subfields can be used or just fields can be used. Also, you can indicate multiple MARC fields in one mapping. Examples:

`to_field('cho_title'), extract_marc(245)`

`to_field('cho_creator'), extract_marc(100a)`

`to_field('cho_subject'), extract_marc(600:650)`

For more help for MARC files:
- [read more about MARC configuration files in the original Traject Project documentation]( )
- [look at generic MARC configurations here](basic_config_examples.md#binary-marc)
- review [this Pennsylvania University MARC configuration as an example here](../lib/traject/marc_config.rb)

## 6. Mapping Macros

Macros are additions to Traject that allow for more complication mappings - fields you need to normalize, add conditionals to, or other types of logic. Adding Macros is entirely optional and dependent on the needs of the particular data to be translated as well as your comfort with Ruby and lambdas.

Traject macros provide a facility for more complex data transformation. These are advanced settings, [review existing macros](../lib/traject/macros) for examples of macro structure.

### transform_values

One important macro to be aware of is the provided `tranform_values` macro that is use for complex/hierarchical data structures, namely for the `agg_is_shown_at` and `agg_is_shown_by` fields.

Example:

```
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('URI')])
end
```

## 7. Test data mapping

Add a `my_new_source_spec.rb` file to `spec/import`.

### Data Test Structure

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

### Testing configuration

Run your import spec:

`rspec spec/import/my_new_source_spec.rb`

### Running Your Data Locally Verifying data file mapping

```
bundle exec traject -c config/traject.rb -c lib/traject/my_new_source_config.rb -s source='my_source' -w DebugWriter
[PATH TO COMPLETE DATA FILE]
```

## 8. Create a Pull Request
