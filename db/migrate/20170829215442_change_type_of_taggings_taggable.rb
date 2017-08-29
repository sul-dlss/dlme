class ChangeTypeOfTaggingsTaggable < ActiveRecord::Migration[5.1]
  # Note: this is a lossy migration.
  def change
    remove_index :taggings, name: 'index_taggings_on_taggable_id_and_taggable_type_and_context'
    remove_column :taggings, :taggable_id, :integer
    remove_column :taggings, :taggable_type, :string
    add_reference :taggings, :taggable, polymorphic: true
    add_index :taggings, [:taggable_id, :taggable_type, :context]
  end
end
