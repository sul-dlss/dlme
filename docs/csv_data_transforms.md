# Information for DLME CSV Data Transforms

CSV data transforms are trigged through the options passed to the column selector:

```
to_field 'DLME Field', column('CSV Column', transform: [INPUT])
```

*Available CSV Transforms* are _append_, _insert_, _replace_, _split_, and _trim_.

### append

Option: string
Purpose: Add a string to the end of each value in the result list.

```
to_field 'selected_field', column('CSV Column', append: ' , added to string')
```

### insert

Option: string
Purpose: Inserts each value in the result to a formatted string (marked by '%s').

```
to_field 'selected_field', column('CSV Column', insert: 'Insert some text %s here.')
```

### replace

Option: string
Purpose: Replaces all instances of a string in each value in the result list with the replacement string.

```
to_field 'selected_field', column('CSV Column', replace: ['|', ' - ')
```

### split

**Option:** string
**Purpose:** Split the column text into an array based on the splitter string
**Note:** If any other transforms will also be run on the content, *split* should always be first.

Example:
```
to_field 'selected_field', column('CSV Column', split: '|')
```

### trim

**Option:** boolean
**Purpose:** When `true`, whitespace is removed from the leading and trailing edges of each value in the result list.

Example:
```
to_field 'selected_field', column('CSV Column', trim: true)
```

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
