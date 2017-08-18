class CreateResourceContents < ActiveRecord::Migration[5.1]
  def change
    create_table :resource_contents do |t|
      t.string :multihash, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :resource_contents, :multihash
  end
end
