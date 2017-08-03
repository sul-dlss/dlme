class CreateSourceFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :source_files do |t|
      t.text :data
      t.string :label
      t.string :format
      t.string :origin_url

      t.timestamps
    end
  end
end
