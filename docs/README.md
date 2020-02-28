# Data Documentation for the Digital Library of the Middle East

For data providers, start by reading our [Information for Data Providers](providers.md) page.

## Dataflow through the Application

At present, this diagram represents how data travels from being queued up for inclusion to internal representation in the DLME application's database and metadata included the discovery index:

![overview diagram](https://camo.githubusercontent.com/77365e9eaddd2ff7918be8c1fa8cfe0e465c2594/68747470733a2f2f646f63732e676f6f676c652e636f6d2f64726177696e67732f642f652f32504143582d31765442464a4a67695071733538664e57432d6c5442647735774b4e4e302d4f674c42753745556f4a636679445846753656544b6b68784e554b634e53583466314d665f6d484849327a485f657a5a6a2f7075623f773d39363026683d373230)

## Adding Data Process

* [SSH into the harvest VM](https://github.com/sul-dlss/dlme-harvest)
* Run any needed harvests
* Commit harvested records and push to `dlme-metadata` Github repo
* [Add information to the JSON configuration for traject](https://github.com/sul-dlss/dlme-transform/blob/master/config/metadata_mapping.json)
* [Write a traject mapping for new source(s)](https://github.com/sul-dlss/dlme-transform/tree/master/traject_configs)
* Test and debug traject mapping locally
* Add any changes to the translation maps if needed (in `dlme-transform`)
* Commit configuration and traject mapping to a new branch and create a pull request
* In staging:
  * After merge, sign into https://spotlight.stage.dlmenetwork.org/ and go to site administration panel -> "Transform data"
  * Input the file path for records to map (or leave blank to run all) and click start button
  * Check status of transform in site administration to see if it succeeded or failed
  * If it failed, look at error message and diagnose locally or ask team for assistance
  * If it succeeded (the number of transformed records should match the number of harvested records) get link to the file in S3 for the transformation results
  * Go to Exhibit dashboard -> Items and click "Add items"
  * Click "DLME S3 Fetch" and paste link into form, then click "Fetch"
  * Confirm the number of records match what is expected
  * Once reindexing finishes, look at new records to test and to confirm they look right
  * Undertake any needed review with lead curator and data providers

* In production:
  * Sign into the https://spotlight.dev.dlmenetwork.org/ and go to Exhibit dashboard -> Items
  * Click "Add items"
  * Select "DLME S3 Fetch" and paste the same link from the succeeded transform above; click "Fetch"

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
