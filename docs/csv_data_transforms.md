# Information for DLME CSV Data Transforms

## Data Tranforms

CSV data transforms are trigged through the options passed to the column selector:

to_field 'selected_field', column('CSV Column', transform: [INPUT])

*Available Tranforms* are _split_, _trim_, _append_, _replace_, and _insert_.

### split

Option: string
Purpose: Split the column text into an array based on the splitter string
Note: If any other transforms will also be run on the content, *split* should
always be first.

```
to_field 'selected_field', column('CSV Column', split: '|')
```

### trim

Option: boolean
Purpose: When `true`, whitespace is removed from the leading and trailing edges of each value in the
result list.

```
to_field 'selected_field', column('CSV Column', trim: true)
```

### append

Option: string
Purpose: Add a string to the end of each value in the result list.

```
to_field 'selected_field', column('CSV Column', append: ' , added to string')
```

### replace

Option: string
Purpose: Replaces all instances of a string in each value in the result list with the replacement string.

```
to_field 'selected_field', column('CSV Column', replace: ['|', ' - ')
```

### insert

Option: string
Purpose: Inserts each value in the result to a formatted string (marked by '%s').

```
to_field 'selected_field', column('CSV Column', insert: 'Insert some text %s here.')
```

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
