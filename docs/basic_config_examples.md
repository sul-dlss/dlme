# DLME Configuration Examples

The example configurations below are generic and considered kick-off examples in order to
provide a basis for getting started writing your own configurations. There are further required
setting, review how to [add a data source](add_data_source.md) for more information on a
complete configuration.

## Source data formats

1. [Comma Separated Values](#comma-separated-values)
2. [XML](#xml)
  * [MODS/XML](mods-xml)
  * [FGDC/XML](fgdc-xml)
  * [TEI/XML](tei-xml)
3. [Binary MARC](#binary-marc)

## Comma Separated Values

#### Example Source Data

```
id,title,thumbnail_url
1,Title of First Item,http://www.example.com/thumbs/1.jpg
2,Title of Second Item,http://www.example.com/thumbs/2.jpg
3,Title of Third Item,http://www.example.com/thumbs/3.jpg
```

#### Example Configuration

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

## XML

### MODS

#### Example Source Data

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

#### Example Configuration

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

### FGDC

#### Example Source Data

```
<?xml version="1.0" encoding="UTF-8"?>

```

#### Example Configuration

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

### TEI

#### Example Source Data

```
<?xml version='1.0' encoding='UTF-8'?>
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt>
        <title>Description of University of Pennsylvania LJS 394: Section of Tāj al-lughah wa-ṣiḥāḥ al-ʻArabīyah</title>
      </titleStmt>
      <publicationStmt>
        <publisher>The University of Pennsylvania Libraries</publisher>
        <availability>
          <licence target="http://creativecommons.org/licenses/by/4.0/legalcode">
                                This description is ©2015 University of
                                Pennsylvania Libraries. It is licensed under a Creative Commons
                                Attribution License version 4.0 (CC-BY-4.0
                                https://creativecommons.org/licenses/by/4.0/legalcode. For a
                                description of the terms of use see the Creative Commons Deed
                                https://creativecommons.org/licenses/by/4.0/. </licence>
        </availability>
      </publicationStmt>
      <sourceDesc>
        <msDesc>
          <msIdentifier>
            <settlement>Philadelphia</settlement>
            <institution>University of Pennsylvania</institution>
            <repository>Rare Book &amp; Manuscript Library</repository>
            <idno type="call-number">LJS 394</idno>
            <altIdentifier type="bibid">
              <idno>5440810</idno>
            </altIdentifier>
            <altIdentifier type="resource">
              <idno>http://hdl.library.upenn.edu/1017/d/medren/5440810</idno>
            </altIdentifier>
          </msIdentifier>
          <msContents>
            <summary>Volume from a 14th-century copy of a 10th-century dictionary of the Arabic language. Words are indexed by their last root letter, with this volume covering the letters za' to lam. Marginal notes by a reader and proofreader. Later pastedown on inner cover has remedies written in Arabic and Persian.</summary>
            <textLang mainLang="heb" otherLangs="jrb">Hebrew</textLang>
            <msItem>
              <title>Section of Tāj al-lughah wa-ṣiḥāḥ al-ʻArabīyah</title>
              <author>Jawharī, Ismāʻīl ibn Ḥammād, d. 1003?</author>
            </msItem>
          </msContents>
          <physDesc>
            <objectDesc>
              <supportDesc material="paper">
                <support>
                  <p>paper</p>
                </support>
                <extent>203 leaves : 269 x 172 (198 x 125) mm. bound to 269 x 180 mm</extent>
              </supportDesc>
              <layoutDesc>
                <layout>Written in 27 long lines.</layout>
              </layoutDesc>
            </objectDesc>
            <scriptDesc>
              <scriptNote>Written in naskh script.</scriptNote>
            </scriptDesc>
            <decoDesc>
              <decoNote>Illuminated title page (f. 1r) in Mamluk style; significant words in red.</decoNote>
            </decoDesc>
            <bindingDesc>
              <binding>
                <p>Repaired leather, blind-stamped center medallion and cornerpieces.</p>
              </binding>
            </bindingDesc>
          </physDesc>
          <history>
            <origin>
              <p>Written in Egypt or Syria in the 14th century.</p>
              <origDate>13--</origDate>
              <origPlace>Egypt or Syria</origPlace>
            </origin>
            <provenance>Ownership stamps on title page canceled (f. 1r).</provenance>
          </history>
        </msDesc>
      </sourceDesc>
    </fileDesc>
    <profileDesc>
      <textClass>
        <keywords n="subjects">
          <term>Arabic language--Dictionaries</term>
          <term>Traditional medicine--Formulae, receipts, prescriptions</term>
        </keywords>
        <keywords n="form/genre">
          <term>Codices</term>
          <term>Dictionaries</term>
        </keywords>
      </textClass>
    </profileDesc>
  </teiHeader>
</TEI>
```

#### Example Configuration

```
to_field 'id', lambda { |_record, accumulator, context|
  bare_id = default_identifier(context)
  accumulator << identifier_with_prefix(context, bare_id)
}

to_field 'cho_publisher', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:publicationStmt'/tei:publisher")
to_field 'cho_dc_rights', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:publicationStmt'/tei:availability/tei:licence", trim: true)
to_field 'cho_identifier', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:msIdentifier/tei:idno[@type='call-number']")
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:msIdentifier/tei:altIdentifier[@type='resource']/tei:idno")])
end
to_field 'cho_description', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:msContents/tei:summary")
to_field 'cho_language', main_language
to_field 'cho_language', other_languages
to_field 'cho_title', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:msContents/tei:msItem/tei:title")
to_field 'cho_creator', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:msContents/tei:msItem/tei:author")
to_field 'cho_date', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:history/tei:origin/tei:origDate")
to_field 'cho_spatial', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:history/tei:origin/tei:origPlace")
to_field 'cho_provenance', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:history/tei:provenance")
to_field 'cho_extent', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:physDesc/tei:objectDesc/tei:layoutDesc/tei:layout")
to_field 'cho_extent', extract_tei("/*/tei:teiHeader/tei:fileDesc/tei:physDesc/tei:objectDesc/tei:supportDesc[@material="paper"]/tei:extent")
to_field 'cho_subject', extract_tei("/*/tei:teiHeader/tei:profileDesc/tei:textClass/tei:keywords[@n='form/genre']/tei:term")
to_field 'cho_subject', extract_tei("/*/tei:teiHeader/tei:profileDesc/tei:textClass/tei:keywords[@n='subjects']/tei:term")
to_field 'agg_provider', provider # set in the settings.yml file
```

## Binary MARC

#### Example Source Data

```

```

#### Example Configuration

```
to_field 'id', extract_marc('001', first: true) do |_record, accumulator, _context|
  accumulator.collect! { |s| "penn_#{s}" }
end
to_field 'cho_alternative', extract_marc('130:240:246')
to_field 'cho_contributor', extract_role('700', 'contributor')
to_field 'cho_creator', extract_marc('100:110:111', trim_punctuation: true)
to_field 'cho_date', marc_publication_date
to_field 'cho_description', extract_marc('500:505:520')
to_field 'cho_edm_type', marc_type_to_edm
to_field 'cho_extent', extract_marc('300a', separator: nil, trim_punctuation: true)
to_field 'cho_format', marc_formats
to_field 'cho_has_type', extract_marc('651a', trim_punctuation: true)
to_field 'cho_identifier', extract_marc('001')
to_field 'cho_identifier', oclcnum
to_field 'cho_language', marc_languages
to_field 'cho_medium', extract_marc('300b', trim_punctuation: true)
to_field 'cho_publisher', extract_marc('260b:264b', trim_punctuation: true)
to_field 'cho_spatial', marc_geo_facet
to_field 'cho_subject', extract_marc('600:610:611:630:650:651:653:654:690:691:692')
to_field 'cho_temporal', marc_era_facet
to_field 'cho_title', extract_marc('245', trim_punctuation: true)
to_field 'cho_type', marc_type_to_edm

to_field 'agg_data_provider', data_provider # set in the settings.yml file
to_field 'agg_provider', provider # set in the settings.yml file
to_field 'agg_has_view' do |_record, accumulator, context|
  accumulator << transform_values(context, 'wr_id' => extract_marc('856u', first: true))
end
```
