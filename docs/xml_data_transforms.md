# Information for DLME XML Data Transforms

XML data transforms are trigged through the options passed to the Xpath selector:

```
to_field 'DLME Field', column('XPath', [OPTIONS])
```

## Generate XML Transforms

*Available Generic XML Transforms* are _append_, _insert_, _replace_, _split_, and _trim_.

### translation map

**Option:** string
**Purpose:** Split the column text into an array based on the splitter string
**Note:** If any other transforms will also be run on the content, *split* should always be first.

Example:
```
to_field 'selected_field', column('CSV Column', split: '|')
```

## MODS Specific Transforms


## FGDC Specific Transforms


## TEI Specific Transforms



## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
