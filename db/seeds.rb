# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Add a Statistics MainNavigation item for every exhibit that does not have one
Spotlight::Exhibit.find_each do |exhibit|
  nav = Spotlight::MainNavigation.find_or_initialize_by(exhibit_id: exhibit.id, nav_type: 'statistics')
  if nav.new_record?
    nav.display = false
    nav.save
  end
end
