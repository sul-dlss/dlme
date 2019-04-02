# Data Documentation for the Digital Library of the Middle East

For data providers, start by reading our [Information for Data Providers](providers.md) page. 

## Dataflow through the Application

At present, this diagram represents how data travels from being queued up for inclusion to internal representation in the DLME application's database and metadata included the discovery index:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTBFJJgiPqs58fNWC-lTBdw5wKNN0-OgLBu7EUoJcfyDXFu6VTKkhxNUKcNSX4f1Mf_mHHI2zH_ezZj/pub?w=960&h=720)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/1jEspB9tO6-_LyiN-q0jQwfEPtiaztgHzL6CgRKXiyBk/edit)

## Adding Data Process

* [SSH into the harvest VM](https://github.com/sul-dlss/dlme-harvest)
* Run any needed harvests
* Commit harvested records and push to `dlme-metadata` Github repo
* [Add information to the JSON configuration for traject](https://github.com/sul-dlss/dlme-traject/blob/master/metadata_mapping.json)
* [Write a traject mapping for new source(s)](https://github.com/sul-dlss/dlme-traject)
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
