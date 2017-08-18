class CreateHarvestedResources < ActiveRecord::Migration[5.1]
  def change
    create_table :harvested_resources do |t|
      t.string :url, null: false
      t.string :original_filename, null: false
      t.string :multihash, null: false
      t.belongs_to :harvest, foreign_key: true, null: false
      t.belongs_to :pipeline, foreign_key: true, null: false
      t.timestamps
    end
  end
end
