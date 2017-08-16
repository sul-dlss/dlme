# We have to inject Autolink before the Join.
Blacklight::Rendering::Pipeline.operations = [Blacklight::Rendering::HelperMethod,
                                              Blacklight::Rendering::LinkToFacet,
                                              Blacklight::Rendering::Microdata,
                                              Autolink,
                                              Blacklight::Rendering::Join]
