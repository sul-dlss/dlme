# Added Autolink and Paragraph and replaced Join.
Blacklight::Rendering::Pipeline.operations = [Blacklight::Rendering::HelperMethod,
                                              Blacklight::Rendering::LinkToFacet,
                                              Blacklight::Rendering::Microdata,
                                              Autolink,
                                              Paragraph,
                                              Join]


# This is in an initializer (and not CatalogController) because it has to be
# set before `config/routes.rb` is loaded
Blacklight::Engine.config.routes.identifier_constraint = %r{.+}
