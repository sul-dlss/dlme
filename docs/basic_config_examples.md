# DLME Configuration Examples

The example configurations below are generic and considered kick-off examples in order to
provide a basis for getting started writing your own configurations. There are further required
setting, review how to [add a data source](add_data_source.md) for more information on a
complete configuration.

## Source data formats

1. [Comma Separated Values](#csv)
2. [XML / MODS](#mods)
3. [MARC](#marc)

## Comma Separated Values

### Example Source Data

```
id,title,thumbnail_url
1,Title of First Item,http://www.example.com/thumbs/1.jpg
2,Title of Second Item,http://www.example.com/thumbs/2.jpg
3,Title of Third Item,http://www.example.com/thumbs/3.jpg
```

### Example Configuration

```
to_field('wr_id'), normalize_prefixed_id('id')
to_field('cho_title'), column('title')
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('thumbnail_url')])
end
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
```

## XML / MODS

### Example Source Data

```
<?xml version="1.0" encoding="UTF-8"?>
<mods xmlns="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="3.3" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-3.xsd">
  <titleInfo>
    <title>XML Item Title</title>
  </titleInfo>
  <thumbnail>
    <resource>http://www.example.com/thumbs/12345.jpg</resource>
  </thumbnail>
</mods>
```

### Example Configuration

```
to_field('wr_id'), generate_mods_id
to_field('cho_title'), extract_mods('/*/mods:titleInfo/mods:title', )
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [extract_mods('/*/mods:thumbnail/mods:resource')
end
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
```

## MARC

### Example Configuration

```
to_field 'wr_id', extract_marc('001', first: true)
to_field 'cho_title', extract_marc('245', trim_punctuation: true)
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
```
