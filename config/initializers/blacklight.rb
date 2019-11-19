# Added Autolink and Paragraph and replaced Join.
Blacklight::Rendering::Pipeline.operations = [Blacklight::Rendering::HelperMethod,
                                              Blacklight::Rendering::LinkToFacet,
                                              Blacklight::Rendering::Microdata,
                                              Autolink,
                                              BidiWrap,
                                              Paragraph,
                                              Join]
